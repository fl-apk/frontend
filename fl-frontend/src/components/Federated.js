import { Component } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import FormData from "form-data";

class Federated extends Component {

    constructor(props) {
        super(props)
        this.state = {
            setFolder: props.setFolder,
        }

        this.sendFolderPath.bind(this)
    }

    sendFolderPath = async () => {
        console.log(this.props.folder);

        const form = new FormData()
        form.append("folder", this.props.folder)

        const ack = await axios({
            method: "post",
            url: "http://localhost:5000/federated",
            data: form
        })

        console.log(ack)
    }

    render() {
        return (
            <div className="imageinput">
                <input type="text" onChange={e => this.state.setFolder(e.target.value)} />
                <Button className="Button" color="secondary" component="span" onClick={this.sendFolderPath}>
                    Ready For FL
                </Button>
            </div>
        )
    }
}

export default Federated;