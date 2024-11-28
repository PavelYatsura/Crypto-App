import { Flex, Typography } from "antd";
import PropTypes from "prop-types";

export default function CoinInfo({ coin, withSymbol }) {
  CoinInfo.propTypes = {
    coin: PropTypes.any,
  };
  CoinInfo.propTypes = {
    withSymbol: PropTypes.any,
  };
  return (
    <Flex aligh="center">
      <img
        src={coin.icon}
        alt={coin.name}
        style={{ width: 40, height: 40, marginRight: 10 }}
      ></img>
      <Typography.Title level={2} style={{ margin: 0 }}>
      {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  );
}
