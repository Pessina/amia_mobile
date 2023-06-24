import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button/Button';
import { FlexContainer } from '../components/Containers/Flex/FlexContainer';
import { SpacingContainer } from '../components/Containers/SpacingContainer';
import Text from '../components/Text/Text';
import { SafeArea } from '../components/Containers/SafeArea';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../index';
import { StackNavigationProp } from '@react-navigation/stack';

const StyledImage = styled.Image`
  width: 150px;
  align-self: center;
`;

export const LoginScreen = (): JSX.Element => {
  const { t } = useTranslation('', { keyPrefix: 'login' });
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeArea>
      <SpacingContainer
        paddingTop={4}
        paddingLeft={4}
        paddingRight={4}
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
            gap={3}
            width="full"
          >
            <FlexContainer
              flexDirection="column"
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
              flexDirection="column"
              gap={2}
              width="full"
              alignItems="stretch"
            >
              <Button
                buttonStyle={'primary'}
                title={t('buttons.login')}
              />
              <Button
                onPress={() => navigate.navigate('Register')}
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
