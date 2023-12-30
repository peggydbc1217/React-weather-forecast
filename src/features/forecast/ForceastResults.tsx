import ForecastViewBar from "./ForecastViewBar";
import ForecastCarousel from "./ForecastCarousel";
import ForecastChart from "./ForecastChart";
import styled from "styled-components";
import { device } from "../../styles/Breakpoints";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  gap: 40px;

  @media ${device.lg} {
    flex-direction: column;
  }
`;

export default function ForceastResults() {
  return (
    <>
      <Container>
        <ForecastViewBar></ForecastViewBar>
        <ForecastChart></ForecastChart>
      </Container>
      <ForecastCarousel></ForecastCarousel>
    </>
  );
}
