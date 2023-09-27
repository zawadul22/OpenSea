import { createContext, useEffect, useState } from "react";

const contextData = {isConnected: false, onLogin: () => {}, onLogout: () => {}}

const walletContext = createContext(contextData);

export const WalletContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const connectedData = localStorage.getItem('Connected')

        if (connectedData == '1') {
            setIsLoggedIn(true)
        }
    }, [])

    const loginHandler = () => {
        console.log('A')
        localStorage.setItem('Connected', '1')
        setIsLoggedIn(true)
    }

    const logoutHandler = () => {
        console.log('AA')
        setIsLoggedIn(false)
        localStorage.removeItem('Connected')
    }

    return <walletContext.Provider value={{isConnected: isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler}}>
        {props.children}
    </walletContext.Provider>
}

export default walletContext;