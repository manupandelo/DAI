import React from 'react';
import MainStack from './navigation/MainStack';
import logIn from './screens/logIn';
import Context from './Context';


export default function App() {
  
  return ( 
    <Context>
      { Context.token ?
        <MainStack/>
      :
        <logIn/>
      }
    </Context>
  );

}
