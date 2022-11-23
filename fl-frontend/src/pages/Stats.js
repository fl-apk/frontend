import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';


const Stats = () => {

    const socket = useContext(SocketContext);
    const [stats, setstats] = useState(null)

    useEffect(() => {

        socket.on("data", (data) => {
            console.log(data)

            setstats(data['data']);
        })

        return () => {
            socket.off("data");
        }
    }, [socket])


    return (
        <div className="stats">
            <h3>Hi this is the page to view stats</h3>
            {stats ? <p>{stats}</p> : null}
        </div>
    );
}

export default Stats;