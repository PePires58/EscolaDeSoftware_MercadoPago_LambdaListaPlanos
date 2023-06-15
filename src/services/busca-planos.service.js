const https = require('https');

exports.buscaPlanosAtivos = async function (secret) {
    const urlGetPlanos = `${process.env.BaseUrlMercadoPago}/preapproval_plan/search?status=active`;

    console.log(urlGetPlanos);
    return https.get(urlGetPlanos, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${secret}`
        }
    });
}