import { memo, useContext } from "react"
import { Menu } from "antd";
import Context from "../../../GlobalVariableStorage/Context";
import {
  AppstoreOutlined,
  ContainerOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined
} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


function SideBarItem(props) {
  const context = useContext(Context)

  const items = [
    getItem('Trang chủ', '1', <PieChartOutlined />),
    getItem('Shorts', '2', <DesktopOutlined />),
    getItem('Kênh đăng ký', '3', <ContainerOutlined />),
    getItem('Thư viện', '4', <ContainerOutlined />),
    getItem('Video đã xem', '5', <ContainerOutlined />),
    getItem('Xem sau', '6', <ContainerOutlined />),
    getItem('Đoạn video của bạn', '7', <ContainerOutlined />),
    getItem('Thêm', 'sub1', <MailOutlined />, [
      getItem('Option 5', '8'),
      getItem('Option 6', '9'),
      getItem('Option 7', '10'),
      getItem('Option 8', '11'),
    ]),
    getItem('kênh đăng ký', 'sub2', <AppstoreOutlined />, [
      getItem('Option 9', '12'),
      getItem('Option 10', '13'),
    ]),
  ];
  return (
    <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={!props.show}
        items={items}
      />
  )
}

export default memo(SideBarItem)