import { Card, Layout, Statistic, List, Typography, Tag } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import "./AppSiber.css";
import { useContext } from "react";
import { CryptoContext } from "../../context/CryptoContext.jsx";

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} className="mb-1rem">
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit,
                wihtTag: true,
              },
              { title: "Asset Amount", value: asset.amount, isPlane: true },
              // { title: "Difference", value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.wihtTag && (
                    <Tag color={asset.grow ? "green" : "error"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlane && item.value}
                  {!item.isPlane && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          >
            {" "}
          </List>
        </Card>
      ))}
    </Layout.Sider>
  );
}
