import * as React from "react";
import {useContext} from "react";

export const initialState = {
    loading: true,
        token: "",
        menu: "",
};

export const ActionTypes = {
    SetToken: "SET_TOKEN",
    SetMenu: "SET_MENU",
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SetToken:
         return {
            ...state,
            token: action.value,
        };
        case ActionTypes.SetMenu:
            return {
               ...state,
               menu: action.value,
           };
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

    return <Cont.Provider value={{contextState, setContextState}}>{children}</Cont.Provider>;
}

export const useContextState = () => useContext(Cont);
