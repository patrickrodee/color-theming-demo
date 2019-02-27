import React, { useState } from 'react';

export interface AddSetProps {
  onAddSet: (name: string) => void;
  existingSetNames: string[];
}

export const AddSet: React.SFC<AddSetProps> = (props) => {
  const [name, setName] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const onInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setName(value);
    setDisabled(value === '' || props.existingSetNames.includes(value));
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    props.onAddSet(name);
    setName('');
    setDisabled(true);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Color Set Name</span>
        <br />
        <input type='text' onChange={onInput} value={name} />
      </label>
      <br />
      <button disabled={isDisabled}>Create Color Set</button>
    </form>
  );
};
