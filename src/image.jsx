import React, { Component } from 'react';

class Image extends Component {
  componentDidMount() {
    const { src } = this.props;
    const race = src.split('/')[4];
    localStorage.setItem('dog', src);
    alert(race);
  }

  render() {
    const { src } = this.props;
    return (
      <div>
        <img src={src} alt="a dog" />
      </div>
    );
  }
}

export default Image;
