import React, { useState, useEffect, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import axios from 'axios'
import { ApiContext } from '../../contexts/ApiContext'
import Heading from '../../components/Typography/Heading'
import Subheading from '../../components/Typography/Subheading'
import { Grid, Card, CardContent } from '@material-ui/core'
import ProposalsPieChart from '../../components/Charts/ProposalsPie'
import { CircularLoader } from '../../components/Progress/Progress'
import ProposalsTable from '../../components/Charts/ProposalsTable'

const styles = (theme) => ({
    page: {
        // ...theme.mixins.debug
    },
    pieChartContainer: {
        height: '700px',
    },
    table: {
        overflowY: 'scroll',
    },
})

const ProposalsByTic = (props) => {
    const { classes, theme } = props
    const [proposalsByTic, setProposalsByTic] = useState([])
    const [proposals, setProposals] = useState([])
    const api = useContext(ApiContext)

    const selectProposals = ({ id }) => {
        const index = proposalsByTic.findIndex(tic => tic.name === id)
        setProposals(proposalsByTic[index].proposals)
    }
    
    useEffect(() => {
        axios.get(api.proposalsByTic)
            .then(response => setProposalsByTic(response.data))
            .catch(error => console.log('Error', error))
    }, [])

    return (
        <div className={ classes.page }>
            <Heading>Proposals by Assigned TIC/RIC</Heading>

            <Grid container spacing={ 16 }>
                <Grid item xs={ 12 }>
                    <Card>
                        <CardContent className={ classes.pieChartContainer }>
                            {
                                (proposalsByTic.length > 0)
                                ? <ProposalsPieChart
                                    proposals={ proposalsByTic }
                                    colors={ Object.values(theme.palette.extended).splice(0, 9) }
                                    clickHandler={ selectProposals }
                                />
                                : <CircularLoader />
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={ 12 }>
                    {
                        proposals
                            ? <ProposalsTable
                                className={ classes.table }
                                proposals={ proposals }
                                paging={ false }
                            />
                            : null
                    }
                </Grid>
            </Grid>

        </div>
    )
}

export default withStyles(styles, { withTheme: true })(ProposalsByTic)
