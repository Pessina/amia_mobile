import { useTranslation } from 'react-i18next';
import { PermissionsAndroid, Platform } from 'react-native';

export const useRequestAudioPermissionAndroid = () => {
  const { t } = useTranslation('', { keyPrefix: 'permissions' });
  const { t: tGeneral } = useTranslation('', { keyPrefix: 'general' });

  const requestAudioPermissionAndroid = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const permission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
    try {
      const granted = await PermissionsAndroid.request(permission, {
        title: t('title'),
        message: t('message'),
        buttonNeutral: t('buttonNeutral'),
        buttonNegative: tGeneral('cancel'),
        buttonPositive: tGeneral('ok'),
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  };

  return { requestAudioPermissionAndroid };
};
