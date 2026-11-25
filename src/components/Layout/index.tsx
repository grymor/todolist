import { Outlet } from 'react-router-dom';
import SideMenu from '../common/side-menu'
import "./index.scss";

export default function Layout() {
  return (
    <div className="layout">
      <SideMenu />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  )
}