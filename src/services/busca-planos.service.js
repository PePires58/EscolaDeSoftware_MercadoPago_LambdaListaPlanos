const https = require('https');

exports.buscaPlanosAtivos = async function (secret) {
    const urlGetPlanos = `${process.env.BaseUrlMercadoPago}/preapproval_plan/search?status=active`;

    return await new Promise((resolve, reject) => {
        const req = https.get(urlGetPlanos, {
            headers: {
                'Authorization': `Bearer ${secret}`
            }
        },
            function (res) {

                let planosRetorno;
                res.on('data', planos => {
                    planosRetorno = JSON.stringify(planos);
                });
                res.on('end', () => {
                    resolve(planosRetorno);
                });
            });

        req.on('error', (e) => {
            reject(e);
        });
    });
}