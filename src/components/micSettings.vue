<template>
  <v-container bg grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-card>
          <v-card-text class="px-0">Settings</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-divider></v-divider>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-layout row wrap>
          <v-flex xs4>Microphone_</v-flex>
          <v-flex xs8>
            <v-text-field
              v-model="microphone"
              :rules="microphoneRules"
              label="microphone number"
              required
            ></v-text-field>
          </v-flex>
          <!-- <v-flex xs4>sip server</v-flex>
          <v-flex xs8>
            <v-text-field v-model="IP" :rules="IPRules" label="IP" required></v-text-field>
          </v-flex> -->
          <v-flex xs4>sip server</v-flex>
          <v-flex xs8>
            <v-text-field v-model="port" :rules="portRules" label="port" required></v-text-field>
          </v-flex>
          <!-- <v-flex xs4>sip server</v-flex>
          <v-flex xs8>
            <v-text-field v-model="uri" :rules="uriRules" label="uri" required></v-text-field>
          </v-flex> -->
          <v-flex xs4>protocol</v-flex>
          <v-flex xs8>
            <v-text-field v-model="protocol" :rules="protocolRules" label="wss/ws" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Save</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-layout>
  </v-container>

</template>

<script>
import files from "../services/configFiles/";
import states from "../services/states/";
let spinnerOptions = { dimBackground: true };

export default {
  data() {
    return {
      lazy: true,
      valid: true,
      microphone: "1",
      // IP: "192.168.4.100",
      port: "5061",
      // uri: "localhost.cseco.co.ke",
      protocol: "wss"
    };
  },
  components: {
  },
  methods: {
    validate() {
      let self = this;
      if (this.$refs.form.validate()) {
        let fields = {
          microphone: self.microphone,
          // IP: self.IP,
          port: self.port,
          // uri: self.uri,
          protocol: self.protocol
        };
        // alert('saving 1')
        SpinnerPlugin.activityStart(`Saving`, spinnerOptions);

        try{
        files.createDirectory(function(err) {
          if (err) {
            SpinnerPlugin.activityStart(`Error`, spinnerOptions);
          } else files.writeFile(function(err) {
            // alert('11111')
           let tmp = states.getState()
          tmp['port'] = self.port
          // tmp['IP'] = self.IP
          tmp['protocol'] = self.protocol
          tmp['microphone'] = self.microphone
          states.setState(tmp);
          // alert('saving 2')
          SpinnerPlugin.activityStop();
          }, JSON.stringify(fields), "index.json");
        }, "/");

        }catch(error){
          
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  created() {
    let self = this;
    try {
      files.openFile(function(err, datas) {
        if (err || datas === undefined) {
          let fields = {
            microphone: self.microphone,
            // IP: self.IP,
            port: self.port,
            // uri: self.uri,
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
         
        }else {
          datas = JSON.parse(datas);
          self.microphone = datas.microphone
          // self.IP = datas.IP
          self.port = datas.port
          // self.uri = datas.uri
          self.protocol = datas.protocol
         
        }
      }, "index.json");

    } catch (error) {
      alert(error);
    }
  },
  computed: {
    microphoneRules() {
      return [
        v => !!v || "microphone number is required",
        () => !isNaN(this.microphone) || "microphone number must be a number"
      ];
    },
    portRules() {
      return [
        v => !!v || "port  is required",
        () => !isNaN(this.port) || "port number must be a number"
      ];
    },
    protocolRules() {
      return [
        v => !!v || "protocol  is required",
        () =>
          this.protocol === "ws" ||
          this.protocol === "wss" ||
          "must either be ws or wss"
      ];
    },
    uriRules() {
      return [v => !!v || "uri  is required"];
    },
    IPRules() {
      let pattern = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
      return [
        v => !!v || "IP  is required",
        // () => (pattern.test(v)) || 'Please enter valid IP address'
        v  => (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(v)) || 'Please enter valid IP address'
      ];
          
    }
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



