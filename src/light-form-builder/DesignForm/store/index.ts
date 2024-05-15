import { cloneDeep } from 'lodash-es';
import { Dispatch, FC, createContext, createElement, useReducer } from 'react';
import { Action, ActionType } from './action';
import { State, initState } from './state';

type Reducer = (prevState: State, action: Action) => any;

const designReducer: Reducer = (prevState: State, action: Action) => {
  const handleSetSelectWidgetItem = () => {
    const createNewWidgetFormList = (list: any[]) => {
      const newList = cloneDeep(list);

      for (let index = 0; index < newList.length; index++) {
        if (newList[index].key === action.payload?.key) {
          newList[index] = action.payload;
          break;
        }
        if (newList[index].childNodes) {
          newList[index].childNodes = createNewWidgetFormList(
            newList[index].childNodes!,
          );
        }
      }

      return newList;
    };

    return {
      ...prevState,
      widgetFormList: createNewWidgetFormList(prevState.widgetFormList),
      selectWidgetItem: action.payload,
    };
  };

  switch (action.type) {
    case ActionType.SET_SELECT_WIDGET_ITEM:
      return handleSetSelectWidgetItem();
    case ActionType.SET_WIDGET_FORM_FIELDS:
      return {
        ...prevState,
        widgetFormList: action.payload,
      };
    case ActionType.SET_FORM_CONFIG:
      return {
        ...prevState,
        formConfig: action.payload,
      };
    case ActionType.SET_GLOBAL:
      return {
        ...prevState,
        ...action.payload,
      };
    default:
      return initState;
  }
};

const generateReducer = (_prevState: State, action: Action) => {
  switch (action.type) {
    default:
      return initState.globalState;
  }
};

export const DesignContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initState,
  dispatch: () => {},
});

export const GenerateContext = createContext<{
  state: State['globalState'];
  dispatch: Dispatch<Action>;
}>({
  state: {},
  dispatch: () => {},
});

export interface CommonProviderProps {
  children: React.ReactNode;
}

export const DesignProvider: FC<CommonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(designReducer, initState);

  return createElement(
    DesignContext.Provider,
    {
      value: {
        state,
        dispatch,
      },
    },
    children,
  );
};

export const GenerateProvider: FC<CommonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(generateReducer, initState.globalState);

  return createElement(
    GenerateContext.Provider,
    {
      value: {
        state,
        dispatch,
      },
    },
    children,
  );
};
