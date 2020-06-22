export function setLocalStorage(data) {
  window.localStorage.setItem('cq-v2', JSON.stringify(data));
}
export function getLocalStorage() {
  const storeData = window.localStorage.getItem('cq-v2');
  return JSON.parse(storeData);
}
export function resetLocalStorage() {
  setLocalStorage(null);
}

export default {
  setLocalStorage,
  getLocalStorage,
  resetLocalStorage
};
