import { useEffect, useRef } from "react"

const ImageGallery = () => {
    const containerRef = useRef(null)
    useEffect(() => {
        if (window && containerRef.current) {
            window.cloudinary.galleryWidget({
                container: containerRef.current,
                cloudName: 'dye6hof62',
                mediaAssets: [{tag: 'gallery-images'}]
            }).render()
        }
    }, [])
    return (
        <div ref={containerRef} style={{width: '300px', height: '300px'}}>

                </div>
    )
}
export default ImageGallery