import React from "react";

class Tag extends React.Component {
  state = {
    keyword: "",
    tags: []
  };

  componentDidMount() {
    let arrayTag = [];
    for (let i = 0; i < this.props.array.length; i++) {
      if (this.props.array[i].types.includes(this.props.tags)) {
        arrayTag.push(this.props.array[i]);
      }
    }
    this.setState({
      tags: arrayTag
    });
  }
  render() {
    return (
      <div>
        <ol>
          {this.state.tags.map(result => (
            <li>{result.name}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Tag;
