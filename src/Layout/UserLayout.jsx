import React from 'react';
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import { useState } from "react";
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
            <Topbar  />
            <Outlet />
        </main>
    </>
  )
}

export default UserLayout;