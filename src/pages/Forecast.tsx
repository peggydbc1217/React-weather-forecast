import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 920px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-image: url("/img/weather-bg.png"); */
  background-image: url("/img/taiwan-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 40px;
`;

export default function Forecast() {
  return (
    <Container>
      <Title>Weather Forecast</Title>
    </Container>
  );
}
