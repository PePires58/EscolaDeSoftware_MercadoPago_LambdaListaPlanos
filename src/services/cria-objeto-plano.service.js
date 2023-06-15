exports.CriaObjetoPlano = function (data) {
    return {
        NomePlano: data.reason,
        Status: data.status,
        BackUrl: data.back_url,
        Recorrencia: {
            Frequencia: data.auto_recurring.frequency,
            Moeda: data.auto_recurring.currency_id,
            Valor: data.auto_recurring.transaction_amount,
            TipoFrequencia: data.auto_recurring.frequency_type
        },
        ReferenciaExterna: data.external_reference
    }
}