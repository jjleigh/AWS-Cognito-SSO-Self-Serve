<template>
  <v-app>
    <v-main>
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <v-list :items="items"></v-list>
      </v-navigation-drawer>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  data: () => ({
    drawer: false,
    items: [
      { title: 'Settings' }
    ],
  }),
  watch: {
    group () {
      this.drawer = false
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
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
