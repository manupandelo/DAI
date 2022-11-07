import { createContext } from "react";

const Context = createContext({
    number: "",
    setNumber: (number) => {}
});

export default Context;