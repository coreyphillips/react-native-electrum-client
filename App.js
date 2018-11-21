/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator
} from "react-native";

import nodejs from "nodejs-mobile-react-native";

const {
	getBalance,
	getVersion,
	getBanner,
	getDonationAddress,
	getPeers,
	getAvailablePeers,
	disconnectFromPeer,
	getNewBlockHeightSubscribe,
	getNewBlockHeadersSubscribe,
	getHashOfAddressChangesSubscribe,
	getAddressHistory,
	getMempool,
	getAddressBalance,
	getAddressScriptHashBalance,
	getAddressProof,
	listUnspentAddress,
	getAddressUtxo,
	getBlockHeader,
	getBlockChunk,
	broadcastTransaction,
	getTransactionMerkle,
	getTransactionHex,
	getFeeEstimate
} = require("./ElectrumUtils");

type Props = {};

export default class App extends Component<Props> {

	constructor(props) {
		super(props);
		this.state = {
			loading: {
				getAddressBalance: false,
				getAddressScriptHashBalance: false,
				getMempool: false,
				listUnspentAddress: false,
				getFeeEstimate: false,
				getAddressHistory: false,
				getTransactionHex: false,
				getDonationAddress: false,
				disconnectFromPeer: false,
				getAvailablePeers: false,
				getPeers: false,
				getNewBlockHeightSubscribe: false,
				getTransactionMerkle: false,
				getAddressUtxo: false,
				broadcastTransaction: false,
				getBlockChunk: false,
				getBlockHeader: false,
				getBanner: false,
				getAddressProof: false,
				getVersion: false
			}
		};
	}

	componentWillMount() {
		//Spin up the nodejs thread
		nodejs.start("main.js");

		//Setup and add listener
		//addElectrumListener();
	}

	componentWillUnmount() {
		//Remove listener
		//removeElectrumListener();
	}

