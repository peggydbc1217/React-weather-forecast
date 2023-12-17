import styled from "styled-components";

const StyledSpinnerFullPage = styled.div`
  margin: 2.5rem;
  height: calc(100vh - 5rem);
  background-color: var(--color-dark--1);
`;

const StyledSpinnerContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSpinner = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #1d3455);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: rotate 1.5s infinite linear;

  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
`;

export default function Spinner() {
  return (
    <StyledSpinnerFullPage>
      <StyledSpinnerContainer>
        <StyledSpinner />
      </StyledSpinnerContainer>
    </StyledSpinnerFullPage>
  );
}
