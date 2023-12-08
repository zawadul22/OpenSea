//Unused

import { useState, useEffect, useContext } from "react"
// import './NFTMint.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import Web3 from 'web3';
import warning from './assets/1200px-Warning.svg'
import { Snackbar, Alert, AlertTitle } from '@mui/material'
import { Context } from "./connectWallet";
import {abi} from './ABI'; 

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const web3 = new Web3(new Web3.providers.HttpProvider(import.meta.env.VITE_HOST));

const contract = new web3.eth.Contract(abi, contractAddress);


function NFTMint({ mint, onClose, isLog, meta }) {

	const [tokenId, setTokenId] = useState("");
	const [tokenUri, setTokenUri] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [message, setMessage] = useState(false);
	const [success, setSuccess] = useState(false);
	const ctx = useContext(Context);


	const startMint = async () => {

		const mintFunction = contract.methods.mint(ctx.wallet.accounts[0], tokenId, tokenUri);
		const encodedABI = mintFunction.encodeABI();
		ethereum.request({
			method: 'eth_sendTransaction',
			params: [{
				from: ctx.wallet.accounts[0],
				to: contractAddress,
				data: encodedABI
			},
			],
		})
			.then((err, txHash) => {
				setMessage(true);
				if (!err) {

					setSuccess(true);
					console.log(txHash);
				}
				else {
					setSuccess(false);
				}
			})
			.catch((error) => {
				setMessage(true);

				console.log(error);
			});

	}

	const closeHandler = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setMessage(false);
	}

	return (
		<>
			{/* <Snackbar open={message} onClose={closeHandler} autoHideDuration={6000}>
				{setSuccess ? (
					<Alert onClose={closeHandler} severity="success" sx={{ width : '100%'}}>
						Minting successful
					</Alert>
				) : (
					<Alert onClose={closeHandler} severity="failure" sx={{ width : '100%'}}>
						Minting failed
					</Alert>
				)}
			</Snackbar> */}
			<Dialog open={mint} onClose={onClose} fullWidth>

				{ctx.isConnected ? (
					<>
						<DialogTitle align="center">Fill the following areas</DialogTitle>
						<DialogContent>
							<TextField
								required
								margin="dense"
								id="tokenId"
								label="Token ID"
								fullWidth
								variant="standard"
								onChange={(e) => setTokenId(e.target.value)}
							/>
							<TextField
								required
								margin="dense"
								id="uri"
								label="Token URI"
								fullWidth
								variant="standard"
								onChange={(e) => setTokenUri(e.target.value)}
							/>

						</DialogContent>
						<DialogActions style={{ justifyContent: 'center' }}>
							<Button variant="contained" onClick={startMint}>Mint</Button>
						</DialogActions>
					</>
				) : (
					<DialogTitle align="center">
						<img src={warning} style={{ width: '55px', height: '50px', marginBottom: '14pt' }} />
						<div>Your wallet is not connected. Please connect your wallet at first</div>
					</DialogTitle>
				)}

			</Dialog>
		</>
	);
}

export default NFTMint;