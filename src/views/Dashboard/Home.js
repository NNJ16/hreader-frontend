import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Typography from '@material-ui/core/Typography';
import TraineeTable from "../../components/Trainee/TraineeTable";
import API from "../../components/api";

export default function HomeView() {
    const [row, setRow] = useState([]);
    useEffect(() => {
        API.post("/api/getTrainByTrainerId",{trainerId:sessionStorage.getItem("id")})
            .then(res => {
                if(res.data.type=="done"){
                    console.log(res);
                    setRow(res.data.train);
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
                    Trainee Details ({row.length})
                </Typography>
            </div>
            <br/>
            <div className="user-table">
                <TraineeTable rows={row}/>
            </div>
          
        </div>
    )
}