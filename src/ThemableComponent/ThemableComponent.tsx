import React, { useState } from 'react';

import { SimpleColorSet } from '../Colors/Colors';
import { ColorSetSelector } from '../ColorSetSelector/ColorSetSelector';

export interface ThemableProps {
  colorSet: SimpleColorSet;
}

interface ThemableComponentProps {
  colorSets: { [key: string]: SimpleColorSet };
  render: (props: ThemableProps) => void;
}

export const ThemableComponent: React.SFC<ThemableComponentProps> = (props) => {
  const { colorSets, render } = props;

  const [colorSetName, useColorSetName] = useState('');

  const onChange = (name: string) => {
    useColorSetName(name);
  };

  const colorSetNames = Object.keys(colorSets);

  return (
    <div style={{ display: 'inline-block' }}>
      {colorSetName === ''
        ? 'Choose a color set'
        : render({
            colorSet: colorSets[colorSetName]
          })}
      <br />
      <ColorSetSelector
        selected={colorSetName}
        available={colorSetNames}
        onChange={onChange}
      />
    </div>
  );
};
