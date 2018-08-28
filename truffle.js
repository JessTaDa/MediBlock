module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      gas: 2000000,   // <--- Twice as much
      gasPrice: 10000000000,
      network_id: "*" // Match any network id
    }
  }
};
