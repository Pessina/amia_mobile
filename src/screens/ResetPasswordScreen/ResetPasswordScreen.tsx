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
import { styles } from '../../styles/styles';
import { KeyboardAvoidingView } from '../../components/AppKeyboardAvoidingView/AppKeyboardAvoidingView';
import { ResetPasswordMainContainer } from './components/ResetPasswordMainContainer';
import { Form } from './components/Form';
import { sendPasswordResetEmail } from '../../auth/resetPassword';

type FormData = {
  email: string;
};

export const ResetPasswordScreen = (): JSX.Element => {
  const { t: tValidation } = useTranslation('', { keyPrefix: 'validation' });
  const { t } = useTranslation('', { keyPrefix: 'screen.resetPassword' });
  const navigate = useNavigation<StackNavigation>();

  const schema = yup.object().shape({
    email: yup.string().email(tValidation('invalid')).required(tValidation('required')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (await sendPasswordResetEmail(data.email)) {
      navigate.navigate('Home');
    }
  };

  return (
    <SafeArea>
      <ResetPasswordMainContainer>
        <Icon
          name="arrow-left-s-line"
          onPress={() => navigate.navigate('Login')}
        />
        <Text
          size="3xl"
          color="dark"
        >
          {t('title')}
        </Text>
        <KeyboardAvoidingView>
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
            </Form>

            <Button
              buttonStyle="primary"
              onPress={handleSubmit(onSubmit)}
              title={t('cta')}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ResetPasswordMainContainer>
    </SafeArea>
  );
};
