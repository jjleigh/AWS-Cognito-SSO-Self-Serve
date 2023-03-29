<template>
    <v-main class="pa-6">
        <div>
            <p>This is the Admin Dashboard</p>
            <v-list>
                <router-link
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                >
                    <v-list-item :title="item.title" />
                </router-link>
            </v-list>
        </div>
        <router-view/>
    </v-main>
</template>
  
<script>
    export default {
        name: 'AdminDashboard',
        data: function() {
            return {
                items: [
                    { title: 'Onboard clients', to: {path: '/admin/onboard'}},
                    { title: 'View clients', to: {path: '/admin/clients'}}
                ],
            }
        },
        async mounted() {
            console.log('Dashboard mounted');
        }
    }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  