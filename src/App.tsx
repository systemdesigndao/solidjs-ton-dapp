import './App.css';
import TonConnectButton from './components/TonConnectButton';
import { useTonConnectedWallet } from './context/TonConnectUI';
import { TGSPlayer } from './components/TGSPlayer';

function App() {
  const { connectedWallet } = useTonConnectedWallet();

  return (
    <>
      <TonConnectButton />
      {connectedWallet() && <div style={{ 'display': 'flex', 'align-items': 'center', "flex-direction": "column" }}>
        <pre>Connected: {JSON.stringify(connectedWallet())}</pre>
        <TGSPlayer tgsPath="/lottie/Diamond.tgs" />
      </div>}
    </>
  )
}

export default App
