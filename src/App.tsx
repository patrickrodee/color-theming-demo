import React, {useReducer} from 'react';
import {ColorSet, OnColorChangeArgs} from './Colors/Set';
import {AddSet} from './AddSet/AddSet';
import {SimpleColorSet} from './Colors/Colors';
import {ThemableFillButton, ThemableTextButton, ThemableOutlineButton} from './ThemableComponent/ThemableButton';
import {ThemableComponent} from './ThemableComponent/ThemableComponent';
import { render } from 'react-dom';

interface ApplicationState {
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

interface ApplicationStateReducer {
  (state: ApplicationState, action: Action): ApplicationState;
}

function editSet(prevState: ApplicationState, action: EditSet): ApplicationState {
  const {name, slot, value} = action;
  const set = {
    ...prevState[name],
    [slot]: value
  };
  return {
    ...prevState,
    [name]: set,
  };
}

function newSet(prevState: ApplicationState, action: NewSet): ApplicationState {
  const {name, set} = action;
  return {...prevState, [name]: set};
}

function reducer(state: ApplicationState, action: Action) {
  switch (action.type) {
    case 'NewSet':
      return newSet(state, action);
    case 'EditSet':
      return editSet(state, action);
    default:
      throw new Error();
  }
}

export const Application: React.SFC = () => {
  const [state, dispatch] = useReducer<ApplicationStateReducer>(reducer, {});

  const onColorChange = (args: OnColorChangeArgs) => {
    dispatch({
      ...args,
      type: 'EditSet',
    });
  };

  const onAddSet = (name: string) => {
    const set = {
      container: '#ffffff',
      accent: '#6200ee',
      high: '#000000',
      medium: '#666666',
      low: '#999999',
    };

    dispatch({
      type: 'NewSet',
      set,
      name,
    });
  };

  const renderColorSets = () => {
    return Object.keys(state).map((name) => {
      const colorSet = state[name];
      return (
        <ColorSet key={name} setName={name} colorSet={colorSet} onColorChange={onColorChange}/>
      );
    })
  };

  return (
    <div>
      <AddSet onAddSet={onAddSet} existingSetNames={Object.keys(state)}/>
      {renderColorSets()}
      <hr/>
      <ThemableComponent
        colorSets={state}
        render={props => <ThemableTextButton icon='add' textLabel='Text Button' {...props} />}/>
      <ThemableComponent
        colorSets={state}
        render={props => <ThemableFillButton icon='add' textLabel='Fill Button' {...props} />}/>
      <ThemableComponent
        colorSets={state}
        render={props => <ThemableOutlineButton icon='send' textLabel='Outline Button' {...props} />}/>
    </div>
  );
}
