import { useState } from "react";

import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import styled from "styled-components";

import { WeatherData } from "./forecastType";
import data from "./weather.json";

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

  const StyledContainer = styled.div`
    width: 80%;
    height: 100%;
    border: 5px solid blue;
  `;

  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const StyledCard = styled.div`
    width: 80%;
    height: 100%;
    margin-left: 48px;
    border: 5px solid red;
  `;

  const weatherTemplate = (weather: WeatherData) => {
    return (
      <>
        <StyledCard>
          <p>{weather.clouds.all}</p>
          <p>{weather.dt_txt}</p>
          <p>{weather.main.humidity}</p>
          <p>{weather.main.pressure}</p>
          <p>{weather.main.temp}</p>
          <p>{weather.main.temp_max}</p>
          <p>{weather.main.temp_min}</p>
        </StyledCard>
      </>
    );
  };
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
        prevIcon={(options) => (
          <div {...options.iconProps}>
            <button onClick={handlePrevClick}>123113</button>
          </div>
        )}
      />
    </StyledContainer>
  );
}
