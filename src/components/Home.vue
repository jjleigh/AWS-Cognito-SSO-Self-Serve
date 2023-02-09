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
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'HomeScreen',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
