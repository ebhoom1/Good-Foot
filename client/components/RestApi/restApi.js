// component/restApi.js

import axios from 'axios';

export const getCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data.map(country => ({
      name: country.name.common,
      code: country.cca2,
    }));
  } catch (error) {
    console.error('Failed to fetch countries:', error.message);
    return [];
  }
};

export const getStates = async (countryCode) => {
  try {
    const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=your_geonames_username`);
    return response.data.geonames.map(state => ({
      name: state.name,
      code: state.geonameId,
    }));
  } catch (error) {
    console.error('Failed to fetch states:', error.message);
    return [];
  }
};
