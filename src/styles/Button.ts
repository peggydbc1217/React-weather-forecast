import styled, { css } from "styled-components";

interface LargeStylesProps {
  $large?: boolean;
  $medium?: boolean;
}

const largeStyles = ({ $large, $medium }: LargeStylesProps) => {
  if ($large)
    return css`
      padding: 8px;
      border-radius: 8px;
      font-size: 1.1em;
    `;
  if ($medium)
    return css`
      padding: 6px;
      border-radius: 8px;
      font-size: 0.8em;
    `;
  return css`
    padding: 4px;
    border-radius: 4px;
    font-size: 0.8em;
  `;
};

interface ButtonProps {
  $secondary?: boolean;
  $tertiary?: boolean;
  $large?: boolean;
  $medium?: boolean;
  $outlined?: boolean;
}

export const Button = styled.button<ButtonProps>`
  color: ${(p) => p.theme.colors.primaryTextColor};
  background-color: ${(p) =>
    p.$tertiary
      ? p.$secondary
        ? p.theme.colors.secondary
        : p.theme.colors.tertiary
      : p.theme.colors.primary};

  font-weight: bold;

  ${largeStyles}

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: ${(p) => p.$outlined && `1px solid ${p.theme.colors.primary}`};
  width: ${(p) => (p.$large ? "160px" : p.$medium ? "120px" : "100px")};
  height: ${(p) => (p.$large ? "60px" : p.$medium ? "40px" : "30px")};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background-color: #eee;
    color: #666;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
    transition: all 0.3s ease-in-out;
    opacity: 0.8;
    box-shadow: ${(p) => p.$outlined && "0px 4px 4px rgba(255, 200, 0, 0.3)"};
  }
  &:active {
    transform: translateY(3px);
    transition: all 0.3s ease-in-out;
    opacity: 1;
  }
`;
