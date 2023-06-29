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
import { RegisterMainContainer } from './components/RegisterMainContainer';
import { replaceTagsInText } from '../../utils/text';
import { Footer } from './components/Footer';
import { ScrollView } from 'react-native';
import { IconButton } from '../../components/Icon/IconButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../routes';
import { createUser } from '../../auth/createUser';
import { useCreateDoctor } from '../../api/doctor';
import { styles } from '../../styles/styles';

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
  const { t } = useTranslation('', { keyPrefix: 'register' });
  const navigate = useNavigation<StackNavigation>();
  const createDoctorMutation = useCreateDoctor();

  const schema = yup.object().shape({
    name: yup.string().required(tValidation('required')),
    email: yup.string().email(tValidation('invalidEmail')).required(tValidation('required')),
    password: yup.string().required(tValidation('required')),
    cpf: yup.string().required(tValidation('required')),
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
    const user = await createUser(data);

    if (user) {
      createDoctorMutation.mutate({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        crm: data.crm,
        specialty: data.specialty,
      });
    }
  };

  return (
    <SafeArea>
      <RegisterMainContainer>
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
                  error={errors.email?.message}
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
                  onChangeText={field.onChange}
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
          </Form>
          <Footer>
            <Text textAlign="center">
              {replaceTagsInText(t('disclaimer'), {
                a1: (
                  <Text
                    color="DEFAULT"
                    underline
                  />
                ),
                a2: (
                  <Text
                    color="DEFAULT"
                    underline
                  />
                ),
              })}
            </Text>
            <Button
              buttonStyle="primary"
              onPress={handleSubmit(onSubmit)}
              title={t('cta')}
            />
          </Footer>
        </ScrollView>
      </RegisterMainContainer>
    </SafeArea>
  );
};
