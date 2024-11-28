import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAsset from "../AddAsset";
const headerStyle = {
  width: "100%",
  textAlign: "center",
  padding: "1rem",
  height: 60,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handelSelect(value) {
    console.log(value);
    setModal(true);
    setCoin(crypto.find((c) => c.id === value));
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handelSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      ></Select>
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Modal footer={null} open={modal} onCancel={() => setModal(false)}>
        <CoinInfoModal coin={coin}></CoinInfoModal>
      </Modal>

      <Drawer
        width={600}
        title="Add Assets"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAsset onClose={() => setDrawer(false)}></AddAsset>
      </Drawer>
    </Layout.Header>
  );
}
