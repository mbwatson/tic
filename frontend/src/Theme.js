import { createMuiTheme } from '@material-ui/core/styles';
import { schemeSet2, interpolateBlues } from 'd3-scale-chromatic'

let theme = createMuiTheme({
    palette: {
        primary: { main: '#324f69' },
        secondary: { main: '#339898' },
        error: { main: '#cc3300' },
        extended: {
            copper: '#C84E00',
            persimmon: '#E89923',
            dandelion: '#FFD960',
            piedmont: '#A1B70D',
            eno: '#339898',
            magnolia: '#1D6363',
            prussianBlue: '#005587',
            shaleBlue: '#0577B1',
            ironweed: '#993399',
            hatteras: '#E2E6ED',
            whisperGray: '#F3F2F1',
            gingerBeer: '#FCF7E5',
            dogwood: '#988675',
            shackleford: '#DAD0C6',
            castIron: '#262626',
            graphite: '#666666',
            granite: '#B5B5B5',
            limestone: '#E5E5E5',
        },
        chartColors: schemeSet2,
        calendarColors: [...Array(8).keys()].map(i => interpolateBlues(0.3 + i * (1 - 0.3) / 8)),
        flashMessage: {
            success: '#63c0a5',
            info: '#999',
            warning: '#ffd548',
            error: '#ff8a66',
        },
    },
    shape: { borderRadius: 4 },
    spacing: 4,
    mixins: {
        container: {
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
        },
        debug: {
            border: '1px solid #fcc',
            '& *': {
                border: '1px solid #fcc',
            }
        }
    },
    typography: {
        fontSize: 11,
    }
})

theme = {
    ...theme,
    overrides: {
        MuiTypography: {
            h1: {
                fontFamily: 'Roboto',
                fontSize: '3.5rem',
                color: theme.palette.primary.light,
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(6),
            },
            h2: {
                fontFamily: 'Roboto',
                color: theme.palette.primary.main,
                // fontWeight: 'bold',
                fontSize: '2rem',
            },
            h3: {
                fontFamily: 'Roboto',
                color: theme.palette.primary.light,
                fontWeight: '400',
                fontSize: '1.5rem',
            },
            h4: {
                fontFamily: 'Roboto',
                color: theme.palette.secondary.light,
                fontWeight: '300',
                fontSize: '1.25rem',
            },
            h5: { fontFamily: 'Roboto', },
            subtitle1: { fontFamily: 'Roboto', },
            body1: { fontFamily: 'Roboto', lineHeight: '1.75rem', },
            body2: { fontFamily: 'Roboto', lineHeight: '1.5rem', }, // paragraph gets this by default
        },
        MuiGrid: {
            item: {
                spacing: 4,
            }
        },
        MuiCard:{
            root: {
                padding: 0,
                backgroundColor: theme.palette.common.white,
                borderRadius: theme.shape.borderRadius,
            }
        },
        MuiCardHeader: {
            root: {
                backgroundColor: theme.palette.extended.hatteras,
            },
            title: {
                fontFamily: 'IBM Plex Sans',
                color: theme.palette.primary.main,
            },
            subheader: {
                fontFamily: 'IBM Plex Sans',
                color: theme.palette.secondary.main,
            },
            action: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '4rem',
            },
        },
        MuiCardContent: {
            root: {
                padding: theme.spacing(8),
            },
        },
        MuiDialogTitle: {
            root: {
                color: theme.palette.primary.light,
                fontSize: '200%',
                fontWeight: 'bold',
            },
        },
        MuiDrawer: {
            paper: {
                backgroundColor: theme.palette.common.white,
            },
        },
        MuiFormLabel: {
            root: {
                color: theme.palette.primary.main,
                fontWeight: 'bold',
            }
        },
        MuiFormHelperText: {
            root: {
                marginLeft: 0,
            }
        },
        MuiOutlinedInput: {
            root: {
                // marginTop: `${ theme.spacing(1) }px`,
            }
        },
        MuiToggleButton: {
            selected: {
                '& svg': {
                    fill: theme.palette.secondary.main,
                },
            },
        },
    }
}

export default theme