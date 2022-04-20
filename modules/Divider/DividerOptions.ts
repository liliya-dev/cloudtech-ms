import { pick } from '../../helpers/utils/object';
import { COLORS, SIZES } from '../../types';

export const SIZE_OPTIONS = pick(SIZES, 'xs', 'sm', 'md', 'lg', 'xl');
export type SizeType = keyof typeof SIZE_OPTIONS;

export const COLOR_OPTIONS = pick(COLORS, 'white', 'black');
export type ColorType = keyof typeof COLOR_OPTIONS;
