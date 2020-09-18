import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocalStorage } from '../hooks'

const AUTH_URL = process.env.REACT_APP_AUTH_URL
const AUTH_API_KEY = process.env.REACT_APP_AUTH_API_KEY

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
    // const [user, setUser] = useState(defaultUser)
    const [user, setUser] = useLocalStorage('ctmd-user', defaultUser)

    const logout = () => {
        setUser({ })
        window.location = 'http://localhost:3000'
    }

    useEffect(() => {
        const authenticate = () => {
            let userData = {}

            // get params: status, username, organization, access_level, first_name, last_name, email
            const params = new URLSearchParams(window.location.search)

            for (let params of params.entries()) {
                userData[params[0]] = params[1]
            }
            
            if (userData.status === 'success') {
                setUser({ ...userData, expiration: Date.now() + 60 });
            }
            
            return userData
        }
        setUser(authenticate())
    }, [])

    return (
        <AuthContext.Provider value={{ user: user, logout: logout }}>
            { children }
        </AuthContext.Provider>
    )
}

