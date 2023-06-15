const https = require('https');

exports.buscaPlanosAtivos = async function (secret) {
    const urlGetPlanos = `${process.env.BaseUrlMercadoPago}/preapproval_plan/search?status=active`;

    return await new Promise((resolve, reject) => {
        const req = https.get(urlGetPlanos, function (res) {

            let planosRetorno;
            res.on('data', planos => {
                planosRetorno += planos;
            });
            res.on('end', () => {
                resolve({
                    body: JSON.stringify(planosRetorno)
                });
            });
        });

        req.on('error', (e) => {
            reject({
                errors: e
            });
        });
    });
}