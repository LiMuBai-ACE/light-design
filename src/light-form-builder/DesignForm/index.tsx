import { Form, Layout, message } from 'antd';
import 'normalize.css';
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GlobalConfig from './components/GlobalConfig';
import Header from './components/Header';
import WidgetComponents from './components/WidgetComponents';
import WidgetConfig from './components/WidgetConfig';
import WidgetForm from './components/WidgetForm';
import './index.less';
import { DesignContext, DesignProvider } from './store';
import { ActionType } from './store/action';
const { Content, Sider } = Layout;

export interface DesignFormProps {
  uploadJson?: boolean;
  clearable?: boolean;
  preview?: boolean;
  generateJson?: boolean;
  generateCode?: boolean;
}

export interface DesignFormRef {
  getJson: () => string;
  setJson: (value: string) => void;
  clear: () => void;
  getTemplate: (type: 'component' | 'html') => string;
}

const DesignForm = forwardRef<DesignFormRef, DesignFormProps>((props, ref) => {
  const { state, dispatch } = useContext(DesignContext);
  const [formInstance] = Form.useForm();

  const [currentTab, setCurrentTab] = useState<'Global' | 'Local'>('Global');

  useImperativeHandle(ref, () => ({
    getJson: () => JSON.stringify(state),
    setJson: (value) => {
      try {
        dispatch({
          type: ActionType.SET_GLOBAL,
          payload: JSON.parse(value),
        });
      } catch (error) {
        message.error('设置 JSON 出错');
      }
    },
    clear: () => {
      console.log('清空json', state);
    },
    getTemplate: (type) => {
      console.log('生成代码', state, type);
      return '';
    },
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="light-design-from">
        <Layout className="light-design-container">
          <Sider theme="light" width={250} style={{ overflow: 'auto' }}>
            <div className="widget-list">
              {/* widget组件 */}
              <WidgetComponents />
            </div>
          </Sider>
          <Layout className="widget-container">
            <Header {...props} />
            <Content className="widget-empty">
              <Layout>
                <WidgetForm formInstance={formInstance} />
              </Layout>
            </Content>
          </Layout>
          <Sider className="widget-config-container" theme="light" width={300}>
            <Layout>
              {useMemo(
                () => (
                  <>
                    <Layout.Header>
                      <div
                        className={`config-tab ${
                          currentTab === 'Local' && 'active'
                        }`}
                        onClick={() => setCurrentTab('Local')}
                      >
                        字段设置
                      </div>
                      <div
                        className={`config-tab ${
                          currentTab === 'Global' && 'active'
                        }`}
                        onClick={() => setCurrentTab('Global')}
                      >
                        全局设置
                      </div>
                    </Layout.Header>
                    <Content className="config-content">
                      {currentTab === 'Local' ? (
                        <WidgetConfig />
                      ) : (
                        <GlobalConfig />
                      )}
                    </Content>
                  </>
                ),
                [currentTab],
              )}
            </Layout>
          </Sider>
        </Layout>
      </div>
    </DndProvider>
  );
});

export default forwardRef<DesignFormRef, DesignFormProps>((props, ref) => (
  <DesignProvider>
    <DesignForm {...props} ref={ref} />
  </DesignProvider>
));
