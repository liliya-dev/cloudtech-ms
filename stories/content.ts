import { ImageType } from '../types';

export const demoLogos: ImageType[] = [
  { src: '/images/demo/logo-tuple.svg', alt: '', type: 'logo' },
  { src: '/images/demo/logo-mirage.svg', alt: '', type: 'logo' },
  { src: '/images/demo/logo-statickit.svg', alt: '', type: 'logo' },
  { src: '/images/demo/logo-transistor.svg', alt: '', type: 'logo' },
  { src: '/images/demo/logo-workcation.svg', alt: '', type: 'logo' },
  { src: '/images/demo/logo-tuple.svg?', alt: '', type: 'logo' },
  { src: '/images/demo/logo-mirage.svg?', alt: '', type: 'logo' },
  { src: '/images/demo/logo-statickit.svg?', alt: '', type: 'logo' },
  { src: '/images/demo/logo-transistor.svg?', alt: '', type: 'logo' },
  { src: '/images/demo/logo-workcation.svg?', alt: '', type: 'logo' },
].map((item) => ({ ...item, alt: '', type: 'logo', width: 100, height: 75 }));
