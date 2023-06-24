import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button/Button';
import { FlexContainer } from '../components/Flex/FlexContainer';

const SafeArea = styled.SafeAreaView`
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledImage = styled.Image`
  width: 150px;
  align-self: center;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const HeaderText = styled.Text`
  font-size: 32px;
  color: black;
  text-align: center;
`;

const SubHeaderText = styled.Text`
  text-align: center;
`;

export const LoginScreen = (): JSX.Element => {
  const { t } = useTranslation('', { keyPrefix: 'login' });

  return (
    <SafeArea>
      <StyledImage
        source={require('../assets/images/logo.png')}
        resizeMode="contain"
      />
      <Container>
        <Container>
          <HeaderText>{t('header')}</HeaderText>
          <SubHeaderText>{t('sub-header')}</SubHeaderText>
        </Container>
        <FlexContainer
          flexDirection="column"
          gap={4}
        >
          <Button
            buttonStyle={'primary'}
            title={t('buttons.login')}
          />
          <Button
            buttonStyle={'transparent'}
            title={t('buttons.signUp')}
          />
        </FlexContainer>
      </Container>
    </SafeArea>
  );
};
