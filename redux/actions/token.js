export function saveToken(token) {
  return {
    type: 'token-save',
    token: token
  };
}
export function destroyToken() {
  return {
    type: 'token-destroy',
  };
}
