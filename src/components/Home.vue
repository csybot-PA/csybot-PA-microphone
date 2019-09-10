
<style lang="stylus">

.ar {
  width: 420px;
  font-family: 'Roboto', sans-serif;
  border-radius: 16px;
  background-color: #fafafa;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.17);
  position: relative;
  box-sizing: content-box;
}

.ar-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ar-records {
  height: 138px;
  padding-top: 1px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.ar-records__record {
  width: 320px;
  height: 45px;
  padding: 0 10px;
  margin: 0 auto;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
}

.ar-records__record--selected {
  border: 1px solid #e8e8e8;
  border-radius: 24px;
  background-color: #fff;
  margin-top: -1px;
  padding: 0 34px;
}

.ar-recorder {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ar-recorder__duration {
  color: #aeaeae;
  font-size: 32px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 16px;
}

.ar-recorder__stop {
  position: absolute;
  top: 10px;
  right: -52px;
}

.ar-recorder__time-limit {
  position: absolute;
  color: #aeaeae;
  font-size: 12px;
  top: 128px;
}

.ar-recorder__records-limit {
  position: absolute;
  color: #aeaeae;
  font-size: 13px;
  top: 78px;
}

.ar-spinner {
  display: flex;
  height: 30px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 144px;
  z-index: 10;
}

.ar-spinner__dot {
  display: block;
  margin: 0 8px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: #05cbcd;
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.ar-spinner__dot:nth-child(2) {
  animation-delay: 0.2s;
}

.ar-spinner__dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}

.ar__text {
  color: rgba(84, 84, 84, 0.5);
  font-size: 16px;
}

.ar__blur {
  filter: blur(2px);
  opacity: 0.7;
}

.ar__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.ar__upload-status {
  text-align: center;
  font-size: 10px;
  padding: 2px;
  letter-spacing: 1px;
  position: absolute;
  bottom: 0;
}

.ar__upload-status--success {
  color: green;
}

.ar__upload-status--fail {
  color: red;
}

.ar__rm {
  cursor: pointer;
  position: absolute;
  width: 6px;
  height: 6px;
  padding: 6px;
  line-height: 6px;
  margin: auto;
  left: 10px;
  bottom: 0;
  top: 0;
  color: #f4785a;
}

.ar__downloader, .ar__uploader {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}

.ar__downloader {
  right: 115px;
}

.ar__uploader {
  right: 85px;
}

.ar-icon {
  fill: #747474;
  border-radius: 50%;
  border: 1px solid #05cbcd;
  background-color: #fff;
  padding: 5px;
  cursor: pointer;
  transition: 0.2s;
}

.ar-icon:hover {
  fill: #505050;
}

.ar-icon--no-border {
  border: 0;
  border-radius: 0;
  padding: 0;
}

.ar-icon--rec {
  fill: white;
  background-color: #ff6b64;
  border-color: transparent;
}

.ar-icon--pulse {
  background-color: red;
  animation: ripple 0.5s linear infinite;
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 1px rgba(255, 0, 0, 0.1), 0 0 0 5px rgba(255, 0, 0, 0.1);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.1), 0 0 0 10px rgba(255, 0, 0, 0.1), 0 0 0 20px rgba(255, 0, 0, 0);
  }
}

.ar-icon__xs {
  width: 18px;
  height: 18px;
  line-height: 18px;
}

.ar-icon__sm {
  width: 30px;
  height: 30px;
  line-height: 30px;
}

.ar-icon__lg {
  width: 50%;
  height: 50%;
  line-height: 50%;
  box-shadow: 0 2px 5px 1px rgba(158, 158, 158, 0.5);
}
</style>

<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <div class="ar-recorder">
          <icon-button
            class="ar-icon ar-icon__lg"
            :name="iconButtonType"
            :class="{
            'ar-icon--rec': isConnected,
            'ar-icon--pulse': isConnected
          }"
            @click.native.stop="togglePlaying"
          />
          {{micStatus}}
        </div>
      </v-flex>
    </v-layout>
  </v-container>

  <!-- <v-container grid-list-md text-xs-center fill-height>
  <v-layout row wrap>
     <div class="ar-recorder">
      <div class="ar-content">
        <icon-button
          class="ar-icon ar-icon__lg ar-icon--pulse"
          :name="iconButtonType"
          :class="{
            'ar-icon--rec': true,
            'ar-icon--pulse': true
          }"
        />
      </div>
      &nbsp;Mic: {{iconButtonType}}
    </div>
  </v-layout>-->

  <!-- <div>
    <div class="ar-recorder">
      <div class="ar-content">
        <icon-button
          class="ar-icon ar-icon__lg ar-icon--pulse"
          :name="iconButtonType"
          :class="{
            'ar-icon--rec': true,
            'ar-icon--pulse': true
          }"
        />
      </div>
      &nbsp;Mic: {{iconButtonType}}
    </div>
  </div>-->
  <!-- </v-container> -->
