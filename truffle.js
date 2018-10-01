module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      gas: 4712388,   // <--- Twice as much
      gasPrice: 100000000000,
      network_id: "*" // Match any network id
    }
  }
};
