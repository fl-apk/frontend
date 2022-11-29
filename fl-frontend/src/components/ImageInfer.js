import { useState, useEffect, Component } from "react";
import axios from "axios";
import FormData from "form-data";
import { FcCheckmark, FcCancel, FcSynchronize } from "react-icons/fc";
import { CirclesWithBar } from "react-loader-spinner";

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
                url: "http://localhost:5003/infer",
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
                {this.state.data == null ?
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
                {this.state.data == 1 ?
                    <>
                        <h1><FcCheckmark /></h1>
                        <h2><FcSynchronize onClick={(e) => this.props.setImage(null)} /></h2>
                    </>
                    : null
                }
                {this.state.data == 0 ?
                    <>
                        <h1><FcCancel /></h1>
                        <h2><FcSynchronize onClick={(e) => this.props.setImage(null)} /></h2>
                    </>
                    : null
                }
            </div>
        )
    }
}

export default ImageInfer;