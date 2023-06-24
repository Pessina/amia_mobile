import { FlexContainer } from '../components/Containers/Flex/FlexContainer';
import { SpacingContainer } from '../components/Containers/SpacingContainer';
import { SafeArea } from '../components/Containers/SafeArea';
import Input from '../components/Input/Input';
import { Controller, useForm } from 'react-hook-form';

export const RegisterScreen = (): JSX.Element => {
  const { control, watch } = useForm();

  console.log(watch('name'));

  return (
    <SafeArea>
      <SpacingContainer
        paddingTop={4}
        paddingLeft={4}
        paddingRight={4}
      >
        <FlexContainer
          flexDirection="column"
          justifyContent="space-between"
          height="full"
          width="full"
        >
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
        </FlexContainer>
      </SpacingContainer>
    </SafeArea>
  );
};
