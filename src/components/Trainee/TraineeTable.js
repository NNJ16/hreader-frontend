
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {Button} from "reactstrap";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import CardMedia from '@material-ui/core/CardMedia';
import {confirmAlert} from "react-confirm-alert";
import {useHistory} from "react-router-dom";
import API from "../api";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#216DC4",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const OrderTable = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">NIC</StyledTableCell>
                        <StyledTableCell align="left">First Name</StyledTableCell>
                        <StyledTableCell align="left">Last Name</StyledTableCell>
                        <StyledTableCell align="left">Status</StyledTableCell>
                        <StyledTableCell align="left">Age</StyledTableCell>
                        <StyledTableCell align="left">Gender</StyledTableCell>
                        <StyledTableCell align="left">Address</StyledTableCell>
                        <StyledTableCell align="left">Options</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.length > 0 && props.rows.map((row) => {
                        return (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.nic}</StyledTableCell>
                                <StyledTableCell style={{width: "15%"}} align="left">{row.firstname}</StyledTableCell>
                                <StyledTableCell style={{width: "15%"}} align="left">{row.lastname}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.status}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.age}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{row.gender}</StyledTableCell>
                                <StyledTableCell style={{width: "20%"}} align="left">{row.address}</StyledTableCell>
                                <StyledTableCell style={{width: "10%"}} align="left">{(<Button color="warning" onClick={()=>{
                                    history.push({
                                        pathname: '/trainee/review',
                                        state: {  
                                          id: row.id 
                                        },
                                      }); 
                                }}>Review</Button>)}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default OrderTable;