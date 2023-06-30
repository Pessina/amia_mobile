import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Input from '../../../components/Input/Input';
import { Modal } from '../../../components/Modal/Modal';
import { Button } from '../../../components/Button/Button';
import { useCreatePatient } from '../../../api/patient';

interface PatientData {
  name: string;
  assignedId?: string;
}

interface Props {
  visible: boolean;
  onRequestClose: () => void;
}

export const AddPatientModal: React.FC<Props> = ({ visible, onRequestClose }) => {
  const { t } = useTranslation('', { keyPrefix: 'patientList.addPatient' });
  const { t: tValidation } = useTranslation('', { keyPrefix: 'validation' });

  const schema = yup.object().shape({
    name: yup.string().required(tValidation('required')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientData>({
    resolver: yupResolver(schema),
  });

  const createPatientMutation = useCreatePatient();

  const onSubmit = (data: PatientData) => {
    createPatientMutation.mutate(data);
    onRequestClose();
    reset();
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      title={t('title')}
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
            onChangeText={field.onChange}
            value={field.value}
            error={errors.name?.message}
          />
        )}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        title={t('submitCTA')}
      />
    </Modal>
  );
};
