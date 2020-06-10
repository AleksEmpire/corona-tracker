import axios from "axios";

const baseURL = "https://covid19.mathdro.id/api";

export const fetchCurrentData = async (country) => {
  let changeAbleURL = baseURL;
  if (country) {
    changeAbleURL = `${baseURL}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeAbleURL);
    // console.log(lastUpdate);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

// https://covid19.mathdro.id/api/daily/2-14-2020
// https://covid19.mathdro.id/api/daily/6-4-2020
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/daily`);

    const arrDailyData = data.map((dailyData) => {
      const { confirmed, deaths, reportDate } = dailyData;

      return {
        confirmed: confirmed.total,
        deaths: deaths.total,
        date: reportDate,
      };
    });
    return arrDailyData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryData = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/countries`);
    // console.log("API" + JSON.stringify(data));
    const arrCountryData = data.countries.map((countryData) => {
      return {
        countryData: countryData.name,
      };
    });
    // console.log("API" + JSON.stringify(arrCountryData));
    return arrCountryData;
  } catch (error) {
    console.log(error);
  }
};

export const filteredCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${baseURL}/countries`);

    return countries.map((country) => {
      return country.name;
    });
  } catch (error) {}
};
