import React from "react";
import { Map, CircleMarker, TileLayer } from "react-leaflet";

export default class Maps extends React.Component {
  render() {
    return (
      <div>
        <Map
          style={{ height: "140px", width: "60%" }}
          zoom={1}
          center={[-0.09, 51.505]}
          bounds={[[38.043268, -78.514808], [38.025884, -78.502139]]}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CircleMarker center={[this.props.lati, this.props.long]} />
        </Map>
      </div>
    );
  }
}
