import React, { useState } from 'react';
import { Text } from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import { SafeArea } from '../../components/Containers/SafeArea';
import { useTranslation } from 'react-i18next';
import { Patient, useSearchPatients } from '../../api/patient';
import { PatientItem } from './components/PatientItem';
import { AddPatientModal } from './components/AddPatientModa';
import { PatientListMainContainer } from './components/PatientListMainContainer';
import { PatientList } from './components/PatientList';
import { AddPatientButton } from './components/AddPatientButton';
import { EmptyState } from '../../components/EmptyState/EmptyState';

export const PatientListScreen: React.FC = () => {
  const { t } = useTranslation('', { keyPrefix: 'patientList' });
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = useSearchPatients(search, search);

  return (
    <SafeArea>
      <PatientListMainContainer>
        <Text size="3xl">{t('title')}</Text>
        <Input
          onChangeText={(value) => {
            setSearch(value);
          }}
          placeholder={t('searchPlaceholder')}
        />
        {data.data ? (
          <PatientList
            data={data.data.data ?? []}
            keyExtractor={(item: Patient, index: number) =>
              item.assignedId?.toString() ?? index.toString()
            }
            renderItem={({ item }: { item: Patient }) => (
              <PatientItem
                name={item.name}
                id={item.assignedId ?? ''}
              />
            )}
          />
        ) : (
          <EmptyState text={t('empty')} />
        )}
        <AddPatientButton
          onPress={() => setIsModalVisible(true)}
          title={t('addPatient.addCTA')}
        />
        <AddPatientModal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        />
      </PatientListMainContainer>
    </SafeArea>
  );
};
