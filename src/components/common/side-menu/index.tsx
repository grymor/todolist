import { useState } from 'react' 
import "./index.scss";

import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
  { key: '/users', icon: <PieChartOutlined />, label: <Link to="/users">Users</Link> },
  { key: '/receipts', icon: <DesktopOutlined />, label: <Link to="/receipts">Receipts</Link> },
  { key: '/dashboards', icon: <ContainerOutlined />, label: <Link to="/dashboards">DashBoards</Link> },
];

export default function SideMenu () {

   const { pathname } = useLocation();
  const navigate = useNavigate(); 
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  return (
    <div className={collapsed ? "filter-panel filter-panel--collapsed" : "filter-panel"}>
      <div className="filter-panel__actions">
      <Button type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
        <Button icon={<HomeOutlined />} onClick={() => navigate("/")} />
        </div>
      <Menu
        selectedKeys={[pathname]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};


