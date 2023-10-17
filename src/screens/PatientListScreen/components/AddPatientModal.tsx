import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Input from '../../../components/Input/Input';
import { Modal } from '../../../components/Modal/Modal';
import { Button } from '../../../components/Button/Button';
import { useCreatePatient } from '../../../api/patient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../../routes';
import FlexContainer from '../../../components/FlexContainer/FlexContainer';

interface PatientData {
  name: string;
  assignedId?: string;
}

interface Props {
  visible: boolean;
  onRequestClose: () => void;
}

export const AddPatientModal: React.FC<Props> = ({ visible, onRequestClose }) => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patientList.addPatient' });
  const { t: tValidation } = useTranslation('', { keyPrefix: 'validation' });
  const navigate = useNavigation<StackNavigation>();

  const schema = yup.object().shape({
    name: yup.string().required(tValidation('required')),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<PatientData>({
    resolver: yupResolver(schema),
  });

  const createPatientMutation = useCreatePatient();

  const onSubmit = (data: PatientData) => {
    createPatientMutation.mutate(data, {
      onSuccess: (res) => {
        onRequestClose();
        reset();
        navigate.navigate('Patient', { patientId: res.data.id });
      },
      onError: (error) => {
        if (error.response?.data?.code === 'PATIENT_ASSIGNED_ID_DUPLICATE') {
          setError('assignedId', {
            type: 'manual',
            message: tValidation('exist', { field: t('ID.label') }),
          });
        }
      },
    });
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      title={t('title')}
    >
      <FlexContainer
        gap={6}
        grow={0}
      >
        <FlexContainer
          gap={4}
          grow={0}
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                label={t('name.label')}
                onChangeText={field.onChange}
                value={field.value}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="assignedId"
            render={({ field }) => (
              <Input
                label={t('ID.label')}
                hint={t('ID.hint')}
                onChangeText={field.onChange}
                value={field.value}
                error={errors.assignedId?.message}
              />
            )}
          />
        </FlexContainer>
        <Button
          onPress={handleSubmit(onSubmit)}
          title={t('submitCTA')}
        />
      </FlexContainer>
    </Modal>
  );
};
