import React from 'react';
import 'intl-pluralrules';

import {SafeAreaView, Text} from 'react-native';

import './translations/i18n.config';
import {useTranslation} from 'react-i18next';

const App = (): JSX.Element => {
  const {t} = useTranslation('', {keyPrefix: ''});

  return (
    <SafeAreaView>
      <Text className="text-3xl">{t('name')}</Text>
    </SafeAreaView>
  );
};

export default App;
