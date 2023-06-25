import React from 'react';
import { SafeArea } from '../../components/Containers/SafeArea';
import Input from '../../components/Input/Input';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { Form } from './components/Form/Form';
import { Text } from '../../components/Text/Text';
import { RegisterMainContainer } from './components/RegisterMainContainer';
import { replaceTagsInText } from '../../utils/text';
import { Footer } from './components/Footer';
import { ScrollView } from 'react-native';
import { Icon } from '../../components/Icon/Icon';

type FormData = {
  name: string;
  email: string;
  cpf: string;
  crm: string;
  specialty: string;
};

export const RegisterScreen = (): JSX.Element => {
  const { t: tValidation } = useTranslation('', { keyPrefix: 'validation' });
  const { t } = useTranslation('', { keyPrefix: 'register' });

  const schema = yup.object().shape({
    name: yup.string().required(tValidation('required')),
    email: yup.string().email(tValidation('invalid-email')).required(tValidation('required')),
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

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <SafeArea>
      <RegisterMainContainer>
        <Text
          size="3xl"
          color="dark"
        >
          {t('title')}
        </Text>
        <Icon name="chevron-left" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Form>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label={t('name')}
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
