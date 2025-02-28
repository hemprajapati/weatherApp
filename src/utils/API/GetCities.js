const GEO_API_URL = import.meta.env.VITE_APP_GEO_API_URL;
const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_APP_GEO_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_APP_GEO_API_HOST,
  },
};

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}