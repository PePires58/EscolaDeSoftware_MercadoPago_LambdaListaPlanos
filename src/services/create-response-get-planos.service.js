exports.CreateResponse = function (data, errors) {
    return {
        errors: errors,
        data: data
    }
};