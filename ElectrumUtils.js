import nodejs from "nodejs-mobile-react-native";

this.getAddressBalance = {};
this.getAddressScriptHashBalance = {};
this.getMempool = {};
this.listUnspentAddress = {};
this.getFeeEstimate = {};
this.getAddressHistory = {};
this.getTransactionHex = {};
this.getDonationAddress = {};
this.disconnectFromPeer = {};
this.getAvailablePeers = {};
this.getPeers = {};
this.getNewBlockHeightSubscribe = {};
this.getTransactionMerkle = {};
this.getAddressUtxo = {};
this.broadcastTransaction = {};
this.getBlockChunk = {};
this.getBlockHeader = {};
this.getAddressProof = {};
this.getVersion = {};

const addElectrumListener = () => {
	try {
		//Setup the listener for electrum messages
		this.listenerRef = ((msg) => {
			try {
				msg = JSON.parse(msg);
				switch (msg.method) {
					case "getAddressBalance":
					//Execute anything you need for the given function...
					default:
						break;
				}
			} catch (e) {
				JSON.stringify(e);
			}
		});
		//Add the listener for electrum messages
		nodejs.channel.addListener(
			"message",
			this.listenerRef,
			this
		);
	} catch (e) {
		console.log(e);
	}
};

const removeElectrumListener = () => {
	try {
		if (this.listenerRef) {
			nodejs.channel.removeListener("message", this.listenerRef);
		}
	} catch (e) {
		console.log(e);
	}
};

