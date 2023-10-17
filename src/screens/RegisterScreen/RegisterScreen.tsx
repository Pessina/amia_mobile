import React, { useState } from 'react';
import { SafeArea } from '../../components/Containers/SafeArea';
import Input from '../../components/Input/Input';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { Text } from '../../components/Text/Text';
import { formatCPF, replaceTagsInText } from '../../utils/text';
import { Linking, ScrollView } from 'react-native';
import { Icon } from '../../components/Icon/Icon';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../routes';
import { createUser } from '../../auth/createUser';
import { existDoctor, useCreateDoctor } from '../../api/doctor';
import { Error } from '../../components/Error/Error';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidingView/KeyboardAvoidingView';
import { styles } from '../../styles/styles';
import FlexContainer from '../../components/FlexContainer/FlexContainer';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '../../utils/constants';

type FormData = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  crm: string;
  specialty: string;
};

export const RegisterScreen = (): JSX.Element => {
  const { t: tValidation } = useTranslation('', { keyPrefix: 'validation' });
  const { t } = useTranslation('', { keyPrefix: 'screen.register' });
  const navigate = useNavigation<StackNavigation>();
  const createDoctorMutation = useCreateDoctor();
  const [error, setError] = useState<null | string>(null);

  const schema = yup.object().shape({
    name: yup.string().required(tValidation('required')),
    email: yup.string().email(tValidation('invalid')).required(tValidation('required')),
    password: yup.string().required(tValidation('required')),
    cpf: yup.string().required(tValidation('required')).length(14, tValidation('invalid')),
    crm: yup.string().required(tValidation('required')),
    specialty: yup.string().required(tValidation('required')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    data.cpf = data.cpf.replace(/\D/g, '');

    if (!(await existDoctor(data)).data) {
      const user = await createUser(data);

      if (user) {
        createDoctorMutation.mutate({
          firebaseUserUID: user.user.uid,
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          crm: data.crm,
          specialty: data.specialty,
        });
      }
    } else {
      setError(tValidation('doctorExist'));
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
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('name')}
                    autoCapitalize="words"
                    onChangeText={field.onChange}
                    value={field.value}
                    error={errors.name?.message}
                  />
                )}
              />
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
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('cpf')}
                    keyboardType="numeric"
                    onChangeText={(value) => field.onChange(formatCPF(value))}
                    value={field.value}
                    error={errors.cpf?.message}
                  />
                )}
              />
              <Controller
                name="crm"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('crm')}
                    keyboardType="numeric"
                    onChangeText={field.onChange}
                    value={field.value}
                    error={errors.crm?.message}
                  />
                )}
              />
              <Controller
                name="specialty"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('specialty')}
                    autoCapitalize="sentences"
                    onChangeText={field.onChange}
                    value={field.value}
                    error={errors.specialty?.message}
                  />
                )}
              />
              {error && <Error textAlign="center">{error}</Error>}
            </FlexContainer>
            <FlexContainer gap={6}>
              <Text
                textAlign="center"
                size="xs"
              >
                {replaceTagsInText(t('disclaimer'), {
                  a1: (
                    <Text
                      size="xs"
                      color="dark"
                      onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
                    />
                  ),
                  a2: (
                    <Text
                      size="xs"
                      color="dark"
                      onPress={() => Linking.openURL(TERMS_OF_SERVICE_URL)}
                    />
                  ),
                })}
              </Text>
              <Button
                buttonStyle="primary"
                onPress={handleSubmit(onSubmit)}
                title={t('cta')}
              />
            </FlexContainer>
          </ScrollView>
        </KeyboardAvoidingView>
      </FlexContainer>
    </SafeArea>
  );
};
