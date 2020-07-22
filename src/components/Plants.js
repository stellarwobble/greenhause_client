import React, { Component } from "react";
import api from "../services/api";
import PlantCard from "./PlantCard";
import Search from "./Search";

class Plants extends Component {
  state = {
    plants: [],
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
  }

  handleSearch = (searchValue) => {
    return api.plants.searchPlants(searchValue).then((resp) => {
      this.setState({
        plants: resp.data,
      });
    });
  };

  render() {
    return (
      <div className="body">
        <h1>Plants</h1>
        <br></br>
        <Search handleSearch={this.handleSearch} />
        <br></br>
        {this.state.plants.map((p) => {
          return <PlantCard key={p.id} p={p} />;
        })}
      </div>
    );
  }
}

export default Plants;
