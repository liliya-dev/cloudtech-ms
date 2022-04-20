export const COLORS = {
  white: '#ffffff',
  black: '#000000',
};

export type TextElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'span'
  | 'div'
  | 'p'
  | 'figcaption'
  | 'strong';

export const IMAGE_TYPE_OPTIONS = {
  screenshot: 'Screenshot',
  photo: 'Photo',
  logo: 'Logo',
};

export type ImageType = {
  src: string;
  width?: number;
  height?: number;
  type?: keyof typeof IMAGE_TYPE_OPTIONS;
  alt?: string;
  caption?: string;
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
};

export const VIDEO_PROVIDERS = {
  youtube: 'Youtube',
  vimeo: 'Vimeo',
  cloudinary: 'Cloudinary',
  mux: 'Mux',
  sanity: 'Sanity',
  static: 'Static',
};

export type VideoProviderType = keyof typeof VIDEO_PROVIDERS;

export type VideoType = {
  loop?: boolean;
  caption?: string;
  autoPlay?: boolean;
  provider?: VideoProviderType;
  videoId?: string;
  src?: string;
  frameless?: boolean;
};

export const SIZES = {
  none: 'None',
  xs: 'Extra Extra Small',
  xxs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
  xxl: 'Extra Extra Large',
};

export type SizeType = keyof typeof SIZES;
export type SizesType = { [key in keyof typeof SIZES]: string };

export const FONT_WEIGHTS = {
  thin: 'Thin',
  extralight: 'Extralight',
  light: 'Light',
  normal: 'Normal',
  medium: 'Medium',
  semibold: 'Semibold',
  bold: 'Bold',
  extrabold: 'Extrabold',
  black: 'Black',
};

export type FontWeightType = keyof typeof FONT_WEIGHTS;
export type FontWeightsType = { [key in keyof typeof FONT_WEIGHTS]: string };

export const ALIGNMENTS = {
  left: 'Left',
  center: 'Center',
  right: 'Right',
  auto: 'Auto',
};

export type AlignmentType = keyof typeof ALIGNMENTS;
export type AlignmentsType = { [key in keyof typeof ALIGNMENTS]: string };

export const RATIOS = {
  '1/1': 'Square',
  '16/9': '16/9',
  '2/1': 'Flat',
  '13/8': '13/8',
  '4/3': '4/3',
};

export type RatioType = keyof typeof RATIOS;
export type RatiosType = { [key in keyof typeof RATIOS]: string };

export const STATIC_FORMS = {
  'newsletter-sign-up': 'Newsletter sign up',
};

export type StaticFormType = keyof typeof STATIC_FORMS;
export type StaticFormsType = { [key in keyof typeof STATIC_FORMS]: string };

export const STATIC_FORM_OPTIONS = {
  constantContactListId: 'Constant contact list ID',
};

export type StaticFormOptionType = keyof typeof STATIC_FORM_OPTIONS;
export type StaticFormOptionsType = {
  [key in keyof typeof STATIC_FORM_OPTIONS]?: string;
};

export type SuccessOrErrorMessage = { success: string } | { error: string };
