import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: black;
`;

const StyledList = styled.ul`
  width: 400px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 36px;
  border-bottom: 8px solid transparent;
`;

const StyledLogo = styled.img`
  max-width: 100px;
  height: 100px;
  z-index: 1;
  transition: all 0.3s ease-in-out;
`;

interface StyledLinkProps {
  $logo?: boolean;
  $button?: boolean;
}

export const StyledLink = styled(NavLink)<StyledLinkProps>`
  padding: 4px 8px;
  display: block;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
  color: ${(p) => (p.$button ? p.theme.colors.primaryTextColor : "white")};
  font-size: 16px;
  margin: auto 0;
  border-bottom: ${(p) => (p.$button ? "1px solid #fad729" : "none")};

  &:hover,
  &:active,
  &:focus {
    color: #fad729;
    border-bottom: ${(p) => (p.$logo ? "none" : "1px solid #fad729")};
    transition: all 0.3s ease-in-out;
    transform: ${(p) => (p.$button ? "" : "scale(1.1)")};
  }

  animation: ${(p) => p.$button && `sizeChange 1s ease-in-out infinite`};
  /* &.active {
    color: red;
  } */

  @keyframes sizeChange {
    0% {
      transform: scale(1);
      color: #fad729;
    }
    50% {
      transform: scale(1.1);
      color: ${(p) => p.theme.colors.primaryTextColor};
    }
    100% {
      transform: scale(1);
      color: #fad729;
    }
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledList>
        <StyledLink to="/" $logo>
          <StyledLogo src="/img/logo.png" alt="logo" />
        </StyledLink>
        <StyledLink to="/forecast">Weather Forecast</StyledLink>
        <StyledLink to="/">Climate Analysis</StyledLink>
        <StyledLink to="/">Weather Maps </StyledLink>
        <StyledLink to="/">About us</StyledLink>
        <StyledLink to="/">Contact</StyledLink>
      </StyledList>
    </StyledHeader>
  );
}
