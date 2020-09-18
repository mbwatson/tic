import React, { Fragment } from 'react'
import { Title, Paragraph } from '../components/Typography'

export const LoginPage = props => {
    return (
        <Fragment>
            <Title>Unauthorized</Title>
            <Paragraph>
                You must log in to view this page.
            </Paragraph>
        </Fragment>
    )
}
