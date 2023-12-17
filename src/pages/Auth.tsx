import styled from "styled-components";
const StyledContainer = styled.div`
  background: url("/img/hero.jpeg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
`;

const StyledDiv = styled.div`
  padding-top: 30px;
  width: 50%;
  margin-left: auto;
`;

const StlyedH1 = styled.h1`
  text-align: center;
  color: #f6c104;
  font-size: 48px;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  margin-top: 32px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 8px;
`;

const StlyedLi = styled.li`
  text-align: center;
  color: #f6c104;
  font-size: 24px;
`;

export default function Auth() {
  return (
    <>
      <StyledContainer>
        <StyledDiv>
          <StlyedH1>Weather Wonders:</StlyedH1>
          <StlyedH1>Discover Nature's Forecast</StlyedH1>
          <StyledUl>
            <StlyedLi>We have 2600 +</StlyedLi>
            <StlyedLi>Sign In</StlyedLi>
          </StyledUl>
        </StyledDiv>
      </StyledContainer>
    </>
  );
}
