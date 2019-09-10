
let state = {
  "started":false,
};

function setState(istate) {
  state = istate;
}
function getState() {
  return state;
}

export default {
  setState,
  getState,
};
