import { onMount } from 'solid-js'
import { TonConnectUI } from '@tonconnect/ui'
import './App.css'

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(data),
  });
  return response;
}

function App() {
  onMount(() => {
    const run = async () => {
      const tonConnectUI = new TonConnectUI({
        manifestUrl: 'https://about.systemdesigndao.xyz/ton-connect.manifest.json',
        buttonRootId: 'ton-connect2-container'
      });
      
      await tonConnectUI.connector.restoreConnection();

      // enable ui loader
      tonConnectUI.setConnectRequestParameters({ state: 'loading' });
  
      // fetch you tonProofPayload from the backend
      const d = await postData('https://ton-dapp-backend.systemdesigndao.xyz/ton-proof/generatePayload');
      const { payload } = await d.json();
  
      if (!payload) {
          // remove loader, connect request will be without any additional parameters
          tonConnectUI.setConnectRequestParameters(null);
      } else {
          // add tonProof to the connect request
          tonConnectUI.setConnectRequestParameters({
              state: "ready",
              value: { tonProof: payload }
          });
      }
  
      const unsubscribe = tonConnectUI.onStatusChange(
        async wallet => {
          if (!wallet) {
            return;
          }
    
          const tonProof = wallet.connectItems?.tonProof;
    
          if (tonProof) {
            if ('proof' in tonProof) {
              const obj = {
                  proof: {
                    ...tonProof.proof,
                    state_init: wallet.account.walletStateInit,
                  },
                  network: wallet.account.chain,
                  address: wallet.account.address
              };

              try {
                tonConnectUI.setConnectRequestParameters({
                  state: "loading",
                });

                const d = await postData('https://ton-dapp-backend.systemdesigndao.xyz/ton-proof/checkProof', obj);
                const { token } = await d.json();
                const r = await fetch(`https://ton-dapp-backend.systemdesigndao.xyz/dapp/getAccountInfo?network=${obj.network}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          'Content-Type': 'application/json',
                        }
                });
                const data = await r.json();
    
                console.log('success: ', data);

                tonConnectUI.setConnectRequestParameters({
                  state: "ready",
                  value: { tonProof: payload }
              });
              } catch (err) {
                console.error(err);
              }
            }
          }
        }
      );

      return unsubscribe;
    }

    run();
  });
  
  return (
    <>
      <div id="ton-connect2-container"></div>
    </>
  )
}

export default App
