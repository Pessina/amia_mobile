import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { Text } from '../../components/Text/Text';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../index';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContentWrapper } from './components/ContentWrapper';
import { Logo } from './components/Logo/Logo';
import { SafeArea } from '../../components/Containers/SafeArea';
import { MainContainer } from '../../components/Containers/MainContainer';

export const LoginScreen = (): JSX.Element => {
  const { t } = useTranslation('', { keyPrefix: 'login' });
  const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();

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
          <Text textAlign="center">{t('sub-header')}</Text>
          <Button
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
