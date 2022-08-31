import React from 'react';
import MainStack from './navigation/MainStack';
import logIn from './screens/logIn';
import Context, { ContextProvider } from './Context';

export default function App() {
  
  return ( 
         <ContextProvider>
          <MainStack/>
         </ContextProvider>  
  );

}
 

/*<Context.Provider value={{ contextState, setContextState }}>
      { ContextState.token ?
        <MainStack/>
      :
        <logIn/>
      }
  </Context.Provider>*/