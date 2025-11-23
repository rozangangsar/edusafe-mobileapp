import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as Font from 'expo-font';
import { AuthContext } from './src/context/AuthContext';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

export default function App() {
  const [state, dispatch] = React.useReducer(authReducer, initialLoginState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      // Load fonts
      await Font.loadAsync({
        'sans-serif': require('./assets/fonts/Poppins-Regular.ttf'),
        'sans-serif-bold': require('./assets/fonts/Poppins-Bold.ttf'),
      });

      // Check if user has token
      const userToken = await SecureStore.getItemAsync('userToken');

      if (userToken) {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      } else {
        dispatch({ type: 'SIGN_OUT' });
      }
    } catch (e) {
      console.error('Failed to restore token:', e);
      dispatch({ type: 'SIGN_OUT' });
    } finally {
      setIsLoading(false);
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (credentials) => {
        // Login logic akan diimplemen di AuthContext
        dispatch({ type: 'SIGN_IN', payload: credentials });
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT' });
        await SecureStore.deleteItemAsync('userToken');
      },
      signUp: async (credentials) => {
        // Signup logic
        dispatch({ type: 'SIGN_UP', payload: credentials });
      },
    }),
    []
  );

  const initialLoginState = {
    isSignout: true,
    userToken: null,
    user: null,
  };

  const authReducer = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isSignout: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.payload.token,
          user: action.payload.user,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
          user: null,
        };
      case 'SIGN_UP':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.payload.token,
          user: action.payload.user,
        };
      default:
        return prevState;
    }
  };

  if (isLoading) {
    return null; // bisa replace dengan splash screen
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isSignout ? <AuthStack /> : <AppStack user={state.user} />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
