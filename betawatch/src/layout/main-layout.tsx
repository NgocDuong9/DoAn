import { Layout } from "antd";
import Header from "../components/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <Layout className="bg-white">
      <Header />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
