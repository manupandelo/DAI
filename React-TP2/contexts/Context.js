import { createContext } from "react";
import React, { useContext } from "react";

export const initialState = {
    number: ""   //numero de emergencia, tmb guardado en el async storage
};

export const ActionTypes = {
    SetNumber: 'SET_NUMBER',                         //SETS
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.SetNumber:
        return ({
            ...state,
            number: action.value,                 //SETS
        });
default:
    return state;
    
}
};

export const initialContext = {
    contextState: initialState,
    setContextState: () => {},
};

const Cont = React.createContext(initialContext);


export function ContextProvider({children, initial = initialState}) {
    const [state, dispatch] = React.useReducer(reducer, initial);


const contextState = state;
const setContextState = dispatch;

return <Cont.Provider value={{contextState, setContextState }}>{children}</Cont.Provider>   // devuelve el provider para que se pueda usar en el resto de la app

}

export const useContextState = () => useContext(Cont);