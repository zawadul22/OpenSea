import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useState, useEffect, createContext } from 'react';
import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import metamask from './assets/images.png'
import favicon from './assets/favicon.png'
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

const Context = createContext();
const ConnectWallet = (props) => {
    const { open, onClose } = props

    //const [hasProvider, setHasProvider] = useState(null);
    const initialState = { accounts: [], balance: "" };
    const [wallet, setWallet] = useState(initialState);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const refreshAccounts = (accounts) => {
            if (accounts.length > 0) {
                updateWallet(accounts);
            } else {
                setWallet(initialState);
            }
        };

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            //setHasProvider(Boolean(provider));

            if (provider) {
                const accounts = await window.ethereum.request({
                    method: 'eth_accounts',
                });
                refreshAccounts(accounts);
                window.ethereum.on('accountsChanged', refreshAccounts);
            }
        };

        getProvider();

        let val = localStorage.getItem("Connected");
        if (val === "false") {
            setIsConnected(false);
        }
        else if (val === "true") {
            setIsConnected(true);
        }

        return () => {
            window.ethereum?.removeListener('accountsChanged', refreshAccounts);
        };
    }, []);


    const updateWallet = async (accounts) => {
        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
        })
        let ethFormat = ethers.formatEther(balance);
        setWallet({ accounts, ethFormat });


    };

    const handleConnect = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            updateWallet(accounts);
            setIsConnected(true);
            props.onLogin()
            localStorage.setItem("Connected", true)
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };


    const handleDisconnect = async () => {
        try {
            setWallet(initialState);
            setIsConnected(false);
            props.onLogout()
            localStorage.setItem("Connected", false)
        } catch (error) {
            console.error('Error disconnecting from MetaMask:', error);
        }
    };

    return (

        <>
            <Context.Provider value={{ wallet, isConnected }}>
                {props.children}
            </Context.Provider>
            <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
                <DialogTitle style={{ textAlign: 'center' }}>

                    <img src={favicon} style={{ width: '50px', height: '50px' }} />

                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ textAlign: 'center', color: 'black', fontSize: 25 }}>
                        {isConnected ? (
                            <div>
                                Your Balance: {wallet.ethFormat} DD
                            </div>
                        ) : (
                            <div>
                                Your wallet is not connected. Click here connect.
                            </div>
                        )}

                    </DialogContentText>

                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    {isConnected ? (
                        <Button onClick={handleDisconnect} variant='contained' style={{ textTransform: 'none' }}>Disconnect</Button>
                    ) : (
                        <Button onClick={handleConnect} variant='contained' style={{ textTransform: 'none' }}>Connect</Button>
                    )}

                    <Button onClick={onClose} variant='contained' style={{ textTransform: 'none' }}>Close</Button>
                </DialogActions>

            </Dialog>

        </>

    )

}

export default ConnectWallet;
export { Context };