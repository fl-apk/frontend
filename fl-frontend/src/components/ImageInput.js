const ImageInput = (props) => {

    const { setImage } = props

    return (
        <div className="imaginput">
            <input accept="image/*" type="file" id="select-image"
                onChange={e => setImage(e.target.files[0])}
            />
        </div>
    );
}

export default ImageInput;