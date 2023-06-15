const AWS = require('aws-sdk');
const ssm = new AWS.SSM({ apiVersion: '2014-11-06' });

exports.buscaSecret = async function () {
    const params = {
        Name: process.env.SecretMercadoPagoPath,
        WithDecryption: process.env.SecretMercadoPagoUseEncryption === 'true'
    };

    return await ssm.getParameter(params)
        .promise()
        .then((secret) => {
            return secret;
        });
}