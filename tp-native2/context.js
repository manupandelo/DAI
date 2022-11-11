import React, { useContext } from "react";

export const initialState = {
    phone: "",   //celular de emergencia del usuario, tmb guardado en el asyncStorage
};

export const ActionTypes = {
    SetPhone: 'SET_PHONE',                         //SETS
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.SetPhone:
        return ({
            ...state,
            phone: action.value,                 //SETS
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


export function Context({children, initial = initialState}) {
    const [state, dispatch] = React.useReducer(reducer, initial);


const contextState = state;
const setContextState = dispatch;

return <Cont.Provider value={{contextState, setContextState }}>{children}</Cont.Provider>   // devuelve el provider para que se pueda usar en el resto de la app

}

export const useContextState = () => useContext(Cont);