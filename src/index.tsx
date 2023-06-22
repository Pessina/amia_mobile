import React from 'react';

import {SafeAreaView, Text} from 'react-native';

import './translations/i18n.config';
import {useTranslation} from 'react-i18next';

function App(): JSX.Element {
  const {t} = useTranslation('', {keyPrefix: ''});

  return (
    <SafeAreaView>
      <Text>{t('name')}</Text>
    </SafeAreaView>
  );
}

export default App;
