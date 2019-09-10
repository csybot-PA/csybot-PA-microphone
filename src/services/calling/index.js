// const dns = require('dns')
// alert('loaded')
// try{

//   // const find = require('local-devices');
//   const bonjour = require('bonjour')()
// }catch(err){
//   alert(err)
// }
const states = require('../states/').default
// const find = require('local-devices');
// const bonjour = require('bonjour')()
// alert('loaded')
let state = {
  oncall: false,
}

class onCall {

  constructor() {
    let self = this
  }

  getState(item) {
    //   alert(item)
    //   alert(state[item])
    return state[item];
  }
  connect() {

    state['oncall'] = true
    return true
  }
  // bonjour() {
  //   return bonjour;
  // }
  drop() {
    state['oncall'] = false
    return true
  }

  async getIPS() {
    return new Promise(function (resolve, reject) {
      find().then(devices => {
        resolve(devices)
      })
    })
  }

  async resolveIP(ip_domain_hostname) {
    let pattern = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    if (pattern.test(ip_domain_hostname)) return ip_domain_hostname;

    // let IP = await dns.lookup(ip_domain_hostname)
    // return IP
    let tmp = await getIPS();
    for (let i in tmp)
      if (i.mac === ip_domain_hostname) return i.ip

    return ip_domain_hostname

  }

  addListeners(onOffline, onOnline) {
    // for(let i in states)alert(i)
    // try{
    // alert(states.getState())

    let started = states.getState()["started"]
    // alert(started)
    if(started === false){
      document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
    }else {
      let tmp = states.getState()
      tmp[started] = true;
      states.setState(tmp)
    }
    
    // }catch(error){
    //   alert(error)
    // }
  }

}

let calling = new onCall();

export default {
  calling
};
