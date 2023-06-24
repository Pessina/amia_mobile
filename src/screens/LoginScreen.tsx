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
        paddingTop={16}
        paddingBottom={16}
        paddingLeft={16}
        paddingRight={16}
      >
        <FlexContainer
          flexDirection="column"
          justifyContent="space-between"
          height="full"
          width="full"
        >
          <StyledImage
            source={require('../assets/images/logo.png')}
            resizeMode="contain"
          />
          <FlexContainer
            flexDirection="column"
            alignItems="center"
            gap={16}
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
            <FlexContainer
              flexDirection="column"
              gap={4}
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
