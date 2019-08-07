import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../Api'
import { Title } from '../components/Typography'
import { Grid } from '@material-ui/core'
import { CircularLoader } from '../components/Progress/Progress'
import { LookupTable } from '../components/Tables/LookupTable'
import { FileDrop } from '../components/Forms'

export const CtsasPage = (props) => {
    const [ctsas, setCtsas] = useState(null)

    useEffect(() => {
        const fetchCtsas = async () => {
            await axios.get(api.ctsas)
                .then(response => setCtsas(response.data))
                .catch(error => console.error(error))
        }
        fetchCtsas()
    }, [])

    return (
        <div>
            <Grid container>
                <Grid item xs={ 12 } sm={ 10 } component={ Title }>CTSAs</Grid>
                <Grid item xs={ 12 } sm={ 2 }>
                    <FileDrop />
                </Grid>
            </Grid>

            { ctsas ? <LookupTable data={ ctsas } /> : <CircularLoader /> }
            
        </div>
    )
}
