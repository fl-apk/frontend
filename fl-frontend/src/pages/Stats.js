import { useContext, useEffect, useState, useCallback } from 'react';
import { SocketContext } from '../context/socket';
import { FcSynchronize } from 'react-icons/fc';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Stats = () => {

    const socket = useContext(SocketContext);
    const [logs, setLogs] = useState([])
    const [update, setUpdate] = useState()
    const forceUpdate = useCallback(() => {
        console.log("clicked")
        setUpdate({})
    }, []
    )

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


    const statsShow = logs.map((data, index) => {

        return (
            <ul key={index}>Loss: {data.loss} Acc: {data.accuracy} Val_loss: {data.val_loss} Val_Acc: {data.val_accuracy}</ul>
        )
    })

    return (
        <div className="stats">
            <LineChart width={500} height={300} data={logs}>
                <XAxis dataKey="epoch" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="loss" stroke="#8884d8" />
                <Line type="monotone" dataKey="accuracy" stroke="#82ca9d" />
            </LineChart>
            {logs != [] ? <li>{statsShow}</li> : null}
        </div>
    );
}

export default Stats;