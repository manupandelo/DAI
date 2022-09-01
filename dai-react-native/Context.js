import React, { useContext } from "react";

export const initialState = {
    token:"",
    loading: false,
    menu: {
       precio: 0,
       healthscorePromedio: 0,
       healthscoreTotal:0,
       cantPlatos: 0,
       listaPlatos:[],
       cantVeganos:0,
       cantNoVeganos:0,
       eliminarId: []
    },
};

export const ActionTypes = {
    SetToken: 'SET_TOKEN',
    SetLoading: 'SET_LOADING',
    SetMenu: 'SET_MENU',
    SetPrecio: 'SET_PRECIO',
    SetHealthscorePromedio: 'SET_HEALTHSCORE_PROMEDIO',
    SetHealthscoreTotal: 'SET_USER_FIRST_NAME',
    SetCantPlatos: 'SET_CANT_PLATOS',
    SetListaPlatos: 'SET_LISTA_PLATOS',
    SetCantVeganos: 'SET_CANT_VEGANOS',
    SetCantNoVeganos:'SET_CANT_NO_VEGANOS',
    SetEliminarId: 'SET_ELIMINAR_ID'
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
      case ActionTypes.SetToken:
        return {
            ...state,
            token: action.value,
        };
        case ActionTypes.setUser:
        return {
            ...state,
            user: action.value,
        };
        case ActionTypes.SetMenu:
            return {
                ...state,
                menu: action.value,
            };
        case ActionTypes.SetPrecio:
            return {
                ...state,
                precio: action.value,
            };
        case ActionTypes.SetHealthscorePromedio:
            return {
                ...state,
                healthscorePromedio: action.value,
            };
            case ActionTypes.SetHealthscoreTotal:
            return {
                ...state,
                healthscoreTotal: action.value,
            };
        case ActionTypes.SetLista:
            return {
                ...state,
                menu: {
                    ...state.menu,
                    lista: [...state.menu.lista, action.value],
                }
            };
        case ActionTypes.SetCantVeganos:
            return {
                ...state,
                vegan: action.value,
            };
        case ActionTypes.SetCantNoVeganos:
            return {
                ...state,
                notVegan:action.value,
            };
        case ActionTypes.SetEliminarId:
            return {
                ...state,
                menu: {
                    ...state.menu,
                    lista: state.menu.listaPlatos.filter((plato) => plato.id !== action.value)
                }
            }
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

return <Cont.Provider value={{contextState, setContextState }}>{children}</Cont.Provider>

}

export const useContextState = () => useContext(Cont);