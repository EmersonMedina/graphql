import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql';
import { v1 as uuidv1 } from 'uuid';

const users = [
    {
        id: '1', 
        name: 'John',
        surname: 'Doe',
        street: 'Main Street',
        zipCode: 12345,
        city: 'New York',
        phone: '+123456789'
    }, 
    {
        id: '2',
        name: 'Jane',
        surname: 'Doe',
        street: 'Main Street',
        zipCode: 12345,
        city: 'Las Vegas',
        phone: '+987654921'
    }
]



const typeDefs = `#graphql
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
        allUsers: [User]
        userCount: Int! @deprecated(reason: "Use userLength instead.")
        userLength: Int!
        findUserByName(name: String!): [User]
        findUserById(id: ID!): User
    }

    type Mutation {
        
        addUser(
            name: String!, 
            surname: String!, 
            street: String!, 
            zipCode: Int!, 
            city: String!, 
            phone: String
        ): User

    }
`

const resolvers = {
    User: {
        address: (parent) => `${parent.street}, ${parent.zipCode} ${parent.city}`
    },
    Query: {
        allUsers: () => users,
        userCount: () => users.length,
        userLength: () => users.length,
        findUserByName: (parent, args) => users.filter(user => user.name === args.name),
        findUserById: (parent, args) => users.find(user => user.id === args.id)
    }, 
    Mutation: {
        addUser: (parent, args) => {

            if (users.find(user => user.name === args.name)) {
                throw new GraphQLError('User with that name already exists', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const newUser = {
                id: uuidv1(),
                ...args
            }

            users.push(newUser)
            return newUser; 
        }
    }
}


const server = new ApolloServer({typeDefs, resolvers})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
  
console.log(`🚀  Server ready at: ${url}`);