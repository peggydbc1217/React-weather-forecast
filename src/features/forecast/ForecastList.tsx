import { useState } from "react";

//styles
import { Carousel } from "primereact/carousel";
import styled, { keyframes } from "styled-components";

//type
import { WeatherData } from "./forecastType";
import data from "./weather.json";

//icons
import { FaCircleLeft } from "react-icons/fa6";
import { FaCircleRight } from "react-icons/fa6";
import { FaCloudShowersWater } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const StyledContainer = styled.div`
  width: 100%;
  height: 34%;
  padding: 16px;
  margin-top: 48px;
  background: rgba(0, 0, 0, 0.6);
`;

const rainbow = keyframes`
  0% { box-shadow: inset 0 0 40px rgba(255, 0, 0, 1); } 
  14% { box-shadow: inset 0 0 40px rgba(255, 165, 0, 1); } 
  28% { box-shadow: inset 0 0 40px rgba(255, 255, 0, 1); }
  42% { box-shadow: inset 0 0 40px rgba(0, 128, 0, 1); } 
  57% { box-shadow: inset 0 0 40px rgba(0, 0, 255, 1); } 
  71% { box-shadow: inset 0 0 40px rgba(75, 0, 130, 1); } 
  85% { box-shadow: inset 0 0 40px rgba(238, 130, 238, 1); } 
  100% { box-shadow: inset 0 0 40px rgba(255, 0, 0, 1); } 
`;

const Star = styled(CiStar)`
  position: absolute;
  top: -5%;
  right: -1%;
  transform: translate(50%, -50%);
  z-index: 1;
  transition: all 0.6s;
`;

const WeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 8px;
  width: 80%;
  height: 280px;
  margin: 0 auto;
  padding: 8px;
  border-radius: 10px;
  background-color: rgba(255, 248, 220, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  &:hover {
    animation: ${rainbow} 15s ease-in-out infinite;
    ${Star} {
      top: -1%;
      right: 1%;
      transform: rotate(45deg);
    }
  }
  position: relative;
  overflow: hidden;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 12px;
  width: 120px;
`;

export default function ForecastList() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>(data);

  // const responsiveOptions: CarouselResponsiveOption[] = [
  //   {
  //     breakpoint: "1199px",
  //     numVisible: 1,
  //     numScroll: 1,
  //   },
  //   {
  //     breakpoint: "991px",
  //     numVisible: 2,
  //     numScroll: 1,
  //   },
  //   {
  //     breakpoint: "767px",
  //     numVisible: 1,
  //     numScroll: 1,
  //   },
  // ];

  //根據props中的direction來決定要顯示的react icon 朝左朝右的方向鍵
  interface AnimatedIconProps {
    direction: "left" | "right";
    size: number;
    color: string;
  }

  const AnimatedIcon = styled(({ direction, ...props }: AnimatedIconProps) => {
    return direction === "right" ? (
      <FaCircleRight {...props} />
    ) : (
      <FaCircleLeft {...props} />
    );
  })`
    transition: transform 0.1s ease-in-out;

    &:active {
      transform: scale(0.8);
    }
  `;

  //天氣預報的body template(prime react)
  const weatherTemplate = (weather: WeatherData) => {
    return (
      <>
        <WeatherCard>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <h3>{weather.dt_txt}</h3>

          <FlexContainer>
            <Star size={120} color="#f8b7aa" />
            <FaCloudShowersWater size={20} color="#6666ff" />
            <p>降雨</p>
            <p>{weather.pop * 100}%</p>
          </FlexContainer>

          <FlexContainer>
            <WiHumidity size={20} color="0000cc" />
            <p>濕度</p>
            <p>{weather.main.humidity}%</p>
          </FlexContainer>

          <FlexContainer>
            <FaTemperatureArrowUp size={20} color="#ff4c4c" />
            <p>高溫</p>
            <p>{Math.round(weather.main.temp_min)}°C</p>
          </FlexContainer>

          <FlexContainer>
            <FaTemperatureArrowDown size={20} color="0000cc" />
            <p>低溫</p>
            <p>{Math.round(weather.main.temp_max)}°C</p>
          </FlexContainer>
        </WeatherCard>
      </>
    );
  };

  //page state
  const [page, setPage] = useState(0);

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  return (
    <StyledContainer>
      <Carousel
        value={weatherData}
        numScroll={5}
        numVisible={3}
        circular
        // responsiveOptions={responsiveOptions}
        showIndicators
        showNavigators
        page={page}
        itemTemplate={weatherTemplate}
        prevIcon={() => (
          <AnimatedIcon direction="left" size={45} color="#fbb9b9" />
        )}
        nextIcon={() => (
          <AnimatedIcon direction="right" size={45} color="#fbb9b9" />
        )}
      />
    </StyledContainer>
  );
}
