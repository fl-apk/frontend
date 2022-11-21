import { useState, useEffect, Component } from "react";
import axios from "axios";
import FormData from "form-data";

class ImageInfer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        this.fetchresponse();
    }

    fetchresponse = async () => {
        try {

            const form = new FormData();
            form.append("image", this.props.image)

            const response = await axios({
                method: "post",
                url: "http://localhost:5000/infer",
                data: form,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            this.setState({ data: response.data.result })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="imageinfer">
                {console.log(this.state.data)}
                {this.state.data && this.state.data === 1 && <h1>YES</h1>}
                {this.state.data && this.state.data === 0 && <h1>NO</h1>}
            </div>
        )
    }
}

export default ImageInfer;