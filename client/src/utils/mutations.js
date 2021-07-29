import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      username
      savedBooks {
        bookId
      }
    }
  }
 `; 

 export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookID: $bookId) {
      username
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
    }
  }
`;
