const rn_bridge = require("rn-bridge");
const ElectrumClient = require("electrum-client");
const bitcoin = require("bitcoinjs-lib");

let mainClient = false;

const main = async () => {
	const peers = require("electrum-host-parse").getDefaultPeers("BitcoinSegwit").filter(v => v.ssl);
	const getRandomPeer = () => peers[peers.length * Math.random() | 0];
	const peer = getRandomPeer();
	console.log("begin connection:", JSON.stringify(peer));
	mainClient = new ElectrumClient(peer.ssl, peer.host, "ssl");
	try {
		await mainClient.connect();
		const ver = await mainClient.server_version("3.2.3", "1.2");
		console.log("connected to ", ver)
	} catch (e) {
		console.log("bad connection:", JSON.stringify(peer));
		console.log("trying again");
		return main()
	}
};

const connectToPeer = async ({ port = "", host = "", protocol = "ssl" }) => {
	const mainClient = new ElectrumClient(peer.ssl, peer.host, protocol) ;// protocol = tcp or tls
	await mainClient.connect();
	try{
		await mainClient.connect();
		const ver = await mainClient.server_version("3.2.3", "1.2");
		console.log("connected to ", ver)
	}catch(e){
		console.log("bad connection:", JSON.stringify(e));
		console.log("trying again");
		return connectToPeer({ port, host, protocol });
	}
};

const connectToRandomPeer = async () => {
	const peers = require("electrum-host-parse").getDefaultPeers("BitcoinSegwit").filter(v => v.ssl);
	const getRandomPeer = () => peers[peers.length * Math.random() | 0];
	const peer = getRandomPeer();
	console.log("begin connection:", JSON.stringify(peer));
	mainClient = new ElectrumClient(peer.ssl, peer.host, "ssl");
	try {
		await mainClient.connect();
		const ver = await mainClient.server_version("3.2.3", "1.2");
		console.log("connected to ", ver)
	} catch (e) {
		console.log("bad connection:", JSON.stringify(peer));
		console.log("trying again");
		return connectToRandomPeer()
	}
};

/*
This is usually the first client’s message, plus it’s sent every minute as a keep-alive message.
Client sends its own version and version of the protocol it supports.
Server responds with its supported version of the protocol (higher number at server-side is usually compatible).
 */
const getVersion = async ({ id = "1", v1 = "3.2.3", v2 = "1.2" } = {}) => {
	/*
	const peers = require("electrum-host-parse").getDefaultPeers("BitcoinSegwit").filter(v => v.ssl);
	const getRandomPeer = () => peers[peers.length * Math.random() | 0];
	const peer = getRandomPeer();
	console.log("begin connection:", JSON.stringify(peer));
	mainClient = new ElectrumClient(peer.ssl, peer.host, "ssl");
	*/

	if (mainClient === false) await connectToRandomPeer();
	try {
		await mainClient.connect();
		const response = await mainClient.server_version();
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method: "getVersion", data: response}));
	} catch (e) {
		console.log("bad connection:", JSON.stringify(e));
		console.log("trying again");
		return getVersion();
	}
};

const getBanner = async ({ id= "" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.server_banner();
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method: "getBanner", data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method: "getBanner", data: e }));
	}
};

const getDonationAddress = async ({ id = "" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.serverDonation_address();
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method: "getDonationAddress", data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method: "getDonationAddress", data: e }));
	}
};

/*
Client can this way ask for a list of other active servers.
Servers are connected to an IRC channel (#electrum at freenode.net) where they can see each other.
Each server announces its version, history pruning limit of every address (“p100”, “p10000” etc.–the number means how many transactions the server may keep for every single address) and supported protocols (“t” = tcp@50001, “h” = http@8081, “s” = tcp/tls@50002, “g” = https@8082; non-standard port would be announced this way: “t3300” for tcp on port 3300).
Note: At the time of writing there isn’t a true subscription implementation of this method, but servers only send one-time response. They don’t send notifications yet.
 */
const getPeers = async ({ id = "", method = "getPeers" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.serverPeers_subscribe();
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: null }));
	}
};

const getAvailablePeers = async ({ id = "", method = "getAvailablePeers" }) => {
	try {
		const peers = require("electrum-host-parse").getDefaultPeers("BitcoinSegwit").filter(v => v.ssl);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: peers}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

const disconnectFromPeer = async ({ id = "", method = "disconnectFromPeer" }) => {
	try {
		if (mainClient === false) {
			//No peer to disconnect from...
			rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: { message: "No peer to disconnect from." }}));
		} else {
			//Attempt to disconnect from peer...
			await mainClient.close();
			mainClient = false;
			rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: "Successfully disconnected from peer."}));
		}
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "Unable to disconnect from peer.", method, data: e }));
	}
};

