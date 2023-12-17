import styled from "styled-components";

const StyledBackgorundBlur = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1); /* Semi-transparent background */
  backdrop-filter: blur(4px); /* Apply a blur effect to the background */
  z-index: 100;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
`;

const StyledLoaderRectangles = styled.div`
  width: 60px;
  aspect-ratio: 0.75;
  --loading-element: no-repeat linear-gradient(#fad729 0%, #ebd049 100%);
  background: var(--loading-element) 0% 50%, var(--loading-element) 50% 50%,
    var(--loading-element) 100% 50%;
  background-size: 20% 50%;
  animation: loading 1s infinite linear;

  @keyframes loading {
    20% {
      background-position: 0% 0%, 50% 50%, 100% 50%;
    }
    40% {
      background-position: 0% 100%, 50% 0%, 100% 50%;
    }
    60% {
      background-position: 0% 50%, 50% 100%, 100% 0%;
    }
    80% {
      background-position: 0% 50%, 50% 50%, 100% 100%;
    }
    100% {
    }
  }
`;

const StyledLoaderCoulds = styled.div`
  width: 120px;
  height: 200px;
  margin-left: 8px;
  background: url("https://cdn-icons-png.flaticon.com/512/2698/2698240.png")
    no-repeat center center;
  background-size: 70%;
  background-position: center;
  animation: coulds 1s infinite linear;

  @keyframes coulds {
    20% {
      background-position: 50% 50%;
    }
    40% {
      background-position: 50% 55%;
    }
    60% {
      background-position: 50% 50%;
    }
    80% {
      background-position: 50% 45%;
    }
  }
`;

export default function Loader() {
  return (
    <StyledBackgorundBlur>
      <StyledLoaderRectangles />
      <StyledLoaderCoulds />
    </StyledBackgorundBlur>
  );
}
