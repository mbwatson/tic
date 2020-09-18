import React, { Fragment, useContext } from 'react'
import { Title, Subheading, Paragraph } from '../components/Typography'
import { Card, CardHeader, CardContent, Button } from '@material-ui/core'
import { AuthContext } from '../contexts'

const Detail = ({ name, info }) => {
    return (
        <Paragraph>
            <strong>{ name }</strong>: { info } <br/>
        </Paragraph>
    )
}

export const ProfilePage = props => {
    const { user, logout } = useContext(AuthContext)

    return (
        <Fragment>
            <Title>Profile</Title>
            <Card>
                <CardHeader title="User Profile" />
                <CardContent>
                    <Detail name="Username" info={ user.username } />
                    <Detail name="First Name" info={ user.first_name } />
                    <Detail name="Last Name" info={ user.last_name } />
                    <Detail name="Email" info={ user.email } />
                    <Detail name="Organization" info={ user.organization } />
                    <Detail name="Access Level" info={ user.access_level } />

                    <br />
                    <hr />
                    <br />
                    
                    <Button variant="contained" color="primary" onClick={ logout }>Logout</Button>
                </CardContent>
          </Card>
        </Fragment>
    )
}
