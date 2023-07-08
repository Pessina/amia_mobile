import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { Text } from '../../components/Text/Text';
import { useNavigation } from '@react-navigation/native';
import { ContentWrapper } from './components/ContentWrapper';
import { Logo } from './components/Logo/Logo';
import { SafeArea } from '../../components/Containers/SafeArea';
import { MainContainer } from '../../components/Containers/MainContainer';
import { StackNavigation } from '../../routes';

export const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation('', { keyPrefix: 'screen.home' });
  const navigate = useNavigation<StackNavigation>();

  return (
    <SafeArea>
      <MainContainer>
        <Logo />
        <ContentWrapper>
          <Text
            color="dark"
            fontWeight="bold"
            size="2xl"
            textAlign="center"
          >
            {t('header')}
          </Text>
          <Text textAlign="center">{t('subHeader')}</Text>
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
        </ContentWrapper>
      </MainContainer>
    </SafeArea>
  );
};
