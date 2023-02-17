<template>
  <v-app>
    <v-app-bar color="indigo-darken-3" dense dark>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link
        id="home-link"
        to="/"
      >Home</router-link>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
    >
      <v-list>
        <router-link
          class="nav-link"
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item :title="item.title" />
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Settings', to: {path: '/settings'}}
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
.nav-link {
  cursor: pointer;
  color: black;
  text-decoration: none;
}

#home-link {
  cursor: pointer;
  color: white;
  text-decoration: none;
  margin-left: 30px;
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
