import React from "react";

interface ColorSetSelectorProps {
  selected: string;
  available: string[];
  onChange: (name: string) => void;
}

export const ColorSetSelector: React.SFC<ColorSetSelectorProps> = props => {
  const { available, onChange } = props;

  const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    onChange(value);
  };

  return (
    <select value={props.selected} onChange={onSelectChange}>
      <option value="" disabled>
        Choose a color set
      </option>
      {available.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
