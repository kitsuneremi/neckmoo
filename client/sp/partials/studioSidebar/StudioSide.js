import { useState, useContext, useRef, useEffect } from "react";
import { Layout, Menu } from "antd";
import { ContainerOutlined, PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import Upload from './upload/Upload'
import Manager from './videoManage/manager'
import Context from "../../../../GlobalVariableStorage/Context";

const { Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
];

function StudioSide() {
  const { slug } = useParams();
  const context = useContext(Context)
  const [thisLayout, setThisLayout] = useState( slug ? slug : 1);

  const content = () => {
    if (thisLayout == 1) {
      return <Upload></Upload>
    } else if (thisLayout == 2) {
      return <Manager></Manager>
    } else {
      return <h1>ok</h1>
    }
  }

  const handleChange = (r) => {
    setThisLayout(r.key)
  }

  const testRef = useRef()

  return (
    <Layout style={{ background: 'none' }}>
      <Sider trigger={null} collapsible collapsed={context.sidebarstatus} style={{ background: 'none' }}>
        <Menu
          defaultSelectedKeys={[thisLayout]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
          ref={testRef}
          onClick={({ key, keyPath, domEvent }) => {handleChange({ key, keyPath, domEvent })}}
        />
      </Sider>
      <Layout className="site-layout" style={{ background: 'none' }}>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: window.innerHeight,
            background: 'transparent',
          }}
        >
          {content()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default StudioSide;