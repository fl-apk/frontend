import { useState, useEffect } from "react";
import Federated from "../components/Federated";

const FedL = () => {

    const [folder, setFolder] = useState(null)

    return (
        <div className="fedl">
            <Federated
                setFolder={setFolder}
                folder={folder}
            />
        </div>
    )
}

export default FedL;