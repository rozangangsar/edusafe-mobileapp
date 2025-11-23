import React from 'react';

export const AuthContext = React.createContext({
  signIn: async (credentials) => {},
  signOut: async () => {},
  signUp: async (credentials) => {},
  state: {
    isLoading: true,
    isSignout: true,
    userToken: null,
    user: null,
  },
});
