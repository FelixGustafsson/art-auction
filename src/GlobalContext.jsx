import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({children}) {

    const [login, setLogin] = useState(null)


    return <GlobalContext.Provider value={ { login, setLogin } }>
        {children}
    </GlobalContext.Provider>

}

export { GlobalContext, GlobalProvider }