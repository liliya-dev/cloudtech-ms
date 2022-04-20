import groq from 'groq';

import { IconName } from '../components/icons/Icons';
import { StaticFormBuilderProps } from '../layout/ModuleBuilder/StaticFormBuilder';
import { buttonFieldsQuery, buttonQuery } from './components/button';
import { staticFormQuery } from './components/staticForm';

export type FooterItemType = {
  title?: string;
  items: { label?: string; href?: string }[];
};

export type FooterSocialsItemProps = {
  label?: string;
  href?: string;
  icon: IconName;
};

export type FooterType = {
  copyright: string;
  links: FooterItemType[];
  socials: FooterSocialsItemProps[];
  form?: StaticFormBuilderProps;
};

export const footerQuery = groq`
*[_id == 'footer'][0] {
  copyright,
  links[] { 
    title, 
    items[] ${buttonQuery} 
  },
  socials[] {
    icon,
    ${buttonFieldsQuery},
  },
  ${staticFormQuery}
}
`;
