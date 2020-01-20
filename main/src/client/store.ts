import * as React from 'react';
import { Entry, WithID, entry } from '../../../common/model';
import * as API from './api';
import { dict } from '@mojotech/json-type-validation';

interface State {
  entries: { [id: string]: Entry };
  after?: number;
  isLoading: boolean;
}

class GetEntryAction {
  type: 'GetEntry' = 'GetEntry';
  constructor(public entry: WithID<Entry>) {}
}

class GetEntriesAction {
  type: 'GetEntries' = 'GetEntries';
  constructor(public response: { after?: number; entries: WithID<Entry>[] }) {}
}

class SetIsLoadingAction {
  type: 'SetIsLoading' = 'SetIsLoading';
}

type Action = GetEntryAction | GetEntriesAction | SetIsLoadingAction;

const init = () => {
  const initState = document.getElementById('init-state');
  if (!initState || !initState.dataset.state) {
    return { entries: {}, isLoading: false };
  }

  const json = JSON.parse(initState.dataset.state);
  return { entries: dict(entry).runWithException(json), isLoading: false };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GetEntry':
      const { id, ...entry } = action.entry;
      return {
        ...state,
        entries: { ...state.entries, [id]: entry },
        isLoading: false,
      } as State;
    case 'GetEntries':
      const entries = action.response.entries.reduce<{ [id: string]: Entry }>(
        (acc, { id, ...entry }) => ({ ...acc, [id]: entry }),
        state.entries
      );
      return { after: action.response.after, entries, isLoading: false };
    case 'SetIsLoading':
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export type UseReducer = { state: State; dispatcher: React.Dispatch<Action> };

export const GetEntry = async (id: string) => {
  const entry = await API.getEntry(id);
  return new GetEntryAction(entry);
};

export const GetEntries = async (after?: number) => {
  const entries = await API.getEntries(after);
  return new GetEntriesAction(entries);
};

export const GetEntriesWithTag = async (tag: string, after?: number) => {
  const entries = await API.getEntriesWithTag(tag, after);
  return new GetEntriesAction(entries);
};

export const SetIsLoading = () => new SetIsLoadingAction();

export default () => React.useReducer(reducer, init());