//Async Implementation of getAddressBalance
const getAddressBalance = ({ address = "", id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getAddressBalance[id] = ((msg) => {
				msg = JSON.parse(msg);
				if (msg.method === "getAddressBalance" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getAddressBalance[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getAddressBalance[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getAddressBalance", address, id }));
		} catch (e) {
			resolve({ error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

//Async Implementation of getAddressScriptHashBalance
const getAddressScriptHashBalance = ({ address = "", id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getAddressScriptHashBalance[id] = ((msg) => {
				msg = JSON.parse(msg);
				if (msg.method === "getAddressScriptHashBalance" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getAddressScriptHashBalance[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getAddressScriptHashBalance[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getAddressScriptHashBalance", address, id }));
		} catch (e) {
			resolve({ error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getMempool = ({ address = "", id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getMempool = ((msg) => {
				msg = JSON.parse(msg);
				if (msg.method === "getMempool" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getMempool);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getMempool,
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getMempool", address, id }));
		} catch (e) {
			resolve({ error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const listUnspentAddress = ({ address = "", id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.listUnspentAddress[id] = ((msg) => {
				msg = JSON.parse(msg);
				if (msg.method === "listUnspentAddress" && msg.id === id) {
					nodejs.channel.removeListener("message", this.listUnspentAddress[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.listUnspentAddress[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "listUnspentAddress", address, id }));
		} catch (e) {
			resolve({ error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getFeeEstimate = ({ blocksWillingToWait = 8, id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getFeeEstimate = ((msg) => {
				msg = JSON.parse(msg);
				if (msg.method === "getFeeEstimate") {
					nodejs.channel.removeListener("message", this.getFeeEstimate);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getFeeEstimate,
				this
			);

			nodejs.channel.send(JSON.stringify({ id, method: "getFeeEstimate", blocksWillingToWait }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getAddressHistory = ({ address = "", id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getAddressHistory[id] = ((msg) => {
				msg = JSON.parse(msg);
				if (msg.method === "getAddressHistory" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getAddressHistory[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getAddressHistory[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getAddressHistory", address, id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getTransactionHex = ({ txId = "", id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getTransactionHex[id] = ((msg) => {
				msg = JSON.parse(msg);
				if (msg.method === "getTransactionHex" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getTransactionHex[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getTransactionHex[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getTransactionHex", txId, id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getDonationAddress = ({ id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getDonationAddress[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getDonationAddress" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getDonationAddress[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getDonationAddress[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getDonationAddress", id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const disconnectFromPeer = ({ id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.disconnectFromPeer[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "disconnectFromPeer" && msg.id === id) {
					nodejs.channel.removeListener("message", this.disconnectFromPeer[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.disconnectFromPeer[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "disconnectFromPeer", id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getPeers = ({ id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getPeers[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getPeers" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getPeers[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getPeers[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getPeers", id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getAvailablePeers = ({ id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getAvailablePeers[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getAvailablePeers" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getAvailablePeers[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getAvailablePeers[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getAvailablePeers", id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getVersion = ({ id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getVersion[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getVersion" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getVersion[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getVersion[id],
				this
			);
			nodejs.channel.send(JSON.stringify({ method: "getVersion", id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getNewBlockHeightSubscribe = () => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getNewBlockHeightSubscribe = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getNewBlockHeightSubscribe") {
					alert(JSON.stringify(msg));
					resolve({ ...msg, message: "Successfully subscribed to receive new block heights." });
					//nodejs.channel.removeListener("message", this.getNewBlockHeightSubscribe);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getNewBlockHeightSubscribe,
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getNewBlockHeightSubscribe" }));
		} catch (e) {
			resolve({ error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getTransactionMerkle = ({ id = Math.random(), txHash = "", height = "" }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getTransactionMerkle[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getTransactionMerkle" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getTransactionMerkle[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getTransactionMerkle[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getTransactionMerkle", id, txHash, height }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getAddressUtxo = ({ id = Math.random(), txHash = "", index = "" }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getAddressUtxo[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getAddressUtxo" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getAddressUtxo[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getAddressUtxo[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getAddressUtxo", id, txHash, index }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const broadcastTransaction = ({ id = Math.random(), rawTx = "" }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.broadcastTransaction[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "broadcastTransaction" && msg.id === id) {
					nodejs.channel.removeListener("message", this.broadcastTransaction[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.broadcastTransaction[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "broadcastTransaction", id, rawTx }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getBlockChunk = ({ id = Math.random(), index = "" }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getBlockChunk[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getBlockChunk" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getBlockChunk[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getBlockChunk[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getBlockChunk", id, index }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getBlockHeader = ({ id = Math.random(), height = "" }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getBlockHeader[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getBlockHeader" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getBlockHeader[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getBlockHeader[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getBlockHeader", id, height }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getBanner = ({ id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getBanner[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getBanner" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getBanner[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getBanner[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getBanner", id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

const getAddressProof = ({ address = "", id = Math.random() }) => {
	return new Promise(async (resolve) => {
		try {
			//Add a new listener that self-removes once complete.
			this.getAddressProof[id] = (msg => {
				msg = JSON.parse(msg);
				if (msg.method === "getAddressProof" && msg.id === id) {
					nodejs.channel.removeListener("message", this.getAddressProof[id]);
					resolve(msg);
				}
			});
			//Ensure the listener is setup and established.
			await nodejs.channel.addListener(
				"message",
				this.getAddressProof[id],
				this
			);

			nodejs.channel.send(JSON.stringify({ method: "getAddressProof", address, id }));
		} catch (e) {
			resolve({ id, error: true, errorTitle: "", errorMsg: "", data: e });
		}
	});
};

module.exports = {
	addElectrumListener,
	removeElectrumListener,
	getAddressBalance,
	getAddressScriptHashBalance,
	getMempool,
	listUnspentAddress,
	getFeeEstimate,
	getAddressHistory,
	getTransactionHex,
	getDonationAddress,
	disconnectFromPeer,
	getPeers,
	getAvailablePeers,
	getNewBlockHeightSubscribe,
	getTransactionMerkle,
	getAddressUtxo,
	broadcastTransaction,
	getBlockChunk,
	getBlockHeader,
	getBanner,
	getAddressProof,
	getVersion
};