const buscaSecretService = require('./services/busca-secret.service');
const buscaPlanosService = require('./services/busca-planos.service');

exports.lambdaHandler = async (event, context) => {

    let etapa = 'buscando segredo na AWS';
    try {

        const secret = await buscaSecretService.buscaSecret();

        etapa = 'buscando planos no mercado pago';
        const response = await buscaPlanosService.buscaPlanosAtivos(secret.Parameter.Value);

        if (response.ok) {

            etapa = 'devolvendo planos para o cliente';

            response.text().then((text) => {
                console.log(text);
            });


            response.json()
                .then((planos) => {
                    console.log(planos);
                    return defaultResult(200, planos);
                });
        }
        else
            return errorResult(400, {
                'Erro': 'Erro ao buscar planos'
            });

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