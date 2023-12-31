export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface CityCoord {
  lat: number;
  lon: number;
}

interface City {
  id: number;
  name: string;
  coord: CityCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
}

export interface WeatherDataAndCountry {
  weatherData: WeatherData[];
  currentCountry: string;
}

// temp: number;
// feels_like: number;
// temp_min: number;
// temp_max: number;

// dt_txt: string;

// speed: number;

// description: string;
// main:
// icon: string;

// humidity: number;

// 6 12 18 24
