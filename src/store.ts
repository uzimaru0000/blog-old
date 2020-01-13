import * as React from 'react';
import { Entry, WithID, entryWithID, entry } from '../common/model';
import * as API from './api/client';
import { dict } from '@mojotech/json-type-validation';

interface State {
  [id: string]: Entry;
}

class GetEntryAction {
  type: 'GetEntry' = 'GetEntry';
  constructor(public entry: WithID<Entry>) {}
}

class GetEntriesAction {
  type: 'GetEntries' = 'GetEntries';
  constructor(public entries: WithID<Entry>[]) {}
}

type Action = GetEntryAction | GetEntriesAction;

const init = () => {
  const initState = document.getElementById('init-state');
  if (!initState) {
    return {};
  }

  const json = JSON.parse(initState.dataset.state);
  return dict(entry).runWithException(json);
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GetEntry':
      const { id, ...entry } = action.entry;
      return { ...state, [id]: entry } as State;
    case 'GetEntries':
      const entries = action.entries.reduce<State>(
        (acc, { id, ...entry }) => ({ ...acc, [id]: entry }),
        {}
      );
      return { ...state, ...entries };
    default:
      return state;
  }
};

export type UseReducer = { state: State; dispatcher: React.Dispatch<Action> };

export const GetEntry = async (id: string) => {
  const entry = await API.getEntry(id);
  return new GetEntryAction(entry);
};

export const GetEntries = async () => {
  const entries = await API.getEntries();
  return new GetEntriesAction(entries);
};

export default () => React.useReducer(reducer, init());
