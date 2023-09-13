export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        surname: String!
        street: String!
        zipCode: Int
        city: String
        phone: String
        address: String
    }

    type Query {
        getUser: User
    }
`