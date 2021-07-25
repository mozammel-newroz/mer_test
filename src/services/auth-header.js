

import Cookies from 'js-cookie';

export default function authHeader() {
    const user = Cookies.getJSON('Mtoken');

  if (user && user.data.token) {
    return { Authorization: 'Bearer ' + user.data.token }; // for Laravel back-end
  } else {
    return {};
  }
}
