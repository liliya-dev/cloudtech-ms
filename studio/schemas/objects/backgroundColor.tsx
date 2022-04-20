import { COLOR_OPTIONS } from '../../../components/module/BackgroundOptions';
import ColorSwatches from '../../components/ColorSwatches';
import { optionsToList } from '../../utils/fields/optionsToList';

export default {
  name: 'backgroundColor',
  title: 'Background color',
  type: 'string',
  inputComponent: ColorSwatches,
  options: {
    list: optionsToList(COLOR_OPTIONS),
  },
};
