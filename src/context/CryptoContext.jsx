import { useEffect, useState, createContext, useContext } from "react";
import { fakeFetchCrypto, fetchAssats } from "../api";
import { percentDifference } from "../utils";
import PropTypes from "prop-types";
export const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvide({ children }) {
  CryptoContextProvide.propTypes = {
    children: PropTypes.any,
  };
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(asset, result) {
    return asset.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssats();

      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAssety(newAssety) {
    setAssets((prev) => mapAssets([...prev, newAssety], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAssety }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

// eslint-disable-next-line react-refresh/only-export-components
export function useCrypto() {
  return useContext(CryptoContext);
}
