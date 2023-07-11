import React, { useState } from 'react';
import { Text } from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import { SafeArea } from '../../components/Containers/SafeArea';
import { useTranslation } from 'react-i18next';
import { Patient, useSearchPatients } from '../../api/patient';
import { PatientItem } from './components/PatientItem';
import { AddPatientModal } from './components/AddPatientModal';
import { PatientListMainContainer } from './components/PatientListMainContainer';
import { PatientList } from './components/PatientList';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { FloatingMenu } from '../../components/FloatingMenu/FloatingMenu';
import { logout } from '../../auth/logout';
import { Header } from '../../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../routes';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';

export const PatientListScreen: React.FC = () => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patientList' });
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigation<StackNavigation>();

  // TODO: Bug this is being called wrongly, it's fetching patients for other doctors
  const searchPatientsQuery = useSearchPatients(search, search);

  return (
    <SafeArea>
      <PatientListMainContainer>
        <Header
          right={
            <FloatingMenu
              options={[{ label: 'Logout', onPress: logout, icon: 'ri-logout-box-line' }]}
            />
          }
        />
        <Text size="3xl">{t('title')}</Text>
        {/* TODO: Debounce it to avoid unnecessary calls */}
        <Input
          onChangeText={(value) => {
            setSearch(value);
          }}
          placeholder={t('searchPlaceholder')}
        />
        {(searchPatientsQuery.data?.data.length ?? 0) > 0 ? (
          <PatientList
            data={searchPatientsQuery.data?.data ?? []}
            keyExtractor={(item: Patient, index: number) =>
              item.assignedId?.toString() ?? index.toString()
            }
            renderItem={({ item }: { item: Patient }) => (
              <PatientItem
                onPress={() => navigate.navigate('Patient', { patientId: item.id })}
                name={item.name}
                id={item.assignedId ?? ''}
              />
            )}
          />
        ) : (
          <EmptyState text={t('empty')} />
        )}
        <Button
          alignment="flex-end"
          left={
            <Icon
              name="ri-add-line"
              colorCode="light"
            />
          }
          title={t('addPatient.addCTA')}
          onPress={() => setIsModalVisible(true)}
        />

        <AddPatientModal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        />
      </PatientListMainContainer>
    </SafeArea>
  );
};
