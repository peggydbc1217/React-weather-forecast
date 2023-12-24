import ForecastViewBar from "./ForecastViewBar";
import ForecastList from "./ForecastList";
import ForecastChart from "./ForecastChart";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export default function ForceastMain() {
  return (
    <>
      <Container>
        <ForecastViewBar></ForecastViewBar>
        <ForecastChart></ForecastChart>
      </Container>
      <ForecastList></ForecastList>
    </>
  );
}
