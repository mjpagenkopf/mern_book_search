const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  input savedBook {
    authors: [String]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  
  #from user-controller
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(_id: ID, bookId: String!): User
    deleteBook(_id: ID, bookId: String!): User
  }
`;

module.exports = typeDefs;
