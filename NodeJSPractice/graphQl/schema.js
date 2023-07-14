const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = graphql;

const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'xyz',
    fields: {
        codeImprove: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                let data = [{
                    id: 11, name: 'codeimprove', email: 'code@improve.com', phone: "9898989898989"
                },
                {
                    id: 12, name: 'codeimprove1', email: 'code1@improve.com', phone: "9898989898989"
                },
                {
                    id: 13, name: 'codeimprove2', email: 'code2@improve.com', phone: "9898989898989"
                }]
                return data;
            }
        },
    }
})
module.exports = new GraphQLSchema({query : RootQuery})

