import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountryData } from "../../api/Api";
import styles from "./CountryPicker.module.css";
import { filteredCountries } from "../../api/Api";

const CountryPicker = ({ countryFilter }) => {
  const [countryData, setCountryData] = useState([]);
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setCountryData(await fetchCountryData());
    };
    fetchCountries();

    const countryFilter = async () => {
      setFetchedCountries(await filteredCountries);
    };
    countryFilter();
  }, [setFetchedCountries]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        default=""
        onChange={(e) => {
          countryFilter(e.target.value);
        }}
      >
        <option value="">Global</option>
        {countryData.map((country, index) => {
          const { countryData } = country;
          return (
            <option key={index} value={countryData}>
              {countryData}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
