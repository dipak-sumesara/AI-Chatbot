import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-screen bg-black text-white">
      <Outlet />
    </div>
  );
};

export default MainLayout;