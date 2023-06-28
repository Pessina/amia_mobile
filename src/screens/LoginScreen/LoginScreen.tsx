import React from 'react';
import { SafeArea } from '../../components/Containers/SafeArea';
import Input from '../../components/Input/Input';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { Form } from './components/Form';
import { Text } from '../../components/Text/Text';
import { LoginMainContainer } from './components/LoginMainContainer';
import { ScrollView } from 'react-native';
import { IconButton } from '../../components/Icon/IconButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../routes';
import { login } from '../../auth/login';
import { styles } from '../../styles/styles';

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = (): JSX.Element => {
  const { t: tValidation } = useTranslation('', { keyPrefix: 'validation' });
  const { t } = useTranslation('', { keyPrefix: 'login' });
  const navigate = useNavigation<StackNavigation>();

  const schema = yup.object().shape({
    email: yup.string().email(tValidation('invalid-email')).required(tValidation('required')),
    password: yup.string().required(tValidation('required')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const user = await login(data);
    if (user) {
      console.log('User logged in successfully.');
    }
  };

  return (
    <SafeArea>
      <LoginMainContainer>
        <IconButton
          name="chevron-left"
          onPress={() => navigate.navigate('Home')}
        />
        <Text
          size="3xl"
          color="dark"
        >
          {t('title')}
        </Text>
        <ScrollView contentContainerStyle={styles.full}>
          <Form>
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
          </Form>
          <Button
            buttonStyle="primary"
            onPress={handleSubmit(onSubmit)}
            title={t('cta')}
          />
        </ScrollView>
      </LoginMainContainer>
    </SafeArea>
  );
};
