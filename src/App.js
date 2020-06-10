import React, { Component } from "react";
import "./App.css";
import styles from "./App.module.css";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchCurrentData } from "./api/Api";
import cov19Src from "./images/cov-19.png";
export default class App extends Component {
  state = {
    covData: {},
    country: "",
  };
  async componentDidMount() {
    const covData = await fetchCurrentData();

    this.setState({
      covData: covData,
    });
    console.log("GLOBAL" + JSON.stringify(this.state.covData));
  }

  countryFilter = async (country) => {
    // console.log(country);
    const fetchedFilterCountry = await fetchCurrentData(country);
    // console.log(fetchedFilterCountry);
    this.setState({
      covData: fetchedFilterCountry,
      country: country,
    });
    console.log(this.state.covData);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { covData, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={cov19Src} alt="Covid 19" />
        <Cards covData={covData} />
        <CountryPicker countryFilter={this.countryFilter} />
        <Chart covData={covData} country={country} />
      </div>
    );
  }
}
