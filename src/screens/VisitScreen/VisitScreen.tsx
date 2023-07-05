import { Microphone } from './components/Microphone';
import { SafeArea } from '../../components/Containers/SafeArea';
import { VisitMainContainer } from './components/VisitScreenMainContainer';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../components/Icon/Icon';
import { StackNavigation } from '../../routes';

export const VisitScreen: React.FC = () => {
  const navigate = useNavigation<StackNavigation>();

  return (
    <SafeArea>
      <VisitMainContainer>
        <Icon
          name="arrow-left-s-line"
          onPress={() => navigate.navigate('PatientList')}
        />
        <Microphone />
      </VisitMainContainer>
    </SafeArea>
  );
};
