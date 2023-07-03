import { Microphone } from './components/Microphone';
import { SafeArea } from '../../components/Containers/SafeArea';
import { VisitMainContainer } from './components/VisitScreenMainContainer';

export const VisitScreen: React.FC = () => {
  return (
    <SafeArea>
      <VisitMainContainer>
        <Microphone />
      </VisitMainContainer>
    </SafeArea>
  );
};
