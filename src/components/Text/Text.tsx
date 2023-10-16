import styled from 'styled-components/native';
import { FontSize, FontWeight } from '../../providers/StyledComponentsThemeProvider';
import { ReactNode } from 'react';

export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'initial' | 'inherit';

interface TextProps {
  children?: ReactNode;
  size?: FontSize;
  color?: 'light' | 'DEFAULT' | 'dark';
  textAlign?: TextAlign;
  fontWeight?: FontWeight;
  underline?: boolean;
  italic?: boolean;
}

export const Text = styled.Text<TextProps>`
  font-size: ${({ theme, size = 'base' }) => theme.fontSizes[size]}px;
  color: ${({ theme, color = 'DEFAULT' }) => theme.colors.text[color]};
  text-align: ${(props) => props.textAlign ?? 'left'};
  font-weight: ${({ theme, fontWeight = 'normal' }) => theme.fontWeights[fontWeight]};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  font-family: Inter;
`;
