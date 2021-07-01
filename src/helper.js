export function arrayToBase64String(a) {
  console.log(JSON.stringify(a));
  console.log(btoa(String.fromCharCode(...new Uint8Array(a))));
  return btoa(String.fromCharCode(...a));
}

export function base64StringToArray(s) {
  const asciiString = atob(s);
  console.log(new Uint8Array([...asciiString].map(char => char.charCodeAt(0))));
  return new Uint8Array([...asciiString].map(char => char.charCodeAt(0)));
}
