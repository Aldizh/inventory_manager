import React, { Component } from "react";
import renderIf from "render-if";
import "./geo_styles.css";

class GeoData extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      data: []
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var lng = this.refs.lng.value;
    var lat = this.refs.lat.value;
    const url = "api/datas?lng=" + lng + "&lat=" + lat;

    fetch(url)
      .then(function(data) {
        return data.json();
      })
      .then(response => {
        this.setState({ data: response.data });
      });
  }

  render() {
    const { data } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className="geoData" id="homepage">
        <h3>Look up by geo location</h3>
        <div id="ninj-container">
          <form id="search" onSubmit={handleSubmit}>
            <label>Enter latitude</label>
            <input type="text" ref="lat" placeholder="latitude" required />
            <label>Enter longitude</label>
            <input type="text" ref="lng" placeholder="longitude" required />
            <input type="submit" value="Find data" />
          </form>
          <ul>
            {renderIf(data.length)(
              data.map((item, index) => (
                <li key={index}>
                  <span className={item.available}>{item.available}</span>
                  <span className="name">{item.name}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default GeoData;
