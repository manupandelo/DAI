import * as React from "react";
import { useContext } from "react";
import { createContext } from "react"

export const initialState = {
    token:false,
    menu: {
        precio: 0,
        HealthScore: 0,
        lista: [],
        eliminarId: [],
        vegan:0,
        notVegan:0
    },
};

export const ActionTypes = {
    setToken: "SET_TOKEN",
    SetMenu: "SET_MENU",
    SetMenuPrecio: "SET_MENU_PRECIO",
    SetMenuHealthScore: "SET_MENU_HEALTHSCORE",
    SetMenuLista: "SET_MENU_LISTA",
    SetVegan:"SET_VEGAN",
    SetNotVegan:"SET_NOT_VEGAN",
    SetEliminarId:"SET_ELIMINAR_ID"
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.setToken:
            return {
                ...state,
                token: action.value,
            };
        case ActionTypes.SetMenu:
            return {
                ...state,
                menu: action.value,
            };
        case ActionTypes.SetMenuPrecio:
            return {
                ...state,
                precio: action.value,
            };
        case ActionTypes.SetMenuHealthScore:
            return {
                ...state,
                HealthScore: action.value,
            };
        case ActionTypes.SetMenuLista:
            return {
                ...state,
                menu: {
                    ...state.menu,
                    lista: [...state.menu.lista, action.value],
                }
            };
        case ActionTypes.SetVegan:
            return {
                ...state,
                vegan: action.value,
            };
        case ActionTypes.SetNotVegan:
            return {
                ...state,
                notVegan:action.value,
            };
        case ActionTypes.SetEliminarId:
            return {
                ...state,
                menu: {
                    ...state.menu,
                    lista: state.menu.lista.filter((plato) => plato.id !== action.value)
                }
            };
        default:
            return state;
    }
};

export const initialContext = {
    contextState: initialState,
    setContextState: () => { },
};

const Context = React.createContext(initialContext);

export default Context;

export function ContextProvider({ children, initial = initialState }) {
    const [state, dispatch] = React.useReducer(reducer, initial);

    const contextState = state;
    const setContextState = dispatch;

    return <Context.Provider value={{ contextState, setContextState }}>{children}</Context.Provider>;
}

export const useContextState = () => useContext(Context);
