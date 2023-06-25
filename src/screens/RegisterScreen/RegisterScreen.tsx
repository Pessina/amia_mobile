import { MainContainer } from '../../components/Containers/MainContainer';
import { SafeArea } from '../../components/Containers/SafeArea';
import Input from '../../components/Input/Input';
import { Controller, useForm } from 'react-hook-form';

export const RegisterScreen = (): JSX.Element => {
  const { control } = useForm();

  return (
    <SafeArea>
      <MainContainer>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label="Name"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
      </MainContainer>
    </SafeArea>
  );
};
