<template>
  <v-app style="margin-top: 0px;" v-on:dblclick.native ="doubleTap()">
    <v-navigation-drawer v-model="drawer" temporary fixed  dark class="indigo" style="margin-top: 48px;" height="100%">
      <v-list>
        <v-list-tile   to="/">
          <v-list-tile-action>
            <v-icon>mdi-anchor</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
         <v-divider></v-divider>
        <v-divider></v-divider>
        <v-list-tile to="/Settings">
          <v-list-tile-action>
            <v-icon>fa-gear</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile to="/About">
          <v-list-tile-action>
            <v-icon>fa-info</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar  dark style=" padding-top: 0px;" app  dense>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <icon name="align-justify"></icon>
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
       <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content style="padding: 0px 0px 0px 0px;margin-top: 48px;">
      <v-fade-transition mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>
<script>

export default {
  data () {
    return {
      drawer: false,
      fullscreen:false
    }
  },
  watch: {

  },

  created () {
    
  },
  methods: {
   
    doubleTap(){
      this.fullscreen ^= true
      if(this.fullscreen)
        StatusBar.hide()
      else StatusBar.show()
    }
  } ,
  watch: {
    $route (to, from){
      let self = this
      
    },
  }
}
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="stylus">
  @import './assets/css/style.css';
  @import './assets/css/material.css';
  @import './assets/css/4.7.0-font-awesome.min.css';
  
</style>
