import React, { useState, useEffect, useContext, useRef } from 'react'
import { StoreContext } from '../../contexts/StoreContext'
import Heading from '../../components/Typography/Heading'
import BrowseMenu from '../../components/Menus/BrowseMenu'
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core'
import ProposalsPieChart from '../../components/Charts/ProposalsPie'
import ProposalsBarChart from '../../components/Charts/ProposalsBar'
import ChartOptions from '../../components/Menus/ChartOptions'
import { CircularLoader } from '../../components/Progress/Progress'
import ProposalsTable from '../../components/Charts/ProposalsTable'
import { SettingsContext } from '../../contexts/SettingsContext'

const ProposalsByStatus = props => {
    const [store, ] = useContext(StoreContext)
    const [settings] = useContext(SettingsContext)
    const [proposalsByStatus, setProposalsByStatus] = useState()
    const [displayedProposals, setDisplayedProposals] = useState()
    const [tableTitle, setTableTitle] = useState('')
    const [chartType, setChartType] = useState('pie')
    const [chartSorting, setChartSorting] = useState('alpha')
    const [hideEmptyGroups, setHideEmptyGroups] = useState(settings.charts.hideEmptyGroups)
    const tableRef = useRef(null)
    
    useEffect(() => {
        if (store.proposals && store.statuses) {
            let statuses = store.statuses.map(({ description }) => ({ name: description, proposals: [] }))
            store.proposals.forEach(proposal => {
                const index = statuses.findIndex(({ name }) => name === proposal.proposalStatus)
                if (index >= 0) statuses[index].proposals.push(proposal)
            })
            if (hideEmptyGroups) statuses = statuses.filter(status => status.proposals.length > 0)
            setProposalsByStatus(statuses)
        }
    }, [store, hideEmptyGroups])

    const selectProposals = (props) => {
        if (props.data) props = props.data  // Patch for issue #23
        const index = proposalsByStatus.findIndex(status => status.name === props.id)
        setTableTitle('Status: ' + props.id)
        setDisplayedProposals(proposalsByStatus[index].proposals)
        scrollToTable()
    }
    
    const handleSelectGraphType = (event, type) => setChartType(type)
    const handleSelectGraphSorting = (event, sorting) => setChartSorting(sorting)
    const handleToggleHideEmptyGroups = event => setHideEmptyGroups(event.target.checked)

    const scrollToTable = () => {
        setTimeout(() => tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500)
    }

    return (
        <div>
            <Heading>
                Proposals by Status
                <BrowseMenu />
            </Heading>

            <Grid container>

                <Grid item xs={ 12 }>
                    <Card>
                        <CardHeader action={
                            <ChartOptions
                                sortingSelectionHandler={ handleSelectGraphSorting } currentSorting={ chartSorting }
                                typeSelectionHandler={ handleSelectGraphType } currentType={ chartType }
                                toggleHideEmptyGroupsHandler={ handleToggleHideEmptyGroups } hideEmptyGroups={ hideEmptyGroups }
                            />
                        } />
                        <CardContent>
                            {
                                proposalsByStatus && chartType === 'pie'
                                && <ProposalsPieChart proposals={ proposalsByStatus } clickHandler={ selectProposals } height={ 600 } sorting={ chartSorting } />
                            }
                            {
                                proposalsByStatus && chartType === 'bar'
                                && <ProposalsBarChart proposals={ proposalsByStatus } clickHandler={ selectProposals } height={ 700 } sorting={ chartSorting } />
                            }
                            { !proposalsByStatus && <CircularLoader /> }
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={ 12 }>
                    <div ref={ tableRef }></div>
                    <ProposalsTable title={ tableTitle } proposals={ displayedProposals } paging={ false } />
                </Grid>

            </Grid>

        </div>
    )
}

export default ProposalsByStatus