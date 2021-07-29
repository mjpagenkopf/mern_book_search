const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      //parent, args and context, called parameters, context is the user that is logged in. 
      me: async (parent, args, context) => {
        if(context.user) {
          const userData = await User.findOne({_id: context.user._id}).populate('savedBooks')
        return userData;
      }else{
        throw new AuthenticationError('Please login first')
      }
      },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return {token, user};
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      //user is the person we find from database
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      //isCorrectPassword is inside the User.js model and it using bcrypt to compare the user input with the encrypted version the database
      //correctPw is a boolean
      const correctPw = await user.isCorrectPassword(password);
      //if false, if doesn't match, throws this error message
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      //uses everything in the auth.js in utils folder and assigns a token and takes in a user and returns a token. 
      const token = signToken(user);
      //matches the Auth in the typeDefs
      return { token, user };
    },
  

  saveBook: async (parent, { book }, context) => {
    if (context.user){
      return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
      );
      
    }
    throw new AuthenticationError('error saving book');
  },

  deleteBook: async (parent, { bookId }, context) => {
    if (context.user) {
      return await User.findOneAndUpdate(
        {_id: context.user._id},
        { $pull: { savedBooks: { bookId }}},
        { new: true }
      )
    }
  },
},
};

module.exports = resolvers;
