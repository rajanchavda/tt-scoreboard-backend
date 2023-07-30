
const SOCKET_EVENTS = {
  GAME_UPDATE: 'GameUpdate',
  SETTINGS_UPDATE: 'SettingsUpdate',
}

const OnConnectionSuccess = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // socket.on(SOCKET_EVENTS.GAME_UPDATE, (data) => {
    //   console.log(SOCKET_EVENTS.GAME_UPDATE, data);

    //   io.emit(SOCKET_EVENTS.GAME_UPDATE, data)
    // });
  });
}

module.exports = {
  SOCKET_EVENTS,
  OnConnectionSuccess
}