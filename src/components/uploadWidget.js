import { useEffect, useRef } from "react"
const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dye6hof62',
            uploadPreset: 'hmzjurug'
        }, function (error, result) {
            console.log(result)
        })
    }, [])
    return (
        <button className="button" onClick={() => {widgetRef.current.open()}}>Upload</button>
    )

}
export default UploadWidget