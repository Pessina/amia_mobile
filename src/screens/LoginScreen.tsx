import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button/Button';
import { FlexContainer } from '../components/Containers/Flex/FlexContainer';
import { SpacingContainer } from '../components/Containers/SpacingContainer';
import Text from '../components/Text/Text';

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

export const LoginScreen = (): JSX.Element => {
  const { t } = useTranslation('', { keyPrefix: 'login' });

  return (
    <SafeArea>
      <SpacingContainer
        paddingTop={4}
        paddingBottom={4}
        paddingLeft={4}
        paddingRight={4}
      >
        <FlexContainer
          direction="column"
          justifyContent="space-between"
          height="full"
          width="full"
        >
          <StyledImage
            source={require('../assets/images/logo.png')}
            resizeMode="contain"
          />
          <FlexContainer
            direction="column"
            alignItems="center"
            gap={3}
            width="full"
          >
            <FlexContainer
              direction="column"
              gap={2}
              width="full"
            >
              <Text
                color="dark"
                fontWeight="bold"
                size="2xl"
                textAlign="center"
              >
                {t('header')}
              </Text>
              <Text textAlign="center">{t('sub-header')}</Text>
            </FlexContainer>
            <FlexContainer
              direction="column"
              gap={2}
              width="full"
              alignItems="stretch"
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
          </FlexContainer>
        </FlexContainer>
      </SpacingContainer>
    </SafeArea>
  );
};
