const BitMEXClient = require('./bitmex');
// See 'options' reference below
const client = new BitMEXClient({
  testnet: true,
  apiKeyId: "ocPNfi0tnLz1g1LJ9rIIVg54"
});
// handle errors here. If no 'error' callback is attached. errors will crash the client.
client.on('error', console.error);
client.on('open', () => console.log('Connection opened.'));
client.on('close', () => console.log('Connection closed.'));
client.on('initialize', () => console.log('Client initialized, data is flowing.'));

module.exports = socket => {
  client.addStream('*', 'instrument', function(data, symbol, tableName) {
    if(data[0].state !== 'Open') return null
    // console.log("Data STATE ",data[0].state, data[0].symbol);
    socket.emit('instrument', data)
  });
}
