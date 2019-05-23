import React from "react";
import axios from "axios";
import "./Places.css";
import "leaflet/dist/leaflet.css";
import Maps from "./Maps.js";
import Tag from "./Tags.js";

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      locations: [],
      name: [],
      open: [],
      key: "store"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.033554,-78.507980&radius=1500&type=restaurant&key=" +
          API_KEY
      )
      .then(res => {
        this.setState({
          locations: res.data.results
        });

        let openRes = [];
        for (let i = 0; i < this.state.locations.length; i++) {
          if (
            this.state.locations[i].opening_hours.open_now === true ||
            this.state.locations[i].opening_hours.open_now === undefined
          ) {
            openRes.push(this.state.locations[i]);
          }
        }
        this.setState({
          open: openRes
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ key: this.element.value });
  }

  render() {
    function outputDollar(number) {
      if (number === 1 || number === undefined) {
        return <h4>Price Level: $</h4>;
      } else if (number === 2) {
        return <h4>Price Level: $$</h4>;
      } else if (number === 3) {
        return <h4>Price Level: $$$</h4>;
      } else if (number === 4) {
        return <h4>Price Level: $$$$</h4>;
      } else {
        return <h4>Price Level: $$$$$</h4>;
      }
    }

    let restaurantKey = [];
    for (let i = 0; i < this.state.open.length; i++) {
      if (this.state.open[i].types.includes(this.state.key)) {
        restaurantKey.push(this.state.open[i]);
      }
    }
    return (
      <div>
        {console.log(restaurantKey)}
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter the type of establishment you want to filter:
            <input type="text" ref={el => (this.element = el)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Tag tags={this.state.key} array={this.state.open} />
        <p>{this.state.value}</p>
        <h2>CURRENT OPEN RESTAURANTS:</h2>
        <ol>
          {restaurantKey.map(opened => (
            <div>
              <li>
                {opened.name}
                <h4>Ratings: {opened.rating}</h4>
                {outputDollar(opened.price_level)}
                <h4>Address: {opened.vicinity}</h4>
                <Maps
                  lati={opened.geometry.location.lat}
                  long={opened.geometry.location.lng}
                />
              </li>
            </div>
          ))}
        </ol>
      </div>
    );
  }
}
