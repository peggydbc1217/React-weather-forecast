import React from "react";
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
`;

const StyledLogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
`;

const StyledLink = styled(NavLink)`
  padding: 4px 8px;
  display: block;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
  color: white;
  font-size: 16px;
  margin: auto 0;
  border-bottom: 1px solid transparent;

  &:hover,
  &:active {
    color: #fad729;
    border-bottom: 1px solid #fad729;
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
  }

  &:focus {
    color: #fad729;
    border-bottom: 1px solid #fad729;
  }

  /* &.active {
    color: red;
  } */
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledList>
        <StyledLogo src="/img/logo.png" alt="logo" />
        <StyledLink to="/">Weather Forecast</StyledLink>
        <StyledLink to="/">Climate Analysis</StyledLink>
        <StyledLink to="/">Weather Maps </StyledLink>
        <StyledLink to="/">About us</StyledLink>
        <StyledLink to="/">Contact</StyledLink>
      </StyledList>
    </StyledHeader>
  );
}
