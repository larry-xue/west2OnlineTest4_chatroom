const href = 'http://123.57.215.101:3000/chatroom/#/UserInfo';
const tempurl = href.split('?');
let roomid = '';
// eslint-disable-next-line no-empty
if (href === tempurl[0]) {
} else {
  // eslint-disable-next-line prefer-destructuring
  roomid = tempurl[1].split('#')[0];
  // eslint-disable-next-line prefer-destructuring
  roomid = roomid.split('=')[1];
}
console.log(roomid);
