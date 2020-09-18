import React, { Fragment } from 'react'
import { Title, Paragraph } from '../components/Typography'

export const LoginPage = props => {
    return (
        <Fragment>
            <Title>Sorry</Title>

            <Paragraph>
                You are not authorized to view this page.
            </Paragraph>

            <Paragraph>
                Please log into the <a href="https://redcap.vanderbilt.edu/plugins/TIN/user/login" rel="noopener noreferrer">TIN Dashboard</a>.
            </Paragraph>
        </Fragment>
    )
}
