const https = require('https');

exports.buscaPlanosAtivos = async function (secret) {
    const urlGetPlanos = `${process.env.BaseUrlMercadoPago}/preapproval_plan/search?status=active`;

    return await new Promise((resolve, reject) => {
        const req = https.get(urlGetPlanos, {
            headers: {
                'Authorization': `Bearer ${secret}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        },
            function (res) {

                let buffer = [];
                res.on('data', planos => {
                    buffer = Buffer.from(planos);
                });
                res.on('end', () => {
                    resolve(JSON.parse(buffer));
                });
            });

        req.on('error', (e) => {
            reject(e);
        });
    });
}