</template>

<script>
import IconButton from "./icon-button";
import callService from "../services/calling/";
import files from "../services/configFiles/";
import states from "../services/states/";
let calling = callService.calling;
let spinnerOptions = { dimBackground: true };

export default {
  data() {
    return {
      micStatus: "disconnected",
      isConnected: false,
      placedCall: false,
      connectionTrials: 0,
      maxChannels: 50,
      maxConnectionTrials: 10,
      channeltrials: 0,
      channel: 1,
      channelToCall: "",
      serveruri: "192.168.4.200",
      ownChannel: "Microphone_1",
      session: null,
      server: "wss://192.168.4.200:5061",
      microphone: "1",
      IP: "192.168.4.200",
      port: "5061",
      uri: "192.168.4.200",
      protocol: "wss"
    };
  },
  components: {
    IconButton
  },
  methods: {
    async togglePlaying() {
      let self = this;
      let isConnected = self.isConnected;

      let tmp = states.getState();
      // alert('state')
      alert(JSON.stringify(tmp))
      self.microphone = tmp.microphone;
      self.port = tmp.port;
      self.protocol = tmp.protocol;
      self.uri = tmp.IP;
      self.server = `${self.protocol}://${self.IP}:${self.port}`;
      // alert(IP)

      var socket = new JsSIP.WebSocketInterface(self.server);
      self.ownChannel = `Microphone_${self.microphone}`;
      var configuration = {
        sockets: [socket],
        // uri: `sip:${self.ownChannel}@${self.uri}`,
        uri: `sip:${self.ownChannel}@${self.uri}`,
        password: "*******"
      };

      alert(self.server)
      alert(`sip:${self.ownChannel}@${self.uri}`)

      try {
        var ua = new JsSIP.UA(configuration);

        ua.start();

        if (isConnected) {
          // calling.drop();
          self.isConnected = !calling.drop();
          self.micStatus = "disconnected";
          self.session.terminate();
          self.channeltrials = 0;
        } else {
          // calling.connect();
          self.channeltrials = 0;
          try {
            // Register callbacks to desired call events
            var eventHandlers = {
              progress: function(e) {
                self.placedCall = true;
                self.micStatus = "call is in progress";
                // console.log('call is in progress');
              },
              failed: function(e) {
                let cause = e.cause;
                // alert("Cause:" + cause);
                if (cause === "disconnected") {
                  if (self.connectionTrials < self.maxConnectionTrials) {
                    self.session = call();
                    self.micStatus = `Trying (${self.connectionTrials++})`;
                  } else {
                    self.connectionTrials = 0;
                    self.micStatus = `Failed to connect`;
                    self.isConnected = false;
                  }
                  return;
                }

                if (cause === "Busy") {
                  self.micStatus = `Channel ${self.channel++} is Busy`;
                  self.isConnected = false;
                  // what to do when channel is busy?
                  // How long before a call is rejected?
                  if (self.channel >= self.maxChannels) self.channel = 1;
                  self.session = call();
                  return;
                }
                if (cause === "Unavailable") {
                  self.micStatus = "Rejected";
                  self.isConnected = false;
                  return;
                }
                if (
                  cause === "Not Found" ||
                  cause === "SIP Failure Code" ||
                  cause === "Canceled"
                ) {
                  self.channeltrials++;
                  self.micStatus = `Channel ${self.channel++} is Invalid`;
                  if (self.channel >= self.maxChannels) self.channel = 1;
                  if (self.channeltrials < self.maxChannels) {
                    self.session = call();
                  } else {
                    self.channeltrials = 0;
                    self.micStatus = `Unable to find valid channel`;
                  }
                  self.isConnected = false;

                  return;
                }
                if (cause === "User Denied Media Access") {
                  self.micStatus = cause;
                  self.isConnected = false;
                }
                // self.connectionTrials = 0;
                // console.log(self.placedCall)
                // console.log(e.cause)
                // if(!self.placedCall)self.micStatus = e.cause
                // if(e.cause === 'Busy' && !self.placedCall)console.log('REaLYY')
                // // console.log(e.cause)
                // if(self.isConnected){
                //   self.isConnected = false;
                //   self.micStatus = e.cause
                // }
                // alert('failed...')
                // console.log(e.cause)
                // console.log('call failed with cause: '+ e.data.cause);
              },
              ended: function(e) {
                self.connectionTrials = 0;
                self.isConnected = false;
                self.micStatus = "disconnected";
                self.placedCall = false;
              },
              confirmed: function(e) {
                self.isConnected = true;
                self.micStatus = `connected to channel ${self.channel}`;
                // console.log('call confirmed');
              }
            };


            const devices = await navigator.mediaDevices.enumerateDevices();
            // alert(JSON.stringify(devices))

            var options = {
              eventHandlers: eventHandlers,
              // mediaConstraints: { audio: true, video: { facingMode: "user" } }
              mediaConstraints: { audio: true, video: false }
            };
          
            self.options = options;
            function call() {
              self.channelToCall = `channel${self.channel}@${self.uri}`;
              // alert(`CALLING: ${self.channelToCall}`);

              var permissions = cordova.plugins.permissions;

              // permissions.hasPermission(permissions.CAMERA, function(status) {
              //   if (status.hasPermission) {
              //     alert("Yes :D ");
              //   } else {
              //     alert("No :( ");
              //   }
              // });
              // permissions.hasPermission(permissions.MODIFY_AUDIO_SETTINGS, function(status) {
              //   if (status.hasPermission) {
              //     alert("Yes :D MODIFY_AUDIO_SETTINGS ");
              //   } else {
              //     alert("No :( MODIFY_AUDIO_SETTINGS");
              //   }
              // });
              // permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, function(status) {
              //   if (status.hasPermission) {
              //     alert("Yes :D WRITE_EXTERNAL_STORAGE ");
              //   } else {
              //     alert("No :( WRITE_EXTERNAL_STORAGE");
              //   }
              // });
              // permissions.hasPermission(permissions.STORAGE_INTERNAL, function(status) {
              //   if (status.hasPermission) {
              //     alert("Yes :D STORAGE_INTERNAL ");
              //   } else {
              //     alert("No :( STORAGE_INTERNAL");
              //   }
              // });
              // permissions.hasPermission(permissions.WRITE_MEDIA_STORAGE, function(status) {
              //   if (status.hasPermission) {
              //     alert("Yes :D WRITE_MEDIA_STORAGE ");
              //   } else {
              //     alert("No :( WRITE_MEDIA_STORAGE");
              //   }
              // });




              permissions.requestPermission(permissions.CAMERA, success, error);
              permissions.requestPermission(permissions.RECORD_AUDIO, success, error);
              permissions.requestPermission(permissions.STORAGE_INTERNAL, success, error);
              permissions.requestPermission(permissions.WRITE_MEDIA_STORAGE, success, error);
              permissions.requestPermission(permissions.MODIFY_AUDIO_SETTINGS, success, error);

              function error(err) {
              }

              function success(status) {
                if (!status.hasPermission) error();
              }
              // let session = ua.call(`sip:${self.channelToCall}`, options);
              let session = ua.call(`sip:${self.channelToCall}`, self.options);
              // alert(JSON.stringify(session));
              return session;
            }
            var session;
            // alert('starting session')
            // self.session=session = ua.call(`sip:${self.channelToCall}`, options);
            self.session = session = call();
            // function sleep(ms) {
            //   return new Promise(resolve => setTimeout(resolve, ms));
            // }

            // async function wait() {
            //   console.log('Taking a break...');
            //   await sleep(2000);
            //   console.log('Two seconds later, showing sleep in a loop...');

            //   // Sleep in loop
            //   for (let i = 0; i < 5; i++) {
            //     if (i === 3)
            //       await sleep(2000);
            //     console.log(i);
            //   }
            // }

            // demo();

            // await

            // console.log('Taking a break...');
            //   // await sleep(3000);
            //   console.log('Two seconds later, showing sleep in a loop...');
            // for(let i = 0 ; i<20; i++){
            //   if(self.micStatus !== "call is in progress"){
            //     console.log(self.micStatus)
            //     session = ua.call('sip:test_64qyqw@192.168.4.100', options);
            //   await sleep(1000)
            //   }

            // }
            // // session.on('connecting', async function(e){ console.log('asdasd'); alert('connecting');});
            // session.on('connecting', async function(e){ await sleep(3000);});
            // // session.on('connecting', function(e){ console.log(e)});
            // session.on('connecting', function(e){ setInterval(function(){self.micStatus = 'connecting...'},2000)
            // });
            // session.on('progress', function(e){
            // self.placedCall = true;
            //     self.micStatus = 'call is in progress'

            //  });
            // session.on('failed', function(e){ alert('failed');console.log(e)});
            // session.on('started', function(e){ alert('started'); });

            console.log(session);
          } catch (error) {
            console.log(error);
          }

          self.isConnected = calling.connect();
          // self.micStatus= "connected"
        }
      } catch (error) {
        // alert(error);
      }
    }
  },
  mounted() {
    let self = this;

    function waitDeviceReady() {
      // monitor network...

      // alert("mounted");
      // alert(navigator.connection)
      // let tmp = navigator.connection
      try {
        // for(let i in tmp)alert(i)

        calling.addListeners(
          function() {
            SpinnerPlugin.activityStart(
              `Waiting for wifi connection`,
              spinnerOptions
            );
          },
          function() {
            let tmp = navigator.connection.type;
            // alert('online')
            // alert(tmp)
            if (tmp !== "wifi") {
              SpinnerPlugin.activityStart(
                `Waiting for wifi connection`,
                spinnerOptions
              );
            } else {
              SpinnerPlugin.activityStop();

              // SpinnerPlugin.activityStart(`Looking for mic server`, spinnerOptions);
              var zeroconf = cordova.plugins.zeroconf;
              zeroconf.registerAddressFamily = "ipv4"; // or 'ipv6' ('any' by default)
              zeroconf.watchAddressFamily = "ipv4"; // or 'ipv6' ('any' by default)
              // zeroconf.getHostname(function success(hostname){
              //     console.log(hostname);
              //     alert(hostname)
              // });

              // zeroconf.reInit()
              zeroconf.watch("_http._tcp.", "local.", function(result) {
                var action = result.action;
                var service = result.service;
                // alert(JSON.stringify(service))
                // alert(JSON.stringify(result))
                if (action == "added") {
                  // console.log('service added', service);
                  // alert('service added'+ JSON.stringify(service))
                } else if (action == "resolved") {
                  // console.log('service resolved', service);
                  // alert('service resolved'+ JSON.stringify(service));
                  let name = service.name;
                  if (service.name === "csybot-pa") {
                    let ip = service.ipv4Addresses[0];
                    let txtRecord = service.txtRecord;
                    let hostname = txtRecord.host;

                    // alert(ip+hostname);
                    // alert(hostname);
                    self.uri = self.IP = ip;
                    SpinnerPlugin.activityStop();
                    files.openFile(async function(err, datas) {
                      // alert(datas);
                      if (err || datas === undefined) {
                        let fields = {
                          microphone: self.microphone,
                          IP: self.IP,
                          port: self.port,
                          uri: self.uri,
                          protocol: self.protocol
                        };
                        files.createDirectory(function(err) {
                          if (err) {
                          } else
                            files.writeFile(
                              function() {},
                              JSON.stringify({
                                fields
                              }),
                              "/index.json"
                            );
                        }, "/");
                      } else {
                        // alert(datas)
                        datas = JSON.parse(datas);
                        self.microphone = datas.microphone;
                        // self.IP = datas.IP;
                        self.port = datas.port;
                        // self.uri = datas.uri;
                        self.protocol = datas.protocol;
                        // let IP = await calling.resolveIP(self.IP);
                        // self.IP = IP;
                        self.uri = self.IP;
                        self.server = `${self.protocol}://${self.IP}:${
                          self.port
                        }`;
                        let tmp = states.getState();
                        tmp["port"] = self.port;
                        tmp["IP"] = self.IP;
                        tmp["protocol"] = self.protocol;
                        tmp["microphone"] = self.microphone;
                        states.setState(tmp);
                        // alert(IP)
                        // alert(self.server)
                        // alert(self.uri)
                      }
                    }, "index.json");
                  }
                  /* service : {
        'domain' : 'local.',
        'type' : '_http._tcp.',
        'name': 'Becvert\'s iPad',
        'port' : 80,
        'hostname' : 'ipad-of-becvert.local',
        'ipv4Addresses' : [ '192.168.1.125' ], 
        'ipv6Addresses' : [ '2001:0:5ef5:79fb:10cb:1dbf:3f57:feb0' ],
        'txtRecord' : {
            'foo' : 'bar'
        } */
                } else {
                  console.log("service removed", service);
                  ls;
                }
              });
            }
          }
        );
      } catch (error) {
        // alert(error)
        setTimeout(function() {
          waitDeviceReady(), 500;
        });
      }
      // // SpinnerPlugin.activityStart(`Looking for mic server`, spinnerOptions);
      // var zeroconf = cordova.plugins.zeroconf;
      // zeroconf.registerAddressFamily = "ipv4"; // or 'ipv6' ('any' by default)
      // zeroconf.watchAddressFamily = "ipv4"; // or 'ipv6' ('any' by default)
      // // zeroconf.getHostname(function success(hostname){
      // //     console.log(hostname);
      // //     alert(hostname)
      // // });

      // // zeroconf.reInit()
      // zeroconf.watch("_http._tcp.", "local.", function(result) {
      //   var action = result.action;
      //   var service = result.service;
      //   // alert(JSON.stringify(service))
      //   // alert(JSON.stringify(result))
      //   if (action == "added") {
      //     // console.log('service added', service);
      //     // alert('service added'+ JSON.stringify(service))
      //   } else if (action == "resolved") {
      //     // console.log('service resolved', service);
      //     // alert('service resolved'+ JSON.stringify(service));
      //     let name = service.name;
      //     if (service.name === "csybot-pa") {
      //       let ip = service.ipv4Addresses[0];
      //       let txtRecord = service.txtRecord;
      //       let hostname = txtRecord.host;

      //       alert(ip);
      //       alert(hostname);
      //       SpinnerPlugin.activityStop();
      //     }
      //     /* service : {
      //     'domain' : 'local.',
      //     'type' : '_http._tcp.',
      //     'name': 'Becvert\'s iPad',
      //     'port' : 80,
      //     'hostname' : 'ipad-of-becvert.local',
      //     'ipv4Addresses' : [ '192.168.1.125' ],
      //     'ipv6Addresses' : [ '2001:0:5ef5:79fb:10cb:1dbf:3f57:feb0' ],
      //     'txtRecord' : {
      //         'foo' : 'bar'
      //     } */
      //   } else {
      //     console.log("service removed", service);
      //   }
      // });

      // files.openFile(async function(err, datas) {
      //   alert(datas);
      //   if (err || datas === undefined) {
      //     let fields = {
      //       microphone: self.microphone,
      //       IP: self.IP,
      //       port: self.port,
      //       uri: self.uri,
      //       protocol: self.protocol
      //     };
      //     files.createDirectory(function(err) {
      //       if (err) {
      //       } else
      //         files.writeFile(
      //           function() {},
      //           JSON.stringify({
      //             fields
      //           }),
      //           "/index.json"
      //         );
      //     }, "/");
      //   } else {
      //     // alert(datas)
      //     datas = JSON.parse(datas);
      //     self.microphone = datas.microphone;
      //     self.IP = datas.IP;
      //     self.port = datas.port;
      //     self.uri = datas.uri;
      //     self.protocol = datas.protocol;
      //     let IP = await calling.resolveIP(self.IP);
      //     self.IP = IP;
      //     self.uri = IP;
      //     self.server = `${self.protocol}://${self.IP}:${self.port}`;
      //     // alert(IP)
      //     // alert(self.server)
      //     // alert(self.uri)
      //   }
      // }, "index.json");
    }
    waitDeviceReady();
  },
  computed: {
    iconButtonType() {
      // alert('computing')

      let buttonType = calling.getState("oncall") ? "mic" : "pause";

      // alert(buttonType)
      // return buttonType;
      return "mic";
    },
    // isPlaying() {
    //   let micStatus = calling.getState("oncall") ? false : false;
    //   return micStatus;
    // },
    iconButtonType1() {
      return "mic";
    },
    iconButtonType2() {
      return "download";
    },
    iconButtonType3() {
      return "play";
    },
    iconButtonType4() {
      return "save";
    },
    iconButtonType5() {
      return "stop";
    },
    iconButtonType6() {
      return "volume";
    }
    // recordedTime() {
    //   if (this.time && this.recorder.duration >= this.time * 60) {
    //     this.stopRecorder();
    //   }
    //   return convertTimeMMSS(this.recorder.duration);
    // },
    // volume() {
    //   return parseFloat(this.recorder.volume);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
