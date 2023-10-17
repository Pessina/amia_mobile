import React from 'react';
import { SafeArea } from '../../components/Containers/SafeArea';
import Input from '../../components/Input/Input';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { Text } from '../../components/Text/Text';
import { ScrollView } from 'react-native';
import { Icon } from '../../components/Icon/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../routes';
import { login } from '../../auth/login';
import { styles } from '../../styles/styles';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidingView/KeyboardAvoidingView';
import FlexContainer from '../../components/FlexContainer/FlexContainer';

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = (): JSX.Element => {
  const { t: tValidation } = useTranslation('', { keyPrefix: 'validation' });
  const { t } = useTranslation('', { keyPrefix: 'screen.login' });
  const navigate = useNavigation<StackNavigation>();

  const schema = yup.object().shape({
    email: yup.string().email(tValidation('invalid')).required(tValidation('required')),
    password: yup.string().required(tValidation('required')),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
    } catch (error) {
      setError('password', {
        type: 'manual',
        message: tValidation('invalidCredentials'),
      });
    }
  };

  return (
    <SafeArea>
      <FlexContainer
        gap={4}
        padding={4}
      >
        <FlexContainer
          gap={5}
          grow={0}
        >
          <Icon
            name="arrow-left-s-line"
            onPress={() => navigate.navigate('Home')}
          />
          <Text
            size="4xl"
            color="dark"
            fontWeight="bold"
          >
            {t('title')}
          </Text>
        </FlexContainer>
        <KeyboardAvoidingView>
          <ScrollView contentContainerStyle={styles.fullWithPaddingBottom}>
            <FlexContainer gap={2}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('email')}
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    onChangeText={field.onChange}
                    value={field.value}
                    error={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('password')}
                    secureTextEntry
                    onChangeText={field.onChange}
                    value={field.value}
                    error={errors.password?.message}
                  />
                )}
              />
            </FlexContainer>
            <Button
              buttonStyle="link"
              title={t('resetPassword')}
              onPress={() => navigate.navigate('ResetPassword')}
            />
            <Button
              buttonStyle="primary"
              onPress={handleSubmit(onSubmit)}
              title={t('cta')}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </FlexContainer>
    </SafeArea>
  );
};
