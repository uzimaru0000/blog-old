import * as React from 'react';
import { Entry, WithID } from './model';
import { getEntries, getEntriesWithTag, getEntry } from './api';

export type State = {
  entries: { [id: string]: Entry };
  after?: number;
  isLoading: boolean;
};

export class GetEntryAction {
  type: 'GetEntry' = 'GetEntry';
  constructor(public entry: WithID<Entry>) {}
}

export class GetEntriesAction {
  type: 'GetEntries' = 'GetEntries';
  constructor(public response: { after?: number; entries: WithID<Entry>[] }) {}
}

export class SetIsLoadingAction {
  type: 'SetIsLoading' = 'SetIsLoading';
}

export type Action = GetEntryAction | GetEntriesAction | SetIsLoadingAction;

const init = () => ({ entries: {}, isLoading: false });

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

export type UseReducer<T> = {
  state: State;
  dispatcher: React.Dispatch<Action>;
  pageProps?: T;
};

export const GetEntry = async (id: string) => {
  const entry = await getEntry(id);
  return new GetEntryAction(entry);
};

export const GetEntries = async (after?: number) => {
  const entries = await getEntries(after);
  return new GetEntriesAction(entries);
};

export const GetEntriesWithTag = async (tag: string, after?: number) => {
  const entries = await getEntriesWithTag(tag, after);
  return new GetEntriesAction(entries);
};

export const SetIsLoading = () => new SetIsLoadingAction();

export const createReducer = (
  task: (dispatcher: React.Dispatch<Action>) => Promise<void>
) => {
  const [state, dispatcher] = React.useReducer(reducer, init());
  task(dispatcher);
  return [state, dispatcher];
};
