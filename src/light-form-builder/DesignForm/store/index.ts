import React, {
  Dispatch,
  FC,
  createContext,
  createElement,
  useReducer,
} from 'react';
import { Action, ActionType } from './action';
import { State, initState } from './state';

type Reducer = (prevState: State, action: Action) => any;

const designReducer: Reducer = (prevState: State, action: Action) => {
  const { payload = {} } = action;

  const { type: formType, ...other } = payload;

  switch (action.type) {
    // case ActionType.SET_SELECT_WIDGET_ITEM:
    //   return handleSetSelectWidgetItem();
    // 设置表单类型
    case ActionType.SET_FORM_TYPE:
      return {
        ...prevState,
        ...other,
        formType,
      };
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
      return initState;
  }
};

export const DesignContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initState,
  dispatch: () => { },
});

export const GenerateContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: {} as State,
  dispatch: () => { },
});

export interface CommonProviderProps {
  children: React.ReactNode;
}

export const DesignProvider: FC<CommonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(designReducer, initState);
  console.log('DesignProvider state', state);
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
