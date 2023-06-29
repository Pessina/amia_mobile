import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import { SafeArea } from '../../components/Containers/SafeArea';
import { useTranslation } from 'react-i18next';
import { useSearchPatients } from '../../api/patient';
import { PatientItem } from './components/PatientItem';
import { AddPatientModal } from './components/AddPatientModa';

export const PatientListScreen: React.FC = () => {
  const { t } = useTranslation('', { keyPrefix: 'patientList' });
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(true);

  const data = useSearchPatients(search, search);

  return (
    <SafeArea>
      <View style={{ padding: 10 }}>
        <Text size="3xl">{t('title')}</Text>
        <Input
          onChangeText={(value) => {
            setSearch(value);
          }}
          placeholder={t('searchPlaceholder')}
        />
        {data.data ? (
          <FlatList
            data={data.data.data}
            keyExtractor={(item, index) => item.assignedId?.toString() ?? index.toString()}
            renderItem={({ item }) => (
              <PatientItem
                name={item.name}
                id={item.assignedId ?? ''}
              />
            )}
          />
        ) : (
          <Text>Empty</Text>
        )}
        <AddPatientModal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        />
      </View>
    </SafeArea>
  );
};
