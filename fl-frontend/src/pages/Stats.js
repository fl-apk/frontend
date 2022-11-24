import { useContext, useEffect, useState, useCallback } from 'react';
import { SocketContext } from '../context/socket';
import { FcSynchronize } from 'react-icons/fc';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Label,Tooltip, Legend, ResponsiveContainer } from 'recharts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const Stats = () => {
   

    const socket = useContext(SocketContext);
    const [logs, setLogs] = useState([])
    const [update, setUpdate] = useState()
    const [dummy,setDummy] = useState([
        {"epoch":1,loss:0.78,"accuracy":0.5},
        {"epoch":2,loss:0.72,"accuracy":0.58},
        {"epoch":3,loss:0.70,"accuracy":0.60},
        {"epoch":4,loss:0.56,"accuracy":0.65},
        {"epoch":5,loss:0.50,"accuracy":0.70},
        {"epoch":6,loss:0.49,"accuracy":0.75}
    ])

    useEffect(() => {
        socket.on("data", (data) => {

            setLogs(curr => [
                ...curr,
                data.logs
            ])

        })

        return () => {
            socket.off("data");
        }
    }, [socket])


    useEffect(() => {

        console.log("logs changed");
        console.log(logs);

    }, [logs])

    const text = {
        color: "black"
    };
    
    const statsShow = logs.map((data, index) => {

        return (
            <Box sx={{
                border: '1px dashed grey',
                borderRadius: '10%',
                justifyContent: 'space-evenly',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'primary.dark',
                marginBottom:'3px',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: [0.9, 0.8, 0.7],
                  
                }}}>
          
          <Typography variant="h6" gutterBottom>
            Epoch : {data.epoch}  Loss: {data.loss} Acc: {data.accuracy} Val_loss: {data.val_loss} Val_Acc: {data.val_accuracy}
            </Typography>
            

    
            </Box>

            // <ul key={index}>Loss: {data.loss} Acc: {data.accuracy} Val_loss: {data.val_loss} Val_Acc: {data.val_accuracy}</ul> *
        )
    })

    return (
        <div className="stats">
         <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 2,
          justifyContent: 'space-evenly',
          bgcolor: 'background.paper',
          borderRadius: 1,
          width: "80vw",
          

        }}
      >
            <LineChart width={500} height={300} data={logs}>
                <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom' }}/>
                <YAxis label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }}/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
                <Line type="monotone" dataKey="val_accuracy" stroke="#82ca9d" />
            </LineChart>
            <LineChart width={500} height={300} data={logs}>
                <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom' }} /> <XAxis/>
                <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }}/><YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Legend />
                <Line type="monotone" dataKey="loss" stroke="#8884d8" />
                <Line type="monotone" dataKey="val_loss" stroke="#82ca9d" />
            </LineChart>
      </Box>
            
            {logs != [] ? <Box sx={{display: 'flex',
          flexDirection: 'column', alignContent: 'center'  }}>{statsShow}</Box> : null}
        </div>
    );
}

export default Stats;