import AppLayout from "./components/layout/AppLayout";
import { CryptoContextProvide } from "./context/CryptoContext";

const App = () => {
  return (
    <CryptoContextProvide>
      <AppLayout></AppLayout>
    </CryptoContextProvide>
  );
};

export default App;
