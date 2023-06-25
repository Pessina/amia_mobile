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

export const Text = styled.Text<TextProps>`
  font-size: ${({ theme, size = 'base' }) => theme.fontSizes[size]}px;
  color: ${({ theme, color = 'DEFAULT' }) => theme.colors.text[color]};
  text-align: ${(props) => props.textAlign ?? 'left'};
  font-weight: ${({ theme, fontWeight = 'normal' }) => theme.fontWeights[fontWeight]};
`;
