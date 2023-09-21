import { useState , useEffect } from "react"
import './NFTMint.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

function NFTMint({ mint, onClose }) {

    
    return (
        <Dialog open={mint} onClose={onClose} fullWidth>
            <DialogTitle >Fill the following areas</DialogTitle>
            <DialogContent>

                <TextField
                    required
                    margin="dense"
                    id="tokenId"
                    label="Token ID"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="uri"
                    label="Token URI"
                    fullWidth
                    variant="standard"
                />

            </DialogContent>
            <DialogActions style={{justifyContent : 'center'}}>
                <Button variant="contained">Mint</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NFTMint;