export function setSessionStorage(data) {
  window.sessionStorage.setItem('cq-color', JSON.stringify(data));
}
export function getSessionStorage() {
  const storeData = window.sessionStorage.getItem('cq-color');
  return JSON.parse(storeData);
}
export function resetSessionStorage() {
  setSessionStorage(null);
}

export default {
  setSessionStorage,
  getSessionStorage,
  resetSessionStorage
};
