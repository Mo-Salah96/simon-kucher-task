const IndustryService = require('../../services/core/IndustryService');

module.exports = {
    Query: {
        industries: async (obj, params, context, info) => {
            const industries = await IndustryService.getAll();
            return industries;
        },
    }
};
