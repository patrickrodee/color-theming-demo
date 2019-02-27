import React, { useState } from 'react';
import ReactColor, { SketchPicker } from 'react-color';

interface ColorSlotProps {
  color: string;
  ratio?: string;
  name: string;
  onChange: (name: string, value: string) => void;
}

const rgbToString = (c: ReactColor.RGBColor) => {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
};

export const ColorSlot: React.SFC<ColorSlotProps> = (props) => {
  const { color, ratio, name, onChange } = props;
  const [showPicker, setShowPicker] = useState(false);
  const [colorValue, setColorValue] = useState(props.color);

  const onClick = () => {
    setShowPicker(!showPicker);
  };

  const onClose = () => {
    setShowPicker(false);
  };

  const onColorChange = (color: ReactColor.ColorResult) => {
    const value = rgbToString(color.rgb);
    setColorValue(value);
    onChange(name, value);
  };

  const styles = {
    container: {
      backgroundColor: color
    },
    popover: {
      display: 'block',
      position: 'absolute' as 'absolute',
      zIndex: 2,
      top: 0,
      left: 0
    },
    cover: {
      position: 'fixed' as 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }
  };

  return (
    <div className='color-set__col'>
      <div
        className='color-set__cell color-set__cell--container'
        style={styles.container}
        onClick={onClick}>
        {/* <span>{ratio}</span> */}
      </div>
      {showPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={onClose} />
          <SketchPicker
            color={colorValue}
            disableAlpha={!ratio}
            onChange={onColorChange}
          />
        </div>
      ) : null}
    </div>
  );
};
