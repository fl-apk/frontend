import React, { useState, useContext, useCallback, useEffect, Component } from 'react';
import { Button } from "@mui/material";
import axios from "axios";
import FormData from "form-data";
import { socket, SocketContext } from '../context/socket';


class Federated_F extends Component {

  constructor(props) {
    super(props)

    const rand = Math.round(Math.random() * 1000);

    this.state = {
      setFolder: props.setFolder,
      viewText: false,
      rand: rand,
    }

    this.sendFolderPath.bind(this)
    this.viewStats.bind(this)
  }

  sendFolderPath = async () => {

    socket.emit("FL_READY", this.props.folder)

    socket.on("done", (data) => {
      console.log("FL_COMPLETED", data);
    })

    this.setState({ viewText: true })

    return () => {
      socket.off("done")
      socket.off("FL_READY");
    }
  }

  viewStats = () => {
    // console.log("Viewing stats");
    window.open("/stats")
  }

  render() {
    return (
      <div className="imageinput">
        <h1>Enter Data Folder Path</h1>
        <input className="folder" type="text" onChange={e => this.state.setFolder(e.target.value)} />
        <Button className="Button" component="span" onClick={this.sendFolderPath}>
          Ready For FL
        </Button>
        {this.state.viewText ?
          <Button className="Button" component="span" onClick={this.viewStats}>
            View Stats
          </Button>
          : null
        }
      </div>
    )
  }
}

export default function Federated(props) {
  let socket = useContext(SocketContext)

  return <Federated_F socket={socket} setFolder={props.setFolder} folder={props.folder} />
}
