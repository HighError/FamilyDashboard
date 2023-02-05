import { IconType } from '@/types/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function getIcon(icon: IconType): IconProp {
  switch (icon) {
    case 'spotify':
      return faSpotify;
    case 'youtube':
      return faYoutube;
    default:
      return faQuestion;
  }
}
