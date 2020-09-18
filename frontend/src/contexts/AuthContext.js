import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks'

export const AuthContext = React.createContext({});

const defaultUser = {
    username: null,
    organization: null,
    access_level: null,
    first_name: null,
    last_name: null,
    email: null,
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(defaultUser)
    const [localStorageUser, setLocalStorageUser] = useLocalStorage('ctmd-user')

    const logout = () => {
        localStorage.removeItem('ctmd-user')
        window.location = 'https://redcap.vanderbilt.edu/plugins/TIN/user/login'
    }

    const authenticate = () => {
        let userData = {}
        // get query params--should have `status`, `username`, `organization`, `access_level`, `first_name`, `last_name`, `email`
        const params = new URLSearchParams(window.location.search)
        for (let params of params.entries()) {
            userData[params[0]] = params[1]
        }
        setLocalStorageUser(userData)
        setUser(userData)
    }

    useEffect(() => {
        if (localStorageUser) {
            setUser(localStorageUser)
        } else {
            authenticate()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user: user, logout: logout }}>
            { children }
        </AuthContext.Provider>
    )
}

