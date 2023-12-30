import { useForecastSelector } from "../../store/hooks";
import { capitilizeFirstLetter } from "../../helpers/helper";
import styled from "styled-components";
import { device } from "../../styles/Breakpoints";

const OuterCircle = styled.div`
  width: 500px;
  height: 500px;
  background: conic-gradient(
    rgba(199, 216, 239, 0.5) 5%,
    rgba(249, 248, 147, 0.8) 30%,
    rgba(199, 216, 239, 0.5) 60%,
    rgba(107, 163, 243, 0.8) 90%,
    rgba(199, 216, 239, 0.5)
  );
  border-radius: 50%;
  position: relative;

  animation: rotate 10s infinite linear;

  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }

  @media screen and (max-width: 1200px) {
    width: 400px;
    height: 400px;
  }
  @media ${device.lg} {
    width: 300px;
    height: 300px;
  }
`;

const InnerCircle = styled.div`
  width: 400px;
  height: 400px;
  background-color: rgba(196, 251, 212, 0.7);
  box-shadow: inset 0 0 40px rgba(137, 208, 244, 1);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media ${device.lg} {
    width: 300px;
    height: 300px;
  }
`;

const Container = styled.div`
  position: relative;
`;

const WeatherInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

// Component
export default function ForecastViewBar() {
  const cityName = useForecastSelector((state) => state.forecast.currentCity);
  const countryName = useForecastSelector(
    (state) => state.forecast.currentCountry
  );
  const currentWeather = useForecastSelector(
    (state) => state.forecast.weatherData[0]
  );

  return (
    <>
      <Container>
        <OuterCircle>
          <InnerCircle></InnerCircle>
        </OuterCircle>
        <WeatherInfo>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`}
            alt="weather icon"
          />
          <FlexCenter>
            <span className={`fi fi-${countryName.toLowerCase()}`}></span>
            <h2 className="forecast-cityName">
              {capitilizeFirstLetter(cityName)}
            </h2>
          </FlexCenter>
          <p className="forecast-viewvar-p">
            {capitilizeFirstLetter(currentWeather?.weather[0].description)}
          </p>
          <FlexCenter>
            <p className="forecast-viewvar-p">Tempature</p>
            <p className="forecast-viewvar-p">
              {currentWeather?.main.temp.toFixed(1)} °C
            </p>
          </FlexCenter>
          <FlexCenter>
            <p className="forecast-viewvar-p">precipitation </p>
            <p className="forecast-viewvar-p">
              {(currentWeather?.pop * 100).toFixed(1)}%
            </p>
          </FlexCenter>
        </WeatherInfo>
      </Container>
    </>
  );
}
