const CustomerService = require('../../services/core/CustomerService');

module.exports = {
    Query: {
        customers: async (obj, params, context, info) => {
            console.log(params);
            const customers = await CustomerService.getAll(params);
            console.log(JSON.stringify(customers));
            return customers;
        },
        customer: async (obj, {id}, context, info) => {
            const customer = await CustomerService.getById(id);

            return customer;
        }
    },
    Mutation: {
        createCustomer: async (obj, {input}, context, info) => {
            const customer = await CustomerService.create(input);
            return customer;
        },
        updateCustomer: async (obj, {input, id}, context, info) => {
            const customer = await CustomerService.update(id, input);
            return customer;

        },
        deleteCustomer: async (obj, {id}, context, info) => {
            const customer = await CustomerService.delete(id);
            return "Customer Deleted Successful";
        }
    }
};
