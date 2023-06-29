import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import { SafeArea } from '../../components/Containers/SafeArea';
import { useTranslation } from 'react-i18next';
import { useSearchPatients } from '../../api/patient';
import { AddPatientModal } from './components/AddPatientModa';

export const PatientListScreen: React.FC = () => {
  const { t } = useTranslation('', { keyPrefix: 'patientList' });
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(true);

  const data = useSearchPatients(search, search);

  console.log(data.data?.data);

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
        <AddPatientModal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        />
        {/* <FlatList
          data={patients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        /> */}
      </View>
    </SafeArea>
  );
};
