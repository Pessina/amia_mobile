import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { Text } from '../../components/Text/Text';
import { useNavigation } from '@react-navigation/native';
import { Logo } from './components/Logo/Logo';
import { SafeArea } from '../../components/Containers/SafeArea';
import { MainContainer } from '../../components/Containers/MainContainer';
import { StackNavigation } from '../../routes';
import { View } from 'react-native';
import FlexContainer from '../../components/FlexContainer/FlexContainer';

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation('', { keyPrefix: 'screen.home' });
  const navigate = useNavigation<StackNavigation>();

  return (
    <SafeArea>
      <FlexContainer
        padding={4}
        gap={10}
      >
        <FlexContainer>
          <Logo />
        </FlexContainer>
        <FlexContainer
          gap={6}
          grow={0}
        >
          <Text
            fontWeight="bold"
            size="2xl"
            textAlign="center"
          >
            {t('header')}
          </Text>
          <Text textAlign="center">{t('subHeader')}</Text>
        </FlexContainer>
        <FlexContainer
          gap={4}
          grow={0}
        >
          <Button
            onPress={() => navigate.navigate('Login')}
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
    </SafeArea>
  );
};
