import React, { Fragment, useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import { ApiContext } from '../../contexts/ApiContext'
import Heading from '../../components/Typography/Heading'
import { Grid, Card, CardHeader, CardContent, Menu, MenuItem, IconButton } from '@material-ui/core'
import {
    MoreVert as MoreIcon,
    Sort as SizeSortIcon,
    SortByAlpha as AlphaSortIcon,
} from '@material-ui/icons'
import ProposalsPieChart from '../../components/Charts/ProposalsPie'
import ProposalsBarChart from '../../components/Charts/ProposalsBar'
import { CircularLoader } from '../../components/Progress/Progress'
import ProposalsTable from '../../components/Charts/ProposalsTable'

const useStyles = makeStyles(theme => ({
    page: { },
    pieChartContainer: {
        height: '700px',
    },
}))

const ProposalsByTherapeuticArea = (props) => {
    const classes = useStyles()
    const [proposalsByTherapeuticArea, setProposalsByTherapeuticArea] = useState([])
    const [proposals, setProposals] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [chartType, setChartType] = useState('pie')
    const api = useContext(ApiContext)
    
    useEffect(() => {
        axios.get(api.proposalsByTherapeuticArea)
            // .then(response => setProposalsByTherapeuticArea(response.data)) // all
            .then(response => setProposalsByTherapeuticArea(response.data.filter(area => area.proposals.length > 0))) // non-empty areas
            .catch(error => console.log('Error', error))
    }, [])

    const selectProposals = ({ id }) => {
        const index = proposalsByTherapeuticArea.findIndex(status => status.name === id)
        setProposals(proposalsByTherapeuticArea[index].proposals)
    }

    const handleMenuClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleSelectGraphType = (event, type) => {
        setChartType(type)
        setAnchorEl(null)
    }

    return (
        <div>
            <Heading>Proposals by Therapeutic Area</Heading>

            <Grid container spacing={ 16 }>
                <Grid item xs={ 12 }>
                    <Card>
                        <CardHeader
                            action={
                                <Fragment>
                                    <IconButton variant="text" color="primary"
                                        aria-owns={ anchorEl ? 'graph-type-menu' : undefined }
                                        aria-haspopup="true"
                                        onClick={ handleMenuClick }
                                    ><MoreIcon/></IconButton>
                                    <Menu id="graph-type-menu" anchorEl={ anchorEl } open={ Boolean(anchorEl) } onClose={ handleMenuClose }>
                                        <MenuItem value="pie" selected={ chartType === 'pie'} onClick={ event => handleSelectGraphType(event, 'pie') }>Pie</MenuItem>
                                        <MenuItem value="bar" selected={ chartType === 'bar'} onClick={ event => handleSelectGraphType(event, 'bar') }>Bar</MenuItem>
                                    </Menu>
                                </Fragment>
                            }
                        />
                        <CardContent className={ classes.pieChartContainer }>
                            {
                                proposalsByTherapeuticArea
                                ? <ProposalsPieChart
                                    proposals={ proposalsByTherapeuticArea }
                                    clickHandler={ selectProposals }
                                />
                                : <CircularLoader />
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={ 12 }>
                    <ProposalsTable proposals={ proposals } paging={ false } />
                </Grid>
            </Grid>

        </div>
    )
}

export default ProposalsByTherapeuticArea
