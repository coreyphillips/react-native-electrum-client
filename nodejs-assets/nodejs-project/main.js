// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

const rn_bridge = require("rn-bridge");
const {
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
} = require("./electrumUtils");

let Electrum = false;

rn_bridge.channel.on("message", (msg) => {
	let id = "";
	let address = "";
	let blocksWillingToWait = 4;
	let txId = "";
	let txHash = "";
	let height = "";
	let index = "";
	let rawTx = "";

	msg = JSON.parse(msg);
	try { id = msg.id } catch (e) {}

	switch(msg.method) {
		case "getAddressBalance":
			try { address = msg.address } catch (e) {}
			getAddressBalance({ address, id });
			break;
		case "getAddressScriptHashBalance":
			try { address = msg.address } catch (e) {}
			getAddressScriptHashBalance({ address, id });
			break;
		case "getMempool":
			try { address = msg.address } catch (e) {}
			getMempool({ address, id });
			break;
		case "listUnspentAddress":
			try { address = msg.address } catch (e) {}
			listUnspentAddress({ address, id });
			break;
		case "getFeeEstimate":
			try { blocksWillingToWait = msg.blocksWillingToWait } catch (e) {}
			getFeeEstimate({ blocksWillingToWait, id });
			break;
		case "getAddressHistory":
			try { address = msg.address } catch (e) {}
			getAddressHistory({ address, id });
			break;
		case "getTransactionHex":
			try { txId = msg.txId } catch (e) {}
			getTransactionHex({ txId, id });
			break;
		case "getDonationAddress":
			getDonationAddress({ id });
			break;
		case "disconnectFromPeer":
			disconnectFromPeer({ id });
			break;
		case "getAvailablePeers":
			getAvailablePeers({ id });
			break;
		case "getPeers":
			getPeers({ id });
			break;
		case "getNewBlockHeightSubscribe":
			getNewBlockHeightSubscribe();
			break;
		case "getTransactionMerkle":
			try { txHash = msg.txHash } catch (e) {}
			try { height = msg.height } catch (e) {}
			getTransactionMerkle({ id, txHash, height });
			break;
		case "getAddressUtxo":
			try { txHash = msg.txHash } catch (e) {}
			try { index = msg.index } catch (e) {}
			getAddressUtxo({ id, txHash, index });
			break;
		case "broadcastTransaction":
			try { rawTx = msg.rawTx } catch (e) {}
			broadcastTransaction({ id, rawTx });
			break;
		case "getBlockChunk":
			try { index = msg.index } catch (e) {}
			getBlockChunk({ id, index });
			break;
		case "getBlockHeader":
			try { height = msg.height } catch (e) {}
			getBlockHeader({ id, height });
			break;
		case "getBanner":
			getBanner({ id });
			break;
		case "getAddressProof":
			try { address = msg.address } catch (e) {}
			getAddressProof({ id, address });
			break;
		case "getVersion":
			getVersion({ id });
			break;
		default:
			break;
			/*
			Methods To Add To Switch Statement:
			getVersion,
			getBanner,
			getDonationAddress,
			getPeers,
			getNewBlockHeightSubscribe,
			getNewBlockHeadersSubscribe,
			getHashOfAddressChangesSubscribe,
			getAddressHistory,
			getMempool,
			getAddressProof,
			listUnspentAddress,
			getAddressUtxo,
			getBlockHeader,
			getBlockChunk,
			broadcastTransaction,
			getTransactionMerkle,
			getTransactionHex,
			getFeeEstimate

			 */
	}
});