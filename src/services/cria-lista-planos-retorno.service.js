const criaObjetoPlanoService = require('./cria-objeto-plano.service');
exports.CriarLista = function (data) {
    let planos = [];

    if (data.paging.total > 0) {
        data.results.forEach(plano => {
            planos.push(criaObjetoPlanoService.CriaObjetoPlano(plano));
        });
    }

    return planos;
}