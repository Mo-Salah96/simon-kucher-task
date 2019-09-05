module.exports = {
    create: {
        type: 'object',
        properties: {
            code: {type: 'number'},
            profile: {
                type: 'object',
                properties: {
                    name: {type: 'string', minlength: 6},
                    last_name: {type: 'string', minlength: 6},
                    email: {type: 'string', format: 'email'},
                    number: {type: 'string', minlength: 6},
                    website: {type: 'string'},
                },
                required: ['name', 'last_name', 'email', 'number', 'website'],

            },
            industryId: {type: 'number'},
            balance: {type: 'number'},
        },
        required: ['code', 'profile', 'industryId', 'balance'],
        additionalProperties: false
    },
};
