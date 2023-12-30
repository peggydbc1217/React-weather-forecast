import styled from "styled-components";
import ForceastMain from "../features/forecast/ForceastMain";
import InputDateForm from "../features/forecast/InputDateForm";
import { device } from "../styles/Breakpoints";
import Loader from "../UI/Loader";

import { useForecastSelector } from "../store/hooks";

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("/img/taiwan-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  @media ${device.md} {
    font-size: 32px;
  }
`;

export default function Forecast() {
  const isLoading = useForecastSelector((state) => state.forecast.isLoading);
  const cityName = useForecastSelector((state) => state.forecast.currentCity);

  return (
    <Container>
      <Title>Weather Forecast</Title>
      <InputDateForm />
      {isLoading && <Loader />}
      {!isLoading && cityName && <ForceastMain />}
    </Container>
  );
}
