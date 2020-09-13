import React from 'react'
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "../../../styles/main.scss";
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
            ...this.state,
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
        if (this.props.getAddress) {
            this.props.getAddress(event.result.place_name, event.result.center);
        }
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
                        collapsed={true} />


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
