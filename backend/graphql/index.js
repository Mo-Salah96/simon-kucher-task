const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema, mergeSchemas} = require('graphql-tools');
const path = require('path');
const utils = require('../helpers/utils');
const schemaDir = './schema';
const resolverDri = './resolver';
const typeDefs = utils.requireAllInFolder(path.join(__dirname,schemaDir));
const resolvers = utils.requireAllInFolder(path.join(__dirname,resolverDri));
const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});
const schema = mergeSchemas({
    schemas: [executableSchema]
});

module.exports = schema;
