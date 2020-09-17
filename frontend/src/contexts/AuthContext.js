import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    const [user, setUser] = useState(defaultUser)

    useEffect(() => {
        console.log('auth context loaded')
        const authenticate = async () => {
            await axios.get(AUTH_URL, {
                params: {
                    apikey: AUTH_API_KEY,
                    provider: 'venderbilt',
                    return_url: 'http://localhost:3000',
                    code: 'testAuth1234'
                }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.error(error)
            })
        }
        authenticate()
    }, [])

    return <AuthContext.Provider value={{ user }}>
        { children }
    </AuthContext.Provider>
}

