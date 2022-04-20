import { pick } from '../../helpers/utils/object';
import { ALIGNMENTS, COLORS } from '../../types';

export const ALIGN_OPTIONS = pick(ALIGNMENTS, 'left', 'right');
export type AlignType = keyof typeof ALIGN_OPTIONS;

export const COLOR_OPTIONS = pick(COLORS, 'white');
export type ColorType = keyof typeof COLOR_OPTIONS;
