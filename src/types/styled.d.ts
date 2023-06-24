import 'styled-components';
import { Theme } from '../providers/StyledComponentsThemeProvider';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