/*
A request to send to the client notifications about new blocks height.
Responds with the current block height.
 */
const getNewBlockHeightSubscribe = async ({ id = "", method = "getNewBlockHeightSubscribe" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainNumblocks_subscribe();
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

/*
A request to send to the client notifications about new blocks in form of parsed blockheaders.
 */
const getNewBlockHeadersSubscribe = async ({ params = [], id = "", method = "getNewBlockHeadersSubscribe" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainHeaders_subscribe(params);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: null }));
	}
};

/*
A request to send to the client notifications when status (i.e., transaction history) of the given address changes.
Status is a hash of the transaction history.
If there isn’t any transaction for the address yet, the status is null.
 */
const getHashOfAddressChangesSubscribe = async ({ address = "", id = "", method = "getHashOfAddressChangesSubscribe" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainAddress_subscribe(address);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: null }));
	}
};

/*
For a given address a list of transactions and their heights (and fees in newer versions) is returned.
 */
const getAddressHistory = async ({ address = "", id = "", method = "getAddressHistory" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainAddress_getHistory(address);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

const getMempool = async ({ address = "", id = "", method = "getMempool" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainAddress_getMempool(address);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

const getAddressBalance = async ({ address = "", id = "", method = "getAddressBalance" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainAddress_getBalance(address);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: null }));
	}
};

const getAddressScriptHashBalance = async ({ address = "", id = "", method = "getAddressScriptHashBalance" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();

		const script = bitcoin.address.toOutputScript("bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq");
		let hash = bitcoin.crypto.sha256(script);
		const reversedHash = new Buffer(hash.reverse());
		const scriptHash = reversedHash.toString("hex");

		const response = await mainClient.blockchainScripthash_getBalance(scriptHash);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: null }));
	}
};

const getAddressProof = async ({ address = "", id = "", method = "getAddressProof" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainAddress_getProof(address);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

const listUnspentAddress = async ({ address = "", id = "", method = "listUnspentAddress" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainAddress_listunspent(address);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

const getAddressUtxo = async ({ txHash = "", index = "", id = "", method = "getAddressUtxo" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainUtxo_getAddress(txHash, index);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

const getBlockHeader = async ({ height = "", id = "", method = "getBlockHeader" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainBlock_getHeader(height);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

const getBlockChunk = async ({ index = "", id = "", method = "getBlockChunk" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainBlock_getChunk(index);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

/*
Submits raw transaction (serialized, hex-encoded) to the network.
Returns transaction id, or an error if the transaction is invalid for any reason.
 */
const broadcastTransaction = async ({ rawTx = "", id = "", method = "broadcastTransaction" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainTransaction_broadcast(rawTx);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

const getTransactionMerkle = async ({ txHash = "", height = "", id = "", method = "getTransactionMerkle" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainTransaction_getMerkle(txHash, height);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

/*
Method for obtaining raw transaction (hex-encoded) for given txid.
If the transaction doesn’t exist, an error is returned.
 */
const getTransactionHex = async ({ txId = "", id = "", method = "getTransactionHex" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainTransaction_get(txId);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

/*
Estimates the transaction fee per kilobyte that needs to be paid for a transaction to be included within a certain number of blocks.
If the node doesn’t have enough information to make an estimate, the value -1 will be returned.
Parameter: How many blocks the transaction may wait before being included.
 */
const getFeeEstimate = async ({ blocksWillingToWait = 4, id = "", method = "getFeeEstimate" }) => {
	try {
		if (mainClient === false) await connectToRandomPeer();
		const response = await mainClient.blockchainEstimatefee(blocksWillingToWait);
		rn_bridge.channel.send(JSON.stringify({ id, error: false, method, data: response}));
	} catch (e) {
		console.log(e);
		rn_bridge.channel.send(JSON.stringify({ id, error: true, errorTitle: "", errorMsg: "", method, data: e }));
	}
};

module.exports = {
	getAddressScriptHashBalance,
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
	getAddressProof,
	listUnspentAddress,
	getAddressUtxo,
	getBlockHeader,
	getBlockChunk,
	broadcastTransaction,
	getTransactionMerkle,
	getTransactionHex,
	getFeeEstimate
};