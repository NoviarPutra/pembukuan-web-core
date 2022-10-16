var schema = require("./schema");

exports.save = (data) => {
    return new Promise((resolve, reject) => {
        new schema.JurnalUmunSchema(data).save((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}