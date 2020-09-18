import React, { useContext } from 'react'
import { AuthContext } from './contexts'
import { Switch, Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import ScrollToTop from './utils/ScrollToTop'
import { MenuTray } from './components/Menus/MainMenu'
import { HomePage } from './views/Index'
import { SettingsPage } from './views/Settings'
import {
    ProposalsListPage,
    ProposalReportPage,
    ProposalsByOrganization,
    ProposalsByTic,
    ProposalsByStatus,
    ProposalsByTherapeuticArea,
    ProposalsByDate,
    ProposalsByResourcesApproved,
    ProposalsByResourcesRequested,
} from './views/Proposals'
import { StudiesListPage, StudyReportPage } from './views/Studies'
import { CollaborationsPage } from './views/Collaborations'
import { CtsasPage } from './views/Ctsas'
import { SitesPage } from './views/Sites'
import { UploadsPage } from './views/Uploads'
import { ProfilePage } from './views/Profile'
import { LoginPage } from './views/Login'
import { Footer } from './components/Footer'

const AUTH_URL = process.env.REACT_APP_AUTH_URL
const AUTH_API_KEY = process.env.REACT_APP_AUTH_API_KEY

const useStyles = makeStyles(theme => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: `${ theme.palette.extended.whisperGray }`,
    },
    menuToggleButton: {
        transform: 'translateX(0)',
        transition: 'transform 250ms, opacity 500ms',
        transitionDelay: '500ms',
        opacity: 0.75,
        position: 'absolute',
        left: '0.5rem',
        top: '0.5rem',
        [theme.breakpoints.up('sm')]: {
            transform: 'translateX(-150%)',
            opacity: 0,
        },
    },
    main: {
        minHeight: '100vh',
        flexGrow: 1,
        padding: `${ theme.spacing(6) }px`,
        marginLeft: '5rem',
        transition: 'padding-top 250ms',
    },
}))

const Dashboard = props => {
    const classes = useStyles()
    const { user } = useContext(AuthContext)

    return (
        <div className={ classes.layout }>
            <MenuTray />
            <main className={ classes.main }>
                <CssBaseline />
                <ScrollToTop>
                    {
                        user.username && (
                            <Switch>
                                <Route exact path="/settings" component={ SettingsPage }/>
                                <Route exact path="/proposals/:id(\d+)" component={ ProposalReportPage }/>
                                <Route exact path="/proposals" component={ ProposalsListPage }/>
                                <Route path="/proposals/organization" component={ ProposalsByOrganization }/>
                                <Route path="/proposals/tic" component={ ProposalsByTic }/>
                                <Route path="/proposals/status" component={ ProposalsByStatus }/>
                                <Route path="/proposals/therapeutic-area" component={ ProposalsByTherapeuticArea }/>
                                <Route path="/proposals/date" component={ ProposalsByDate }/>
                                <Route path="/proposals/resources-requested" component={ ProposalsByResourcesRequested }/>
                                <Route path="/proposals/resources-approved" component={ ProposalsByResourcesApproved }/>
                                <Route path="/collaborations" component={ CollaborationsPage }/>
                                <Route exact path="/studies" component={ StudiesListPage }/>
                                <Route exact path="/studies/:proposalID" component={ StudyReportPage }/>
                                <Route path="/ctsas" component={ CtsasPage }/>
                                <Route path="/sites" component={ SitesPage }/>
                                <Route path="/uploads" component={ UploadsPage }/>
                                <Route path="/profile" component={ ProfilePage }/>
                                <Route path="/" component={ HomePage }/>
                            </Switch>
                        )
                    }
                    { !user.username && <LoginPage /> }
                </ScrollToTop>
            </main>
            <Footer />
        </div>
    )
}

export default Dashboard