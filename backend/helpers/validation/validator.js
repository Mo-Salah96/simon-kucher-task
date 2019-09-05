const Ajv = require('ajv');
const {
    ValidationError,
} = require('../errors/Errors');

const validate = (schema, data, strict = true) => {
    const ajv = new Ajv();
    const nSchema = schema;
    if (!strict) {
        delete nSchema.required;
    }
    const valid = ajv.validate(nSchema, data);
    if (!valid) {
        console.log(ajv.errors);
        throw new ValidationError(0, JSON.stringify(ajv.errors));
    }
};
module.exports = validate;
