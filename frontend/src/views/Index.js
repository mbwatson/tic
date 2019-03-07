import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Heading from '../components/Typography/Heading'
import { CircularLoader } from '../components/Progress/Progress'
import ProposalsByTicBarChart from '../components/widgets/ProposalsByTic'
import ProposalsByStatusBarChart from '../components/widgets/ProposalsByStatus'
import ProposalsCalendar from '../components/widgets/ProposalsCalendar'
import AverageDays from '../components/widgets/AverageDays'

const useStyles = makeStyles(theme => ({
    page: { },
    card: {
        marginBottom: 2 * theme.spacing.unit,
        backgroundColor: theme.palette.grey[100],
    },
    chartContainer: {
        padding: 4 * theme.spacing.unit,
        width: 'calc(100vw - 48px)',
        [theme.breakpoints.up('sm')]: {
            width: 'calc(100vw - 240px - 86px)',
        },
    },
    barChartContainer: {
        height: '700px',
        position: 'relative',
    },
    calendarContainer: {
        height: `calc(100vw * 30/55 + 64px)`,
        [theme.breakpoints.up('sm')]: {
            height: `calc((100vw - 240px) * 26/55 + 64px)`,
        }
    },
    pieChartContainer: {
        height: '700px',
    },
    groupingButtonsContainer: {
        textAlign: 'right',
        position: 'absolute',
        bottom: 3 * theme.spacing.unit,
        right: 1 * theme.spacing.unit,
    },
    groupingButton: {
        margin: `0 ${ theme.spacing.unit }px`
    },
}))

const HomePage = (props) => {
    const theme = useTheme()
    const classes = useStyles()

    return (
        <div className={ classes.page }>

            <div className={ classes.pageTitle }>
                <Heading>Dashboard Home</Heading>
            </div>

            <Grid container spacing={ 2 * theme.spacing.unit }>
                <Grid item xs={ 12 } sm={ 11 } lg={ 6 }>
                    <ProposalsByTicBarChart />
                </Grid>
                <Grid item xs={ 12 } sm={ 11 } lg={ 6 }>
                    <ProposalsByStatusBarChart />
                </Grid>
                <Grid item xs={ 12 } sm={ 11 } lg={ 7 }>
                    <ProposalsCalendar />
                </Grid>
                <Grid item xs={ 12 } sm={ 11 } lg={ 5 }>
                    <AverageDays />
                </Grid>
            </Grid>
        </div>
    )
}

export default HomePage