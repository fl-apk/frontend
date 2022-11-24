import React, { Component } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import FormData from "form-data";
import { CirclesWithBar } from "react-loader-spinner";
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CountUp from 'react-countup';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    style={{ "fontWeight": "bolder", "fontSize": "20px" }}
                >{props.number}</Typography>
            </Box>
        </Box>
    );
}

class Val extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            setValFolder: props.setValFolder,
            loss: 0,
            accuracy: 0,
            test_len: 0,
        }

        this.sendValFolderPath.bind(this)
    }

    sendValFolderPath = () => {

        console.log("folder entered", this.props.valFolder)

        this.setState({ loading: true })

        const form = new FormData();
        form.append("val_folder", this.props.valFolder)

        axios({
            method: "post",
            url: "http://localhost:5003/batch_test",
            data: form,
        })
            .then((res) => {
                console.log(res);
                this.setState({ loss: res.data.data.loss, accuracy: res.data.data.accuracy, test_len: res.data.data.test_length, loading: false })
            })
            .catch((err) => console.log(err))
    }


    render() {
        return (
            <div className="imageinput">
                <h1>Enter Validation Data Folder Path</h1>
                <input className="folder" type="text" onChange={e => this.state.setValFolder(e.target.value)} />
                <Button className="Button" component="span" onClick={this.sendValFolderPath}>
                    Validate Model
                </Button>
                {this.state.loading ?
                    <div className="loader">
                        <CirclesWithBar
                            height="80"
                            width="80"
                            radius="9"
                            color="white"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        />
                    </div>
                    :
                    null
                }
                {this.state.accuracy ?
                    <div className="valData">

                        <div className="stat">
                            <CircularProgressWithLabel number={`${Math.round(this.state.loss * 10) / 10}`} value={100} color="error" size="100px" thickness={6} />
                            <h3>LOSS</h3>
                        </div>

                        <div className="stat">
                            <CircularProgressWithLabel number={`${Math.round(this.state.accuracy * 100)}%`} value={this.state.accuracy * 100} color="success" size="100px" thickness={6} />
                            <h3>ACCURACY</h3>
                        </div>

                        <div className="stat">
                            <CircularProgressWithLabel variant="determinate" number={`${this.state.test_len}`} value={this.state.test_len} color="info" size="100px" thickness={6} />
                            <h3>TEST LENGTH</h3>
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default Val;