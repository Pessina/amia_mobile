import { StyledImage } from './styles';

export const Logo: React.FC = () => {
  return (
    <StyledImage
      source={require('../../../../assets/images/logo.png')}
      resizeMode="contain"
    />
  );
};
