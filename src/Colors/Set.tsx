import React, { useReducer } from 'react';
import { SimpleColorSet, Color } from '../Colors/Colors';
import { ColorSlot } from '../Colors/ColorSlot';
import './Set.scss';

export interface OnColorChangeArgs {
  name: string;
  slot: keyof SimpleColorSet;
  value: Color;
}

export interface SetProps {
  setName: string;
  colorSet: SimpleColorSet;
  onColorChange: (args: OnColorChangeArgs) => void;
}

interface SetState {
  container: Color;
  accent: Color;
  accentRatio: string;
  high: Color;
  highRatio: string;
  medium: Color;
  mediumRatio: string;
  low: Color;
  lowRatio: string;
}

interface EditContainerColor {
  type: 'EditContainerColor';
  value: string;
}

type ColorSlots = 'accent' | 'high' | 'medium' | 'low';

interface EditOnColor {
  type: 'EditOnColor';
  name: ColorSlots;
  value: string;
}

type Action = EditOnColor | EditContainerColor;

interface SetStateReducer<A extends Action> {
  (state: SetState, action: A): SetState;
}

const editOnColor: SetStateReducer<EditOnColor> = (prevState, action) => {
  const { name, value } = action;
  const { container } = prevState;
  return {
    ...prevState,
    [name]: value,
    [`${name}Ratio`]: contrast(container, value)
  };
};

const editContainerColor: SetStateReducer<EditContainerColor> = (
  prevState,
  action
) => {
  const { value } = action;
  const { accent, high, medium, low } = prevState;
  return {
    ...prevState,
    container: value,
    accentRatio: contrast(value, accent),
    highRatio: contrast(value, high),
    mediumRatio: contrast(value, medium),
    lowRatio: contrast(value, low)
  };
};

const reducer: SetStateReducer<Action> = (prevState, action) => {
  switch (action.type) {
    case 'EditContainerColor':
      return editContainerColor(prevState, action);
    case 'EditOnColor':
      return editOnColor(prevState, action);
    default:
      throw new Error();
  }
};

interface RGB {
  r: number;
  g: number;
  b: number;
}

const hexToRGB = (hex: any): RGB => {
  var r = hex >> 16;
  var g = (hex >> 8) & 0xff;
  var b = hex & 0xff;
  return { r, g, b };
};

const luminanace = (hex: any): number => {
  const adjustHex = hex.replace('#', '0x').toUpperCase();
  const { r, g, b } = hexToRGB(adjustHex);
  var a = [r, g, b].map(function(v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = (hex1: any, hex2: any): string => {
  const lum1 = luminanace(hex1) + 0.05;
  const lum2 = luminanace(hex2) + 0.05;
  const ratio = Math.max(lum1, lum2) / Math.min(lum1, lum2);
  return ratio.toFixed(2);
};

export const ColorSet: React.SFC<SetProps> = (props) => {
  const { colorSet: propColorSet } = props;
  const initialState: SetState = {
    ...propColorSet,
    accentRatio: contrast(propColorSet.container, propColorSet.accent),
    highRatio: contrast(propColorSet.container, propColorSet.high),
    mediumRatio: contrast(propColorSet.container, propColorSet.medium),
    lowRatio: contrast(propColorSet.container, propColorSet.low)
  };

  const [state, dispatch] = useReducer<SetStateReducer<Action>>(
    reducer,
    initialState
  );

  const onContainerChange = (name: string, value: string) => {
    dispatch({
      type: 'EditContainerColor',
      value
    });

    props.onColorChange({
      name: props.setName,
      slot: name as keyof SimpleColorSet,
      value
    });
  };

  const onChange = (name: string, value: string) => {
    dispatch({
      type: 'EditOnColor',
      name: name as ColorSlots,
      value
    });

    props.onColorChange({
      name: props.setName,
      slot: name as keyof SimpleColorSet,
      value
    });
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <p>{props.setName}</p>
      <div className='color-set'>
        <ColorSlot
          name='container'
          color={state.container}
          onChange={onContainerChange}
        />
        <div className='color-set__col'>
          <ColorSlot
            name='accent'
            color={state.accent}
            ratio={state.accentRatio}
            onChange={onChange}
          />
          <ColorSlot
            name='high'
            color={state.high}
            ratio={state.highRatio}
            onChange={onChange}
          />
          <ColorSlot
            name='medium'
            color={state.medium}
            ratio={state.mediumRatio}
            onChange={onChange}
          />
          <ColorSlot
            name='low'
            color={state.low}
            ratio={state.lowRatio}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
