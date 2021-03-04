import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });

    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                {date: "Tus rosas", customerId: '2B', amount: 3},
                {date: "Tus petalos", customerId: '7A', amount: 1},
            ],
        };
    }

    function Row(props) {
        const {row} = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Edificio</TableCell>
                                            <TableCell>Apartamento</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            calories: PropTypes.number.isRequired,
        })
    };

    const rows = [
        createData('TuCondo', 159),
        createData('MiCondo', 237),
        createData('NuestroCondo', 262)
    ];

    export default function CollapsibleTable() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Condominio</TableCell>
                            <TableCell align="right">ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
