import React from 'react';

import { Wrapper } from '../../components/module/Wrapper';
import { ColorType } from './MyModuleOptions';
/*IMPORT*/

export type MyModuleProps = {
  background?: ColorType;
  /*TYPE*/
};

const colorClasses: Record<ColorType, string> = {
  white: 'bg-white',
  black: 'bg-black',
};

export const MyModule = ({ background/*PROPS*/ }: MyModuleProps) => {
  return (
    <Wrapper background={background}>
      /*JSX*/
    </Wrapper>
  );
};

export const MyModuleMemo = React.memo(MyModule);
