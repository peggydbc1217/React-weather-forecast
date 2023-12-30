//styles
import styled, { keyframes } from "styled-components";
import { Carousel } from "primereact/carousel";
import { CarouselResponsiveOption } from "primereact/carousel";
import { device } from "../../styles/Breakpoints";

//type
import { WeatherData } from "./forecastType";

//icons
import { FaCircleLeft } from "react-icons/fa6";
import { FaCircleRight } from "react-icons/fa6";
import { FaCloudShowersWater } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaWind } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

//redux
import { useForecastSelector } from "../../store/hooks";

const StyledContainer = styled.div`
  width: 100%;
  height: 330px;
  padding: 16px;
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
  @media ${device.xs} {
    width: 95%;
  }
  height: 300px;
  margin: 0 auto;
  padding-bottom: 16px;

  background-color: rgba(255, 248, 220, 0.9);
  border-radius: 10px;
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
  visibility: visible;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 12px;
  width: 150px;
`;

//根據props中的direction來決定要顯示Carousel中 朝左朝右的方向鍵
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

// Component
export default function ForecastList() {
  const weather = useForecastSelector((state) => state.forecast.weatherData);

  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1199px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "600px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  //未來天氣預報的Card(prime react UI)
  const weatherTemplate = (weather: WeatherData) => {
    return (
      <>
        <WeatherCard>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <h3 className="text-center">{weather.dt_txt}</h3>

          <FlexContainer>
            <Star size={120} color="#f8b7aa" />
            <FaCloudShowersWater size={20} color="#6666ff" />
            <p>POP</p>
            <p>{(weather.pop * 100).toFixed(0)}%</p>
          </FlexContainer>

          <FlexContainer>
            <WiHumidity size={20} color="0000cc" />
            <p>Humidity</p>
            <p>{weather.main.humidity}%</p>
          </FlexContainer>

          <FlexContainer>
            <FaTemperatureArrowUp size={20} color="#ff4c4c" />
            <p>Temp</p>
            <p>{Math.round(weather.main.temp)}°C</p>
          </FlexContainer>

          <FlexContainer>
            <FaWind size={20} color="0000cc" />
            <p>Wind</p>
            <p>{Math.round(weather.wind.speed)}m/s</p>
          </FlexContainer>
        </WeatherCard>
      </>
    );
  };

  return (
    <StyledContainer>
      <Carousel
        value={weather}
        numScroll={3}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        circular
        showIndicators
        showNavigators
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
