import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Outlet } from "react-router-dom";
import SideBar from "../components/admin/sidebar/SideBar";
import ClientSideBar from "../components/client/sidebar/SideBar";
import SpocPersonSideBar from "../components/spoc-person/sidebar/SideBar";
import ChildUserSideBar from "../components/child-user/sidebar/SideBar";

export function AdminLayout() {

  const { isToogle } = useContext(StateContext);

  return (
    <div className="main-layout-section">
      <div className="d-flex">
        <div className={`left-side-sidebar-wrapper ${isToogle && "active"}`}>
          <SideBar />
        </div>
        <div className="right-side-body-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function ClientLayout() {

  const { isToogle } = useContext(StateContext);

  return (
    <div className="main-layout-section">
      <div className="d-flex">
        <div className={`left-side-sidebar-wrapper ${isToogle && "active"}`}>
          <ClientSideBar />
        </div>
        <div className="right-side-body-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function SpocPersonLayout() {

  const { isToogle } = useContext(StateContext);

  return (
    <div className="main-layout-section">
      <div className="d-flex">
        <div className={`left-side-sidebar-wrapper ${isToogle && "active"}`}>
          <SpocPersonSideBar />
        </div>
        <div className="right-side-body-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function ChildUserLayout() {

  const { isToogle } = useContext(StateContext);

  return (
    <div className="main-layout-section">
      <div className="d-flex">
        <div className={`left-side-sidebar-wrapper ${isToogle && "active"}`}>
          <ChildUserSideBar />
        </div>
        <div className="right-side-body-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}