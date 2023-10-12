import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_API_SERVER}/`, {
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;
