import React from "react";
import Title from "./Title.js";
import Places from "./Places.js";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Title title="Restaurants of Charlottesville" />
        <Places />
      </div>
    );
  }
}
