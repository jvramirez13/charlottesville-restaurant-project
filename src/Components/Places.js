import React from "react";
import axios from "axios";
import "./Places.css";
import "leaflet/dist/leaflet.css";
import Maps from "./Maps.js";

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Layout extends React.Component {
  state = {
    locations: [],
    name: [],
    open: []
  };

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.033554,-78.507980&radius=1500&type=restaurant&key=" +
          API_KEY
      )
      .then(res => {
        this.setState({
          locations: res.data.results
        });

        let openRes = [];
        for (let i = 0; i < this.state.locations.length; i++) {
          if (this.state.locations[i].opening_hours.open_now === true) {
            openRes.push(this.state.locations[i]);
          }
        }

        console.log(openRes[0]);

        this.setState({
          open: openRes
        });
      });
  }

  render() {
    return (
      <div>
        <h2>CURRENT OPEN RESTAURANTS:</h2>
        <ol>
          {this.state.open.map(opened => (
            <div>
              <li>{opened.name}</li>
              <h3>Ratings: {opened.rating}</h3>
              <h3>Price Level: {opened.price_level}</h3>
              <Maps
                lati={opened.geometry.location.lat}
                long={opened.geometry.location.lng}
              />
            </div>
          ))}
        </ol>
      </div>
    );
  }
}
