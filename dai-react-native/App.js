import React from 'react';
import MainStack from './navigation/MainStack';
import logIn from './screens/logIn';
import ContextProvider from './ContextState';
import authContext from './ContextState';

export default function App() {
  
  return ( 
    
  <authContext.Provider value={{ token, setToken }}>
    
      { token ?
        <MainStack/>
      :
        <logIn/>
      }
  </authContext.Provider>  
  );

}