	render() {

		return (
			<View style={styles.container}>

				{/*
				Get Address Balance
					3NZiodMiB8K8fzgCY1itQ3CxEYwDxgdfpe
					bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq
					bc1q6f6l84dd07g2478ggvwc8h0cyszz9m4j3kjzjz
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getAddressBalance"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getAddressBalance: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getAddressBalance({ address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", id: 8 }); } catch (e) {}
						await this.setState({ loading: { ...this.state.loading, getAddressBalance: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getAddressBalance"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getAddressBalance"] ? 0 : 1 }]}>
						Get Address Balance
					</Text>
				</TouchableOpacity>

				{/*
				Get Address Script Hash Balance
					3NZiodMiB8K8fzgCY1itQ3CxEYwDxgdfpe
					bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq
					bc1q6f6l84dd07g2478ggvwc8h0cyszz9m4j3kjzjz (Script Hash SHould Be: )
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getAddressScriptHashBalance"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getAddressScriptHashBalance: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getAddressScriptHashBalance({ address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", id: 8 }); } catch (e) {}
						await this.setState({ loading: { ...this.state.loading, getAddressScriptHashBalance: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getAddressScriptHashBalance"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getAddressScriptHashBalance"] ? 0 : 1 }]}>
						Get Address Script Hash Balance
					</Text>
				</TouchableOpacity>

				{/*
				Get Address History
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getAddressHistory"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getAddressHistory: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getAddressHistory({ address: "1Hwxu3Bo7jGVPjQDPEN6XYUNdMVocEUfF2", id: 8 }); } catch (e) {}
						await this.setState({ loading: { ...this.state.loading, getAddressHistory: false }});
						alert(JSON.stringify(result));
						console.log(result);
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getAddressHistory"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getAddressHistory"] ? 0 : 1 }]}>
						Get Address History
					</Text>
				</TouchableOpacity>

				{/*
				Get Mempool
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getMempool"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getMempool: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getMempool({address: "1ACAgPuFFidYzPMXbiKptSrwT74Dg8hq2v", id: 1}); } catch (e) {}
						await this.setState({ loading: { ...this.state.loading, getMempool: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getMempool"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getMempool"] ? 0 : 1 }]}>
						Get Mempool
					</Text>
				</TouchableOpacity>

				{/*
				List Unspent Address
				 */}
				<TouchableOpacity
					disabled={this.state.loading["listUnspentAddress"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, listUnspentAddress: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await listUnspentAddress({address: "1ACAgPuFFidYzPMXbiKptSrwT74Dg8hq2v", id: 10}); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, listUnspentAddress: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["listUnspentAddress"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["listUnspentAddress"] ? 0 : 1 }]}>
						List Unspent Address
					</Text>
				</TouchableOpacity>

				{/*
				Get Fee Estimate
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getFeeEstimate"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getFeeEstimate: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getFeeEstimate({ blocksWillingToWait: 8 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getFeeEstimate: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getFeeEstimate"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getFeeEstimate"] ? 0 : 1 }]}>
						Get Fee Estimate
					</Text>
				</TouchableOpacity>

				{/*
				Get Transaction Hex
				Decode the txHex using bitcoinjs-lib:
				var bitcoin = require('bitcoinjs-lib');
				var tx = bitcoin.Transaction.fromHex(rawtx);
				var txid = tx.getId();
				console.log(txid);
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getTransactionHex"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getTransactionHex: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getTransactionHex({ txId: "7e53ebb76eb966686369594beaaae4f30b78668b06a6361773d854fe574b656c" }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getTransactionHex: false }});
						alert(JSON.stringify(result));
						console.log(result);
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getTransactionHex"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getTransactionHex"] ? 0 : 1 }]}>
						Get Transaction Hex
					</Text>
				</TouchableOpacity>

				{/*
				Get Donation Address
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getDonationAddress"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getDonationAddress: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getDonationAddress({ id: 1 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getDonationAddress: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getDonationAddress"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getDonationAddress"] ? 0 : 1 }]}>
						Get Donation Address
					</Text>
				</TouchableOpacity>

				{/*
				Get Version
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getVersion"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getVersion: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getVersion({ id: 1 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getVersion: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getVersion"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getVersion"] ? 0 : 1 }]}>
						Get Version
					</Text>
				</TouchableOpacity>

				{/*
				Get Available Peers
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getAvailablePeers"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getAvailablePeers: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getAvailablePeers({ id: 1 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getAvailablePeers: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getAvailablePeers"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getAvailablePeers"] ? 0 : 1 }]}>
						Get Available Peers
					</Text>
				</TouchableOpacity>

				{/*
				Get Peers
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getPeers"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getPeers: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getPeers({ id: 1 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getPeers: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getPeers"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getPeers"] ? 0 : 1 }]}>
						Get Peers
					</Text>
				</TouchableOpacity>

				{/*
				Disconnect From Peer
				 */}
				<TouchableOpacity
					disabled={this.state.loading["disconnectFromPeer"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, disconnectFromPeer: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await disconnectFromPeer({ id: 1 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, disconnectFromPeer: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["disconnectFromPeer"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["disconnectFromPeer"] ? 0 : 1 }]}>
						Disconnect From Peer
					</Text>
				</TouchableOpacity>

				{/*
				Subscribe: Get New Block Height
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getNewBlockHeightSubscribe"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getNewBlockHeightSubscribe: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getNewBlockHeightSubscribe(); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getNewBlockHeightSubscribe: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getNewBlockHeightSubscribe"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getNewBlockHeightSubscribe"] ? 0 : 1 }]}>
						Subscribe: Get New Block Height
					</Text>
				</TouchableOpacity>

				{/*
				Get Transaction Merkle
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getTransactionMerkle"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getTransactionMerkle: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getTransactionMerkle({ id: 1, txHash: "981b4e9fb6df900063d8ce7ce267393fe54e0a00a68ea7507eb644804d66efa9", height: 538764 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getTransactionMerkle: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getTransactionMerkle"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getTransactionMerkle"] ? 0 : 1 }]}>
						Get Transaction Merkle
					</Text>
				</TouchableOpacity>

				{/*
				Get Address UTXO
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getAddressUtxo"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getAddressUtxo: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getAddressUtxo({ id: 1, txHash: "1ACAgPuFFidYzPMXbiKptSrwT74Dg8hq2v", index: 1 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getAddressUtxo: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getAddressUtxo"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getAddressUtxo"] ? 0 : 1 }]}>
						Get Address UTXO
					</Text>
				</TouchableOpacity>

				{/*
				Broadcast Transaction
				 */}
				<TouchableOpacity
					disabled={this.state.loading["broadcastTransaction"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, broadcastTransaction: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await broadcastTransaction({ id: 1, rawTx: "" }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, broadcastTransaction: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["broadcastTransaction"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["broadcastTransaction"] ? 0 : 1 }]}>
						Broadcast Transaction
					</Text>
				</TouchableOpacity>

				{/*
				Get Block Chunk
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getBlockChunk"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getBlockChunk: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getBlockChunk({ id: 1, index: 2 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getBlockChunk: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getBlockChunk"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getBlockChunk"] ? 0 : 1 }]}>
						Get Block Chunk
					</Text>
				</TouchableOpacity>

				{/*
				Get Block Header
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getBlockHeader"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getBlockHeader: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getBlockHeader({ id: 1, height: 2 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getBlockHeader: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getBlockHeader"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getBlockHeader"] ? 0 : 1 }]}>
						Get Block Header
					</Text>
				</TouchableOpacity>

				{/*
				Get Banner
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getBanner"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getBanner: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getBanner({ id: 1 }); } catch (e) { alert(e) }
						await this.setState({ loading: { ...this.state.loading, getBanner: false }});
						alert(JSON.stringify(result));
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getBanner"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getBanner"] ? 0 : 1 }]}>
						Get Banner
					</Text>
				</TouchableOpacity>

				{/*
				Get Address Proof
				 */}
				<TouchableOpacity
					disabled={this.state.loading["getAddressProof"]}
					onPress={async () => {
						await this.setState({ loading: { ...this.state.loading, getAddressProof: true }});
						let result = { error: true, errorTitle: "Unable to connect to electrum node", errorMsg: "" };
						try { result = await getAddressProof({ address: "1Hwxu3Bo7jGVPjQDPEN6XYUNdMVocEUfF2", id: 8 }); } catch (e) {}
						await this.setState({ loading: { ...this.state.loading, getAddressProof: false }});
						alert(JSON.stringify(result));
						console.log(result);
					}}
					style={styles.button}
				>
					<ActivityIndicator style={styles.activityIndicator} animating={this.state.loading["getAddressProof"]} size="small" color="#157efb" />
					<Text style={[styles.text, { opacity: this.state.loading["getAddressProof"] ? 0 : 1 }]}>
						Get Address Proof
					</Text>
				</TouchableOpacity>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	instructions: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginBottom: 5
	},
	activityIndicator: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center"
	},
	text: {
		textAlign: "center"
	}
});
