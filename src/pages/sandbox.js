import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "../styles/main.scss";
import React, { useState, useRef, useEffect } from "react";
import MapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN =
    "pk.eyJ1IjoiYmVtYWtvbmF0ZSIsImEiOiJja2V4MmZuMmcwMDBrMnhxeWNpM3k5aDdxIn0.QyKjIu8wOjPuhc8vf_CzmQ";

class App extends React.Component {
    state = {
        viewport: {
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
        },
    };

    mapRef = React.createRef();
    geocoderContainerRef = React.createRef();
    geolocationRef = React.createRef();

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    resize = () => {
        this.handleViewportChange({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    handleViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        });
    };

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        });
    };

    handleOnResult = event => {
        console.log('handleResult', event.result.place_name);
    };

    render() {
        const { viewport } = this.state;

        return (
            <div className="Container">
                <div className="Geocoder">
                    <div ref={this.geocoderContainerRef} />
                </div>
                <MapGL
                    ref={this.mapRef}
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/bemakonate/ckexe89630vof1apiojkw9gls"
                    onViewportChange={this.handleViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}>


                    <Geocoder
                        mapRef={this.mapRef}
                        containerRef={this.geocoderContainerRef}
                        onResult={this.handleOnResult}
                        onViewportChange={this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        collapse={true} />


                    <div className="NavigationControl">
                        <NavigationControl />
                    </div>

                    <div className="Geolocation">
                        <GeolocateControl ref={this.geolocationRef} />
                    </div>


                </MapGL>
            </div >
        );
    }
}

export default App;

// const Sandbox = () => {
//     const [viewport, setViewport] = useState({
//         latitude: 37.7577,
//         longitude: -122.4376,
//         zoom: 8
//     })

//     const mapRef = useRef();
//     const geocoderContainerRef = useRef();
//     const geolocationRef = useRef();

//     useEffect(() => {
//         window.addEventListener("resize", resize);
//         resize();
//         return () => {
//             window.removeEventListener("resize", resize);
//         }
//     }, [])

//     const resize = () => {
//         handleViewportChange({
//             width: window.innerWidth,
//             height: window.innerHeight
//         });
//     };

//     const handleViewportChange = newViewportProps => {
//         setViewport({ ...viewport, ...newViewportProps });
//     };

//     const handleOnResult = event => {
//         console.log('handleResult', event.result.place_name);
//     };

//     const handleGeocoderViewportChange = viewport => {
//         const geocoderDefaultOverrides = { transitionDuration: 1000 };

//         return handleViewportChange({
//             ...viewport,
//             ...geocoderDefaultOverrides
//         });
//     };


//     return (
//         <div className="Container" style={{ width: "100vw", height: "100vh" }}>
//             <div className="Geocoder">
//                 <div ref={geocoderContainerRef} />
//             </div>
//             <MapGL
//                 ref={mapRef}
//                 {...viewport}
//                 width="100%"
//                 height="100%"
//                 mapStyle="mapbox://styles/bemakonate/ckexe89630vof1apiojkw9gls"
//                 onViewportChange={handleViewportChange}
//                 mapboxApiAccessToken={MAPBOX_TOKEN}>


//                 <Geocoder
//                     mapRef={mapRef}
//                     containerRef={geocoderContainerRef}
//                     onResult={handleOnResult}
//                     onViewportChange={handleGeocoderViewportChange}
//                     mapboxApiAccessToken={MAPBOX_TOKEN}
//                     collapsed={true} />


//                 <div className="NavigationControl">
//                     <NavigationControl />
//                 </div>

//                 <div className="Geolocation">
//                     <GeolocateControl ref={geolocationRef} />
//                 </div>
//             </MapGL>
//         </div >
//     );

// }
// export default Sandbox;