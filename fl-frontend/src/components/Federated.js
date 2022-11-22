import { Component } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import FormData from "form-data";
import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from '../context/socket';

// class Federated extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             setFolder: props.setFolder,
//         }

//         this.sendFolderPath.bind(this)
//     }

//     sendFolderPath = async () => {
//         console.log(this.props.folder);

//         const form = new FormData()
//         form.append("folder", this.props.folder)

//         const ack = await axios({
//             method: "post",
//             url: "http://localhost:5000/federated",
//             data: form
//         })

//         console.log(ack)
//     }

//     render() {
//         return (
//             <div className="imageinput">
//                 <input type="text" onChange={e => this.state.setFolder(e.target.value)} />
//                 <Button className="Button" color="secondary" component="span" onClick={this.sendFolderPath}>
//                     Ready For FL
//                 </Button>
//             </div>
//         )
//     }
// }

const Federated = () => {
  
    const [folder, setFolder] = useState(null)
    const [fl,setFL] = useState(0)
    const socket = useContext(SocketContext);

    const handleFL = () => {
        if(!fl)
        {
            setFL(1)
            socket.emit("FL_START",{dir:folder});

        }
        
      };

    const handleData =(data)=>{
        console.log(data)
    }
    
    useEffect(() => {
        // as soon as the component is mounted, do the following tasks:
        socket.on("ROUND_DONE", ()=>{setFL(0)})
        socket.on("EPOCH", handleData)
        socket.emit("test",{data:"HI"})
        return () => {
          // before the component is destroyed
          socket.off("ROUND_DONE")
          socket.off("EPOCH")
        };
      }, []);


    return ( 
        
        <div className="imageinput">
            <input type="text" onChange={e => setFolder(e.target.value)} />
            <Button className="Button" color="secondary" component="span" onClick={handleFL}>
                Ready For FL
            </Button>
        </div>

     );
}
 
export default Federated;
