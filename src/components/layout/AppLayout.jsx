import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppConent from "./AppConent";
import { useContext } from "react";
import CryptoContext from "../../context/CryptoContext";

export default function AppLayout() {
    const {loading} = useContext(CryptoContext)
    if (loading) {
        return <Spin fullscreen />;
      }

  return (
    <Layout>
      <AppHeader></AppHeader>
      <Layout>
        <AppSider></AppSider>
        <AppConent></AppConent>
      </Layout>
    </Layout>
  );
}
