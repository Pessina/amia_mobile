import React from 'react';
import styled from 'styled-components/native';
import { FontSize, FontWeight } from '../../providers/StyledComponentsThemeProvider';

export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'initial' | 'inherit';

interface TextProps {
  children: string;
  size?: FontSize;
  color?: 'light' | 'DEFAULT' | 'dark';
  textAlign?: TextAlign;
  fontWeight?: FontWeight;
}

const TextStyled = styled.Text<TextProps>`
  font-size: ${({ theme, size = 'base' }) => theme.fontSizes[size]}px;
  color: ${({ theme, color = 'DEFAULT' }) => theme.colors.text[color]};
  text-align: ${(props) => props.textAlign ?? 'left'};
  font-weight: ${({ theme, fontWeight = 'normal' }) => theme.fontWeights[fontWeight]};
`;

const Text: React.FC<TextProps> = ({ children, size, color, textAlign, fontWeight }) => {
  return (
    <TextStyled
      size={size}
      color={color}
      textAlign={textAlign}
      fontWeight={fontWeight}
    >
      {children}
    </TextStyled>
  );
};

export default Text;
