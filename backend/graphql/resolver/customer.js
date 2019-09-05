const CustomerService = require('../../services/core/CustomerService');
const {customersSchema, validate} = require('../../helpers/validation/')
module.exports = {
    Query: {
        customers: async (obj, params, context, info) => {
            const customers = await CustomerService.getAll(params);
            return customers;
        },
        customer: async (obj, {id}, context, info) => {
            const customer = await CustomerService.getById(id);

            return customer;
        }
    },
    Mutation: {
        createCustomer: async (obj, {input}, context, info) => {
            await validate(customersSchema.create, input);
            const customer = await CustomerService.create(input);
            return customer;
        },
        updateCustomer: async (obj, {input, id}, context, info) => {
            await validate(customersSchema.create, input, false);
            const customer = await CustomerService.update(id, input);
            return customer;

        },
        deleteCustomer: async (obj, {id}, context, info) => {
            const customer = await CustomerService.delete(id);
            return "Customer Deleted Successful";
        }
    }
};
