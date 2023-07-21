import { immer } from 'zustand/middleware/immer';
import { StateCreator, create } from 'zustand';
import { PersistOptions, devtools, persist } from 'zustand/middleware';

type AppStoreState = {
  step?: string;
};

type AppStoreActions = {
  setStep: (step?: string) => void;
};

const appStorePersistOptions: PersistOptions<
  AppStoreState & AppStoreActions,
  AppStoreState
> = {
  name: 'app',
};

const appStoreMiddlewares = (
  stateCreator: StateCreator<AppStoreState & AppStoreActions>
) => immer(persist(devtools(stateCreator), appStorePersistOptions));

const appInitialState: AppStoreState = {
  step: undefined,
};

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  appStoreMiddlewares((set) => ({
    ...appInitialState,
    setStep: (step) =>
      set((state) => {
        state.step = step;

        return state;
      }),
  }))
);
