import React, { useReducer } from 'react';
import { ColorSet, OnColorChangeArgs } from './Colors/Set';
import { AddSet } from './AddSet/AddSet';
import { SimpleColorSet } from './Colors/Colors';
import {
  ThemableFillButton,
  ThemableTextButton,
  ThemableOutlineButton
} from './ThemableComponent/ThemableButton';
import { ThemableComponent } from './ThemableComponent/ThemableComponent';
import { DefaultColorSet } from './Themes/Material';

interface AppState {
  [name: string]: SimpleColorSet;
}

interface NewSet {
  type: 'NewSet';
  name: string;
  set: SimpleColorSet;
}

interface EditSet {
  type: 'EditSet';
  name: string;
  slot: keyof SimpleColorSet;
  value: string;
}

type Action = NewSet | EditSet;

interface AppStateReducer {
  (state: AppState, action: Action): AppState;
}

function editSet(
  prevState: AppState,
  action: EditSet
): AppState {
  const { name, slot, value } = action;
  const set = {
    ...prevState[name],
    [slot]: value
  };
  return {
    ...prevState,
    [name]: set
  };
}

function newSet(prevState: AppState, action: NewSet): AppState {
  const { name, set } = action;
  return { ...prevState, [name]: set };
}

function reducer(state: AppState, action: Action) {
  switch (action.type) {
    case 'NewSet':
      return newSet(state, action);
    case 'EditSet':
      return editSet(state, action);
    default:
      throw new Error();
  }
}

export const App: React.SFC = () => {
  const [state, dispatch] = useReducer<AppStateReducer>(reducer, {});

  const onColorChange = (args: OnColorChangeArgs) => {
    dispatch({
      ...args,
      type: 'EditSet'
    });
  };

  const onAddSet = (name: string) => {
    dispatch({
      type: 'NewSet',
      set: DefaultColorSet,
      name
    });
  };

  const renderColorSets = () => {
    return Object.keys(state).map((name) => {
      const colorSet = state[name];
      return (
        <ColorSet
          key={name}
          setName={name}
          colorSet={colorSet}
          onColorChange={onColorChange}
        />
      );
    });
  };

  return (
    <div>
      <AddSet onAddSet={onAddSet} existingSetNames={Object.keys(state)} />
      {renderColorSets()}
      <hr />
      <ThemableComponent
        colorSets={state}
        render={(props) => (
          <ThemableTextButton icon='add' textLabel='Text Button' {...props} />
        )}
      />
      <ThemableComponent
        colorSets={state}
        render={(props) => (
          <ThemableFillButton icon='add' textLabel='Fill Button' {...props} />
        )}
      />
      <ThemableComponent
        colorSets={state}
        render={(props) => (
          <ThemableOutlineButton
            icon='send'
            textLabel='Outline Button'
            {...props}
          />
        )}
      />
    </div>
  );
};
