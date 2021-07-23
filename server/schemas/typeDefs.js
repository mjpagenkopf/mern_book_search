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
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  
  #from user-controller?
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    getSingleUser(id: ID, username: String!): Auth
    login(email: String!, password: String!): Auth
    #saveBook(savedBooks: [Book]!): User
    deleteBook(BookId: String!): User
  }
`;

module.exports = typeDefs;
