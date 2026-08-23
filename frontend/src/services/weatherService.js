/**
 * AGRI NEXUS — CENTRALIZED LIVE WEATHER SERVICE
 * Powered by Open-Meteo REST API (Free, No API Key Required)
 */

export const AP_DISTRICT_PRESETS = [
  { id: 'tirupati', name: 'Tirupati', district: 'Tirupati', state: 'Andhra Pradesh', lat: 13.6288, lon: 79.4192 },
  { id: 'guntur', name: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', lat: 16.3067, lon: 80.4365 },
  { id: 'vijayawada', name: 'Vijayawada', district: 'NTR', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.6480 },
  { id: 'kurnool', name: 'Kurnool', district: 'Kurnool', state: 'Andhra Pradesh', lat: 15.8281, lon: 78.0373 },
  { id: 'nellore', name: 'Nellore', district: 'SPSR Nellore', state: 'Andhra Pradesh', lat: 14.4426, lon: 79.9865 },
  { id: 'visakhapatnam', name: 'Visakhapatnam', district: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185 },
  { id: 'rajahmundry', name: 'Rajahmundry', district: 'East Godavari', state: 'Andhra Pradesh', lat: 17.0005, lon: 81.8040 },
  { id: 'anantapur', name: 'Anantapur', district: 'Anantapur', state: 'Andhra Pradesh', lat: 14.6819, lon: 77.6006 },
  { id: 'hyderabad', name: 'Hyderabad', district: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
  { id: 'bengaluru', name: 'Bengaluru', district: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
];

/**
 * WMO Weather code interpreter into friendly labels, icons, and 3D environment modes
 */
export const parseWMOCode = (code, isDay = 1) => {
  // 0: Clear sky
  if (code === 0) {
    return {
      condition: isDay ? 'clear' : 'night',
      label: isDay ? 'Clear Sky' : 'Clear Night',
      icon: isDay ? '☀️' : '🌙',
      description: isDay ? 'Bright sunny conditions with warm agricultural sunlight.' : 'Clear starry night sky over the fields.',
      envMode: isDay ? 'clear' : 'night',
    };
  }

  // 1, 2: Mainly clear, partly cloudy
  if (code === 1 || code === 2) {
    return {
      condition: 'partly_cloudy',
      label: 'Partly Cloudy',
      icon: isDay ? '🌤️' : '☁️',
      description: 'Scattered clouds with intermittent sunlight.',
      envMode: 'partly_cloudy',
    };
  }

  // 3: Overcast
  if (code === 3) {
    return {
      condition: 'cloudy',
      label: 'Overcast & Cloudy',
      icon: '☁️',
      description: 'Continuous cloud cover across the farm canopy.',
      envMode: 'cloudy',
    };
  }

  // 45, 48: Fog
  if (code === 45 || code === 48) {
    return {
      condition: 'fog',
      label: 'Atmospheric Fog',
      icon: '🌫️',
      description: 'Dense morning ground mist with reduced visibility.',
      envMode: 'fog',
    };
  }

  // 51, 53, 55, 56, 57: Drizzle
  if (code >= 51 && code <= 57) {
    return {
      condition: 'rain',
      label: 'Light Drizzle & Rain',
      icon: '🌦️',
      description: 'Light continuous drizzle moistening crop soil.',
      envMode: 'rain',
    };
  }

  // 61, 63, 65, 66, 67, 80, 81, 82: Rain & Showers
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    const isHeavy = code === 65 || code === 82;
    return {
      condition: 'rain',
      label: isHeavy ? 'Heavy Rain' : 'Moderate Rain',
      icon: '🌧️',
      description: isHeavy
        ? 'Heavy rainfall wetting furrows and irrigation channels.'
        : 'Steady rain soaking agricultural topsoil.',
      envMode: 'rain',
    };
  }

  // 95, 96, 99: Thunderstorm
  if (code >= 95 && code <= 99) {
    return {
      condition: 'thunderstorm',
      label: 'Heavy Thunderstorm & Rain',
      icon: '⛈️',
      description: 'Severe convective storm with lightning discharges and heavy downpour.',
      envMode: 'thunderstorm',
    };
  }

  return {
    condition: 'partly_cloudy',
    label: 'Partly Cloudy',
    icon: '🌤️',
    description: 'Normal seasonal agricultural weather.',
    envMode: 'partly_cloudy',
  };
};

/**
 * Fetch live weather from Open-Meteo REST API
 */
export const fetchLiveWeather = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open-Meteo API responded with status ${response.status}`);
  }

  const data = await response.json();
  const current = data.current || {};
  const hourly = data.hourly || {};
  const daily = data.daily || {};

  const parsedCondition = parseWMOCode(current.weather_code, current.is_day);

  // Normalize wind direction to compass abbreviation
  const deg = current.wind_direction_10m || 0;
  const compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const windCompass = compassDirections[Math.round(deg / 22.5) % 16];

  // Process next 12 hourly intervals
  const hourlyForecast = [];
  if (hourly.time && hourly.time.length > 0) {
    const nowIdx = 0;
    for (let i = nowIdx; i < Math.min(hourly.time.length, nowIdx + 12); i++) {
      const timeStr = hourly.time[i];
      const hour = new Date(timeStr).getHours();
      const formattedHour = i === 0 ? 'NOW' : `${hour.toString().padStart(2, '0')}:00`;
      const wCode = hourly.weather_code ? hourly.weather_code[i] : 0;
      const wParsed = parseWMOCode(wCode, 1);

      hourlyForecast.push({
        time: formattedHour,
        temp: Math.round(hourly.temperature_2m[i]),
        rainProb: hourly.precipitation_probability ? hourly.precipitation_probability[i] : 0,
        rainMm: hourly.precipitation ? hourly.precipitation[i] : 0,
        windSpeed: hourly.wind_speed_10m ? Math.round(hourly.wind_speed_10m[i]) : 0,
        icon: wParsed.icon,
        label: wParsed.label,
      });
    }
  }

  // Process 7-day daily forecast
  const dailyForecast = [];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (daily.time && daily.time.length > 0) {
    for (let d = 0; d < Math.min(daily.time.length, 7); d++) {
      const dateObj = new Date(daily.time[d]);
      const dayName = d === 0 ? `Today (${daysOfWeek[dateObj.getDay()]})` : daysOfWeek[dateObj.getDay()];
      const wCode = daily.weather_code ? daily.weather_code[d] : 0;
      const wParsed = parseWMOCode(wCode, 1);

      dailyForecast.push({
        day: dayName,
        maxTemp: Math.round(daily.temperature_2m_max[d]),
        minTemp: Math.round(daily.temperature_2m_min[d]),
        rainProb: daily.precipitation_probability_max ? daily.precipitation_probability_max[d] : 0,
        rainSum: daily.precipitation_sum ? daily.precipitation_sum[d] : 0,
        icon: wParsed.icon,
        label: wParsed.label,
        sunrise: daily.sunrise ? daily.sunrise[d] : null,
        sunset: daily.sunset ? daily.sunset[d] : null,
      });
    }
  }

  // Application-Generated Agricultural Weather Insights
  const temp = Math.round(current.temperature_2m);
  const rainCurrent = current.precipitation || 0;
  const windSpeed = Math.round(current.wind_speed_10m || 0);
  const humidity = current.relative_humidity_2m || 0;
  const todayRainSum = daily.precipitation_sum ? daily.precipitation_sum[0] : 0;

  const insights = [];

  if (parsedCondition.condition === 'thunderstorm' || todayRainSum > 15 || rainCurrent > 5) {
    insights.push({
      type: 'alert',
      icon: '🌧️',
      title: 'HEAVY RAIN & STORM ALERT',
      detail: `Significant rainfall (${todayRainSum.toFixed(1)}mm) expected. Postpone all pesticide spraying and field ploughing. Inspect soil bund drainage.`,
      urgency: 'high',
    });
  } else if (todayRainSum > 3) {
    insights.push({
      type: 'warning',
      icon: '💧',
      title: 'LIGHT RAINFALL FORECAST',
      detail: 'Recent/forecast rain may fulfill moisture requirements. Hold supplemental borewell/drip irrigation.',
      urgency: 'medium',
    });
  } else if (temp > 36) {
    insights.push({
      type: 'warning',
      icon: '☀️',
      title: 'HIGH EVAPOTRANSPIRATION ALERT',
      detail: 'High daytime temperatures detected. Schedule evening or early morning micro-irrigation to reduce crop heat stress.',
      urgency: 'medium',
    });
  } else {
    insights.push({
      type: 'good',
      icon: '🌱',
      title: 'FAVORABLE FIELD CONDITIONS',
      detail: 'Current atmospheric conditions appear suitable for general cultivation, intercultural weeding, and fertilizer application.',
      urgency: 'low',
    });
  }

  // Spraying advice
  if (windSpeed > 20 || rainCurrent > 0 || parsedCondition.condition === 'rain' || parsedCondition.condition === 'thunderstorm') {
    insights.push({
      type: 'spray',
      icon: '🧴',
      title: 'SPRAYING CONDITIONS: UNFAVORABLE',
      detail: `Wind speed (${windSpeed} km/h) or active precipitation will cause chemical spray drift and chemical washoff. Delay spraying operations.`,
      urgency: 'medium',
    });
  } else {
    insights.push({
      type: 'spray',
      icon: '🧴',
      title: 'SPRAYING CONDITIONS: OPTIMAL',
      detail: `Gentle wind (${windSpeed} km/h) and moderate humidity (${humidity}%) provide optimal absorption conditions.`,
      urgency: 'low',
    });
  }

  return {
    raw: data,
    coordinates: { lat, lon },
    current: {
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      precipitation: current.precipitation,
      rain: current.rain,
      cloudCover: current.cloud_cover,
      windSpeed: Math.round(current.wind_speed_10m),
      windDirection: current.wind_direction_10m,
      windCompass,
      isDay: current.is_day === 1,
      weatherCode: current.weather_code,
      parsedCondition,
      visibilityKm: (current.visibility ? (current.visibility / 1000).toFixed(1) : (parsedCondition.condition === 'fog' ? '1.5' : '10.0')),
      time: current.time,
    },
    hourly: hourlyForecast,
    daily: dailyForecast,
    insights,
    sunrise: daily.sunrise && daily.sunrise[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '05:52 AM',
    sunset: daily.sunset && daily.sunset[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '18:38 PM',
  };
};

/**
 * City Autocomplete Geocoding Search using Open-Meteo
 */
export const searchLocations = async (query) => {
  if (!query || query.trim().length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) return [];

  const data = await response.json();
  if (!data.results) return [];

  return data.results.map((r) => ({
    id: `${r.id}`,
    name: r.name,
    district: r.admin2 || r.admin1 || '',
    state: r.admin1 || '',
    country: r.country || '',
    lat: r.latitude,
    lon: r.longitude,
  }));
};
