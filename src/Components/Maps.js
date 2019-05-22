import React from "react";
import { Map, CircleMarker, TileLayer } from "react-leaflet";

export default class Maps extends React.Component {
  render() {
    return (
      <div>
        <Map
          style={{ height: "300px", width: "50%" }}
          zoom={1}
          center={[-0.09, 51.505]}
          bounds={[
            [38.043268, -78.514808],
            [38.030812, -78.480846]
          ]}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CircleMarker center={[this.props.lati, this.props.long]} />
        </Map>
      </div>
    );
  }
}
