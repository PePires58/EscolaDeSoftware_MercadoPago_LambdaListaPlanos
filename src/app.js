const buscaSecretService = require('./services/busca-secret.service');
const buscaPlanosService = require('./services/busca-planos.service');

exports.lambdaHandler = async (event, context) => {

    let etapa = 'buscando segredo na AWS';
    try {

        const secret = await buscaSecretService.buscaSecret();

        etapa = 'buscando planos no mercado pago';
        let responseGetPlano = new ResponseGetPlanos(null, null);

        await buscaPlanosService.buscaPlanosAtivos(secret.Parameter.Value)
            .then((planos) => {
                responseGetPlano.data = planos;
            })
            .catch((error) => {
                console.log(`Erro ao ${etapa} - ${error}`);
                responseGetPlano.errors = error;
            });

        if (responseGetPlano.data) {
            return defaultResult(200, responseGetPlano.data)
        }
        else
            return errorResult(400, { 'Erro': 'Erro ao buscar planos' });

    } catch (error) {
        console.log(`Erro ao ${etapa}`);
        return errorResult(500, { 'Erro': 'Erro no processo' });
    }
}

function errorResult(statusCode, errors) {
    return defaultResult(statusCode, {
        errors: errors
    });
}

function defaultResult(statusCode, object) {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(object),
        'isBase64Encoded': false,
        'headers': {
            'Content-Type': 'application/json'
        }
    }
}