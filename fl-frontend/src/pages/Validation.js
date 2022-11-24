import { useState } from "react";
import Val from "../components/Val";

const Validation = () => {

    const [valFolder, setValFolder] = useState(null)

    return (
        <div className="validation">
            <Val
                valFolder={valFolder}
                setValFolder={setValFolder}
            />
        </div>
    )
}

export default Validation;