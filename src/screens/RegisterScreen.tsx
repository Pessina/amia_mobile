import { SafeArea } from '../components/Containers/SafeArea';
import Input from '../components/Input/Input';
import { Controller, useForm } from 'react-hook-form';

export const RegisterScreen = (): JSX.Element => {
  const { control } = useForm();

  return (
    <SafeArea>
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
    </SafeArea>
  );
};
