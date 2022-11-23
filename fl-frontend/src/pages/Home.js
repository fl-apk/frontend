import { useState, useEffect } from "react";
import ImageInput from "../components/ImageInput";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import ImageInfer from "../components/ImageInfer";

const Home = () => {

    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
        }
    }, [image]);

    return (
        <div className="home">
            <h1>Welcome To Distributed Detection Center</h1>
            <ImageInput
                setImage={setImage}
            />
            <label htmlFor="select-image">
                <Button className="Button" component="span">
                    Upload Image
                </Button>
            </label>
            {imageUrl && image && (
                <>
                    <Box mt={2} textAlign="center">
                        <h2>Image Preview</h2>
                        <img src={imageUrl} alt={image.name} height="300px" width="600px" />
                    </Box>
                    <ImageInfer
                        image={image}
                        setImage={setImage}
                    />
                </>
            )}
        </div>
    );
}

export default Home;