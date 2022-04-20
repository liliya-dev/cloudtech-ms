import groq from 'groq';

import { ButtonProps } from '../components/buttons/Button';
import { buttonQuery, buttonWithChildrenQuery } from './components/button';

export type NavigationItemType = ButtonProps & {
  children?: ButtonProps[];
};

export type NavigationType = {
  title: string;
  items: NavigationItemType[];
  buttons: NavigationItemType[];
};

export const navigationQuery = groq`
*[_id == 'navigation'][0] {
  title,
  items[] ${buttonWithChildrenQuery},
  buttons[] ${buttonQuery},
}
`;
