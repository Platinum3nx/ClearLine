export function buildAuthHeader(token = 'demo-token') {
  return { authorization: 'Bearer ' + token };
}

