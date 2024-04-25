
require("dotenv").config();

const relayerServicePrivateKeyy = () => {
  return process.env.PRIVATE_KEY;
}

const gaslessTransaction = async (functionName, toAddress, value) => {
  const relayerServiceAddress = process.env.PUBLIC_KEY;
  const relayerServicePrivateKey = process.env.PRIVATE_KEY;
  const contractAddress = process.env.CONTRACT_ADDRESS;

  const tx = {
    from: relayerServiceAddress,
    to: contractAddress,
    nonce: await ethers.utils.getTransactionCount(relayerServiceAddress),
    data: ethers.utils.defaultAbiCoder.encode([functionName], [toAddress, value]),
    gas: '1_000_000',
    gasPrice: '20',
  };

  const signedTx = ethers.utils.signTransaction(tx, relayerServicePrivateKey);

  // Send the signed transaction to the relayer service
  const response = await fetch(process.env.RPC_SEPOLIA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signedTx),
  });

  const receipt = await response.json();
  console.log(receipt);
};

module.exports = {gaslessTransaction, relayerServicePrivateKeyy}