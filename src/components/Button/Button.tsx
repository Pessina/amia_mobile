import React from 'react';
import styled from 'styled-components/native';

export type ButtonProps = {
  buttonStyle: 'primary' | 'transparent';
  title?: string;
};

const StyledButton = styled.Pressable<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  background-color: ${(props) =>
    props.buttonStyle === 'primary' ? props.theme.colors.primary.DEFAULT : 'transparent'};
`;

const StyledText = styled.Text<ButtonProps>`
  color: ${(props) => (props.buttonStyle === 'primary' ? 'white' : props.theme.colors.text.dark)};
  font-weight: bold;
`;

export const Button: React.FC<ButtonProps> = ({ buttonStyle = 'primary', title }) => {
  return (
    <StyledButton buttonStyle={buttonStyle}>
      <StyledText buttonStyle={buttonStyle}>{title}</StyledText>
    </StyledButton>
  );
};
