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
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidingView/KeyboardAvoidingView';
import { sendPasswordResetEmail } from '../../auth/resetPassword';
import FlexContainer from '../../components/FlexContainer/FlexContainer';

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
      <FlexContainer
        gap={6}
        padding={4}
      >
        <FlexContainer
          gap={5}
          grow={0}
        >
          <Icon
            name="arrow-left-s-line"
            onPress={() => navigate.navigate('Login')}
          />
          <Text
            size="4xl"
            fontWeight="bold"
          >
            {t('title')}
          </Text>
        </FlexContainer>
        <KeyboardAvoidingView>
          <FlexContainer>
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
          </FlexContainer>
          <Button
            buttonStyle="primary"
            onPress={handleSubmit(onSubmit)}
            title={t('cta')}
          />
        </KeyboardAvoidingView>
      </FlexContainer>
    </SafeArea>
  );
};
