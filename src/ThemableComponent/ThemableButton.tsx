import React from 'react';

import {
  TextButton,
  TextButtonDefaultColorMap,
  FillButton,
  FillButtonDefaultColorMap,
  OutlineButton,
  OutlineButtonDefaultColorMap
} from '../Button/Button';
import { ThemableProps } from './ThemableComponent';

interface ThemableButtonProps extends ThemableProps {
  icon: string;
  textLabel: string;
}

export const ThemableTextButton: React.SFC<ThemableButtonProps> = (props) => {
  const { colorSet, ...rest } = props;
  const colorMap = new TextButtonDefaultColorMap(colorSet);
  return <TextButton colorMap={colorMap} {...rest} />;
};

export const ThemableFillButton: React.SFC<ThemableButtonProps> = (props) => {
  const { colorSet, ...rest } = props;
  const colorMap = new FillButtonDefaultColorMap(colorSet);
  return <FillButton colorMap={colorMap} {...rest} />;
};

export const ThemableOutlineButton: React.SFC<ThemableButtonProps> = (
  props
) => {
  const { colorSet, ...rest } = props;
  const colorMap = new OutlineButtonDefaultColorMap(colorSet);
  return <OutlineButton colorMap={colorMap} {...rest} />;
};
