import { IconType } from '@/types/Icon';
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  icon: IconType;
}

export default function Icons({ icon }: IProps): JSX.Element {
  switch (icon) {
    case 'spotify':
      return <FontAwesomeIcon className="text-[#1DB954]" icon={faSpotify} />;
    case 'youtube':
      return <FontAwesomeIcon className="text-[#FF0000]" icon={faYoutube} />;
    default:
      return <FontAwesomeIcon icon={faQuestion} />;
  }
}
