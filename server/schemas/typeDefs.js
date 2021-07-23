const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    authors: [String]!
    description: [String]!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    username: String!
    email: String!
    savedBooks: [Book]!
    toJSON: 
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    
  }

  type Mutation {
    
  }
`;

module.exports = typeDefs;