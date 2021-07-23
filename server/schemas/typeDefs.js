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
    _id: ID
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
    users: [User]!
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addBook
  }
`;

module.exports = typeDefs;
