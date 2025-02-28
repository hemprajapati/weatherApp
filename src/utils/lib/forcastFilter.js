export const getTodayForecastWeather = (
    response,
    current_date,
    current_datetime
  ) => {
    let all_today_forecasts = [];
  
    if (!response || Object.keys(response).length === 0 || response.cod === '404')
      return [];
    else
      response?.list.slice().map((item) => {
        if (item.dt_txt.startsWith(current_date.substring(0, 10))) {
          if (item.dt > current_datetime) {
            all_today_forecasts.push({
              time: item.dt_txt.split(' ')[1].substring(0, 5),
              icon: item.weather[0].icon,
              temperature: Math.round(item.main.temp) + ' °C',
            });
          }
        }
        return all_today_forecasts;
      });
  
    if (all_today_forecasts.length < 7) {
      return [...all_today_forecasts];
    } else {
      return all_today_forecasts.slice(-6);
    }
  };

  const ALL_DESCRIPTIONS = [
    { icon: '01d', description: 'clear sky' },
    { icon: '02d', description: 'few clouds' },
    { icon: '03d', description: 'scattered clouds' },
    { icon: '04d', description: 'broken clouds' },
    { icon: '04d', description: 'overcast clouds' },
    { icon: '09d', description: 'shower rain' },
    { icon: '09d', description: 'light intensity drizzle' },
    { icon: '09d', description: 'drizzle' },
    { icon: '09d', description: 'heavy intensity drizzle' },
    { icon: '09d', description: 'light intensity drizzle rain' },
    { icon: '09d', description: 'drizzle rain' },
    { icon: '09d', description: 'heavy intensity drizzle rain' },
    { icon: '09d', description: 'shower rain and drizzle' },
    { icon: '09d', description: 'heavy shower rain and drizzle' },
    { icon: '09d', description: 'shower drizzle' },
    { icon: '09d', description: 'light intensity shower rain' },
    { icon: '09d', description: 'shower rain' },
    { icon: '09d', description: 'heavy intensity shower rain' },
    { icon: '09d', description: 'ragged shower rain' },
    { icon: '10d', description: 'rain' },
    { icon: '10d', description: 'light rain' },
    { icon: '10d', description: 'moderate rain' },
    { icon: '10d', description: 'heavy intensity rain' },
    { icon: '10d', description: 'very heavy rain' },
    { icon: '10d', description: 'extreme rain' },
    { icon: '11d', description: 'thunderstorm' },
    { icon: '11d', description: 'thunderstorm with light rain' },
    { icon: '11d', description: 'thunderstorm with rain' },
    { icon: '11d', description: 'thunderstorm with heavy rain' },
    { icon: '11d', description: 'light thunderstorm' },
    { icon: '11d', description: 'heavy thunderstorm' },
    { icon: '11d', description: 'ragged thunderstorm' },
    { icon: '11d', description: 'thunderstorm with light drizzle' },
    { icon: '11d', description: 'thunderstorm with drizzle' },
    { icon: '11d', description: 'thunderstorm with heavy drizzle' },
    { icon: '13d', description: 'snow' },
    { icon: '13d', description: 'freezing rain' },
    { icon: '13d', description: 'light snow' },
    { icon: '13d', description: 'Snow' },
    { icon: '13d', description: 'Heavy snow' },
    { icon: '13d', description: 'Sleet' },
    { icon: '13d', description: 'Light shower sleet' },
    { icon: '13d', description: 'Light rain and snow' },
    { icon: '13d', description: 'Rain and snow' },
    { icon: '13d', description: 'Light shower snow' },
    { icon: '13d', description: 'Shower snow' },
    { icon: '13d', description: 'Heavy shower snow' },
    { icon: '50d', description: 'mist' },
    { icon: '50d', description: 'Smoke' },
    { icon: '50d', description: 'Haze' },
    { icon: '50d', description: 'sand/ dust whirls' },
    { icon: '50d', description: 'fog' },
    { icon: '50d', description: 'sand' },
    { icon: '50d', description: 'dust' },
    { icon: '50d', description: 'volcanic ash' },
    { icon: '50d', description: 'squalls' },
    { icon: '50d', description: 'tornado' },
  ];
  function groupBy(key) {
    return (array) =>
      array.reduce((acc, { [key]: property, date, ...rest }) => {
        (acc[property] ||= []).push(rest);
        return acc;
      }, {});
  }

  function getMostFrequentWeather(arr) {
    const hashmap = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(hashmap).reduce((a, b) =>
      hashmap[a] > hashmap[b] ? a : b
    );
  }                    
 function getAverage(array, isRound = true) {
  let average = 0;
  if (isRound) {
    average = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    if (average === 0) {
      average = 0;
    }
  } else average = (array.reduce((a, b) => a + b, 0) / array.length).toFixed(2);

  return average;
}
 const descriptionToIconName = (desc, descriptions_list) => {
  let iconName = descriptions_list.find((item) => item.description === desc);
  return iconName.icon || 'unknown';
};
  export const getWeekForecastWeather = (response) => {
    let foreacast_data = [];
    let descriptions_data = [];
  
    if (!response || Object.keys(response).length === 0 || response.cod === '404')
      return [];
    else
      response?.list.slice().map((item, idx) => {
        descriptions_data.push({
          description: item.weather[0].description,
          date: item.dt_txt.substring(0, 10),
        });
        foreacast_data.push({
          date: item.dt_txt.substring(0, 10),
          temp: item.main.temp,
          humidity: item.main.humidity,
          wind: item.wind.speed,
          clouds: item.clouds.all,
        });
        return { idx, item };
      });
  
      
    const groupByDate = groupBy('date');
    let grouped_forecast_data = groupByDate(foreacast_data);
    let grouped_forecast_descriptions = groupByDate(descriptions_data);
    const description_keys = Object.keys(grouped_forecast_descriptions);
    let dayDescList = [];
  
    description_keys.forEach((key) => {
      let singleDayDescriptions = grouped_forecast_descriptions[key].map(
        (item) => item.description
      );
      let mostFrequentDescription = getMostFrequentWeather(singleDayDescriptions);
      
      dayDescList.push(mostFrequentDescription);
    });
  
    const forecast_keys = Object.keys(grouped_forecast_data);
    
    let dayAvgsList = [];
  
    forecast_keys.forEach((key, idx) => {
      let dayTempsList = [];
      let dayHumidityList = [];
      let dayWindList = [];
      let dayCloudsList = [];
  
      for (let i = 0; i < grouped_forecast_data[key].length; i++) {
        dayTempsList.push(grouped_forecast_data[key][i].temp);
        dayHumidityList.push(grouped_forecast_data[key][i].humidity);
        dayWindList.push(grouped_forecast_data[key][i].wind);
        dayCloudsList.push(grouped_forecast_data[key][i].clouds);
      }
  
      dayAvgsList.push({
        date: key,
        temp: getAverage(dayTempsList),
        humidity: getAverage(dayHumidityList),
        wind: getAverage(dayWindList, false),
        clouds: getAverage(dayCloudsList),
        description: dayDescList[idx],
        icon: descriptionToIconName(dayDescList[idx], ALL_DESCRIPTIONS),
      });
    });
  
    return dayAvgsList;
  };