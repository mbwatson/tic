import React, { Fragment, useContext } from 'react'
import { Title, Paragraph } from '../components/Typography'
import { Card, CardHeader, CardContent, Button } from '@material-ui/core'
import { AuthContext } from '../contexts'

export const ProfilePage = props => {
    const { user, logout } = useContext(AuthContext)

    return (
        <Fragment>
            <Title>Profile</Title>
            <Card>
                <CardHeader title="User Profile" />
                <CardContent>
                    <pre>{ JSON.stringify(user, null, 2) }</pre>
                    <Button onClick={ logout }>Logout</Button>
                </CardContent>
          </Card>
        </Fragment>
    )
}
