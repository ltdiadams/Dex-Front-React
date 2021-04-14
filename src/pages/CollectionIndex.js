import React, { SyntheticEvent, Component } from "react";
import { Link } from "react-router-dom";
import Data from "../data/data.json";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CollectionIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogueName: "",
      catalogueDesc: "",
      catalogueImage: "",
      data: [],
    };
  }

  async fetchUserCatalogue() {
    // make a get request to the backend for user catalogue
    // logged in user's ID stored in sessionStorage

    const response = await axios.get(
      `cataloguesByUser/${sessionStorage.getItem("userId")}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    // if the request is good, display the data in index
    if (response.status === 200) {
      this.setState({
        data: response.data,
      });
    }
  }

  componentDidMount() {
    this.fetchUserCatalogue();
  }

  submit = async (e) => {
    e.preventDefault();
    // setRedirect({value:false});
    // await axios.post('login', {
    //   email: email,
    //   password: password
    // });

    // initialize the data for the json body in the request
    const desc = this.state.catalogueDesc;
    const name = this.state.catalogueName;

    // make a post request to /addCatalogues
    const response = await axios.post(
      "addCatalogues",
      {
        name: name,
        description: desc,
        userId: sessionStorage.getItem("userId"), //userID stored in session storage
      },
      {
        headers: {
          // token stored in sessionStorage
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    // if user catalogue is added or not, display the appropriate notification
    if (response.status === 200) {
      this.fetchUserCatalogue();
      toast("Added Successfully", {
        type: "success",
      });
    } else {
      toast("An error occured", {
        type: "error",
      });
    }

    console.log(response);
  };

  handleFormData = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // simple catalogue name and description forms
  render() {
    return (
      <React.Fragment>
        <form>
          <label>Name</label>
          <input
            type="text"
            name="catalogueName"
            onChange={this.handleFormData}
            required
          />

          <label>Description</label>
          <input
            type="text"
            name="catalogueDesc"
            onChange={this.handleFormData}
            required
          />

          <button onClick={this.submit}>Add Catalogue</button>
        </form>

        <br />
        <br />

        <div className="indexlist">
          <ul>
            {this.state.data.map((data) => (
              <li>
                <Link style={{ color: "black" }} to="/test">
                  {data.description}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default CollectionIndex;
