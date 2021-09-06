import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useLocation } from 'react-router-dom';
import API from "../../components/api";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 8
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ChartView() {
    const location = useLocation();
    const [row, setRow] = useState([]);
    const [details, setDetails] = useState({
        fname: "",
        lname: "",
        age: "",
        gender: "",
        height: "",
        weight: ""
    });
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    useEffect(() => {
        API.post("/api/getUsageByUserId", { userId: location.state.id })
            .then(res => {
                if (res.data.type == "done") {
                    let arr = [];

                    let temp = res.data.usage[0].usageData.substring(1, res.data.usage[0].usageData.length - 1);
                    let usage = temp.split(",");

                    for (let index = 0; index < usage.length; index++) {
                        const element = usage[index];
                        arr.push({
                            bpm: element
                        })
                        if (index == usage.length - 1) {
                            setRow(arr);
                        }
                    }
                }
            })
            .catch(err => {
            });
        API.post("/api/getUsers", { userId: location.state.id })
            .then(res => {
                if (res.data.type == "done") {
                    setDetails({
                        fname: res.data.user.firstname,
                        lname: res.data.user.lastname,
                        age: res.data.user.age,
                        gender: res.data.user.gender,
                        height: res.data.user.height,
                        weight: res.data.user.weight                    });
                }
            })
            .catch(err => {
            });
    }, []);

    return (
        <div>
            <Header />
            <div className="table-header">
                <Typography variant="h6" gutterBottom>
                    Trainee Status
                </Typography>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <AreaChart width={800} height={500} data={row}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F9626B" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#F9626B" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="bpm" stroke="#F9626B" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                        <Typography variant="h5" gutterBottom>
                                Bio Data
                            </Typography>
                            <Typography variant="h7" gutterBottom>
                                First Name : {details.fname} 
                            </Typography>
                            <br/>
                            <Typography variant="h7" gutterBottom>
                                Last Name : {details.lname} 
                            </Typography>
                            <br/>
                            <Typography variant="h7" gutterBottom>
                                Age : {details.age} 
                            </Typography>
                            <br/>
                            <Typography variant="h7" gutterBottom>
                                Gender: {details.gender} 
                            </Typography>
                            <br/>
                            <Typography variant="h7" gutterBottom>
                                Height : {details.height == null ? "Not Found" : details.height} 
                            </Typography>
                            <br/>
                            <Typography variant="h7" gutterBottom>
                                Weight : {details.weight == null ? "Not Found" : details.weight} 
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}