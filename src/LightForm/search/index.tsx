import { Button, Card, Col, Form, FormInstance, Row } from 'antd';
import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { AnyJson } from '@/utils';

import { ClassName, JsonExtend, isEmpty, isFunction } from '@/utils';
import { ExpanderBtn, ExportBtn } from './button';

import { WidgetType } from '../widgets/constants';

import LightField from '../field';
import { FieldProps } from '../field/type';

import './index.less';

interface LightSearchCtxProps {
  form: FormInstance;
}

interface WrapperProps {
  value: LightSearchCtxProps;
  children: any;
}

const LightSearchCtx = createContext<LightSearchCtxProps>(
  {} as LightSearchCtxProps,
);

const LightSearchWrapper = ({ value, children }: WrapperProps) => (
  <LightSearchCtx.Provider value={value}>{children}</LightSearchCtx.Provider>
);

export const useLightSearch = () => useContext(LightSearchCtx);

const SeachLayout = {
  label: { prefixCls: 'label' },
};

const HiddenWidgets = [WidgetType.hidden];
export interface LightSearchProps {
  form?: FormInstance;
  title?: ReactNode;
  expander?: boolean;
  className?: string;
  fields: FieldProps[];
  initials?: AnyJson;
  noSpan?: boolean;
  noCard?: boolean;
  onSearch: (formdata: AnyJson) => void;
  onReset: (form: FormInstance) => void;
  onExport?: (formdata: AnyJson) => void;
}

export default (props: LightSearchProps) => {
  const {
    form,
    title,
    expander = false, // 是否带有折叠板
    className,
    noSpan = false, // true-紧凑样式 去掉span=8
    noCard = false, // true-去掉card
    fields = [], // form表单项
    initials, // 表单初始化值
    onSearch, // 查询事件
    onReset, // 重置事件
    onExport, // 导出数据
  } = props;

  const colSpan = noSpan ? {} : { span: 8 };

  const [myform] = form ? [form] : Form.useForm(); // form实例

  const { visibles, hiddens } = useMemo(() => {
    const output = {
      visibles: [] as FieldProps[],
      hiddens: [] as FieldProps[],
    };

    fields.forEach((ele) => {
      if (HiddenWidgets.includes(ele?.widget as any)) {
        output.hiddens.push(ele);
      } else {
        output.visibles.push(ele);
      }
    });

    return output;
  }, [fields]);

  const total = visibles?.length || 0;

  // 3项以下的，不渲染开关
  const noExpand = expander || total < 3;
  const [expand, setExpand] = useState(noExpand); // 收起展开

  // const initialValues = useMemo(() => initials, []);

  const fieldlist = useMemo(() => {
    if (isEmpty(visibles)) {
      return [];
    }

    let lastrow: any[] = [];

    switch (total % 3) {
      case 0:
        lastrow = [
          { type: 'blank', name: 'blank1' },
          { type: 'blank', name: 'blank2' },
          { type: 'btns', name: 'btns' },
        ];
        break;
      case 1:
        lastrow = [
          { type: 'blank', name: 'blank1' },
          { type: 'btns', name: 'btns' },
        ];
        break;
      case 2:
        lastrow = [{ type: 'btns', name: 'btns' }];
        break;
      default:
        break;
    }

    return [...visibles].concat(lastrow);
  }, [visibles, total]);

  if (isEmpty(fieldlist)) {
    return null;
  }

  // 点击重置
  const reset = () => {
    myform.resetFields();
    if (isFunction(onReset)) {
      onReset(myform);
    }
  };

  // 收起|展开
  const onToggle = () => {
    setExpand(!expand);
  };

  // 表单取值
  const onFormValues = async () => {
    const formdata = await myform.validateFields();
    // return JsonExtend.trim(formdata, 'deep');
    return JsonExtend.trim(formdata);
  };

  // 点击搜索
  const onFormSearch = async () => {
    const params = await onFormValues();
    if (isFunction(onSearch)) {
      onSearch(params);
    }
  };

  // 点击导出
  const onFormExport = async () => {
    const params = await onFormValues();
    if (onExport) {
      onExport(params);
    }
  };

  const renderColItem = (field: any, index: number) => {
    const hidden = !expand && index > 1;
    const itemkey = field?.key || field.name;

    const mycls = ClassName.setup({
      hide: hidden, // 是否显示
      column: field.type !== 'blank' && index % 3 !== 2,
    });

    if (field.type === 'blank') {
      return <Col key={itemkey} {...colSpan} className={mycls} />;
    }

    if (field.type === 'btns') {
      return (
        <Col {...colSpan} key={itemkey}>
          <Row
            justify="end"
            align="middle"
            className="operations"
            style={noSpan ? { marginBottom: 0 } : {}}
          >
            <Button type="primary" htmlType="submit" onClick={onFormSearch}>
              查询
            </Button>
            <Button onClick={reset}>重置</Button>
            {onExport && <ExportBtn onExport={onFormExport} />}
            {!noExpand && <ExpanderBtn expand={expand} onToggle={onToggle} />}
          </Row>
        </Col>
      );
    }
    if (noSpan) {
      Object.assign(field, { style: { ...field.style, marginBottom: 0 } });
    }
    return (
      <Col key={itemkey} {...colSpan} className={mycls}>
        <LightField field={field} />
      </Col>
    );
  };

  const attrs = {
    form: myform,
    initialValues: initials,
    labelCol: SeachLayout.label,
  };

  const RenderForm = (
    <Form {...attrs}>
      <Row>{fieldlist.map(renderColItem)}</Row>
      {LightField.each({ fields: hiddens })}
    </Form>
  );

  return (
    <LightSearchWrapper value={{ form: myform as FormInstance }}>
      {noCard ? (
        RenderForm
      ) : (
        <Card
          title={title}
          className={ClassName.poly(['container', className])}
        >
          {RenderForm}
        </Card>
      )}
    </LightSearchWrapper>
  );
};
