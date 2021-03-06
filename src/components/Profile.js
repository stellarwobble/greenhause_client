import React, { Component } from "react";
import api from "../services/api";
import PlantProfileCard from "./PlantProfileCard";
import Plants from "./Plants";
import Userinfo from "./Userinfo";
import Toggle from "./Toggle";
import Noteform from "./Noteform";
import Canvasinfo from "./Canvasinfo";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PerfectScrollbar from "react-perfect-scrollbar";

class Profile extends Component {
  state = {
    plants: [],
    canvas: [],
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }

    api.plants.getPlants().then(
      (plantdata) => (
        console.log(plantdata),
        this.setState({
          plants: plantdata,
        })
      )
    );
    api.canvas.getCanvas().then(
      (data) => (
        console.log(data),
        this.setState({
          canvas: data,
        })
      )
    );
  }
  renderFilteredCanvas = (canvasId) => {
    const filterCanvas = this.state.canvas.filter((c) => c.id !== canvasId);
    this.setState({
      canvas: filterCanvas,
    });
  };

  renderFilteredPlants = (plantId) => {
    const filterPlants = this.state.plants.filter((p) => p.id !== plantId);
    this.setState({
      plants: filterPlants,
    });
  };

  render() {
    return (
      <div id="profile" className="body">
        <br></br>
        <div className="profileElement" id="user">
          <Userinfo />
        </div>
        <br></br>

        <div className="profileElement" id="plants">
          <div>
            <h1 id="plantHeader">Plant Vault</h1>
            {this.state.plants.map((p) => {
              return (
                <PlantProfileCard
                  renderFilteredPlants={this.renderFilteredPlants}
                  key={p.id}
                  commonname={p.commonname}
                  scientificname={p.scientificname}
                  id={p.id}
                  img={p.img_url}
                />
              );
            })}
          </div>
        </div>

        <div className="profileElement" id="canvases">
          <h1 id="designHeader">Garden Designs</h1>
          {this.state.canvas.map((c) => {
            return (
              <Canvasinfo
                renderFilteredCanvas={this.renderFilteredCanvas}
                key={c.id}
                img={c.image}
                note={c.canvas_notes}
                id={c.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Profile;
