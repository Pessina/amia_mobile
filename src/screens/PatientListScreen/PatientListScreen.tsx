import React, { useState } from 'react';
import { Text } from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import { SafeArea } from '../../components/Containers/SafeArea';
import { useTranslation } from 'react-i18next';
import { useSearchPatients } from '../../api/patient';
import { PatientItem } from './components/PatientItem';
import { AddPatientModal } from './components/AddPatientModal';
import { PatientListMainContainer } from './components/PatientListMainContainer';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useLogout } from '../../auth/useLogout';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../routes';
import { Icon } from '../../components/Icon/Icon';
import { useDebounce } from '../../hooks/useDebounce';
import { FloatingButton } from '../../components/Button/FloatingButton';
import Spacing from '../../components/Spacing/Spacing';
import { FlatList } from 'react-native';
import { styles } from '../../styles/styles';

const ItemSeparatorComponent = () => <Spacing size={2} />;

export const PatientListScreen: React.FC = () => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patientList' });
  const [search, setSearch] = useState('');
  const [isPatientModalVisible, setIsPatientModalVisible] = useState(false);
  const navigate = useNavigation<StackNavigation>();
  const debouncedSearch = useDebounce(search, 500);
  const logoutMutation = useLogout();

  const searchPatientsQuery = useSearchPatients(debouncedSearch, debouncedSearch);

  return (
    <SafeArea>
      <PatientListMainContainer>
        <Icon
          name={'ri-logout-box-line'}
          onPress={() => logoutMutation.mutate()}
        />
        <Text
          size="4xl"
          fontWeight="bold"
        >
          {t('title')}
        </Text>
        <Input
          onChangeText={(value) => {
            setSearch(value);
          }}
          placeholder={t('searchPlaceholder')}
        />
        {(searchPatientsQuery.data?.data.length ?? 0) > 0 ? (
          <FlatList
            data={searchPatientsQuery.data?.data ?? []}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
              <PatientItem
                onPress={() => navigate.navigate('Patient', { patientId: item.id })}
                name={item.name}
                assignedId={item.assignedId ?? ''}
                id={item.id ?? ''}
              />
            )}
            contentContainerStyle={styles.full}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        ) : (
          <EmptyState text={t('empty')} />
        )}
        <FloatingButton
          alignment="flex-end"
          left={
            <Icon
              name="ri-add-line"
              colorCode="light"
            />
          }
          title={t('addPatient.addCTA')}
          onPress={() => setIsPatientModalVisible(true)}
        />
        <AddPatientModal
          visible={isPatientModalVisible}
          onRequestClose={() => setIsPatientModalVisible(false)}
        />
      </PatientListMainContainer>
    </SafeArea>
  );
};
