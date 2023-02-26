<template>
    <v-main>
        <div class="contents white-bg p-40">
            <v-table>
                <thead>
                    <tr>
                        <th class="pl-20 username">Username</th>
                        <th class="enabled">Enabled</th>
                        <th class="account-status">Account Status</th>
                        <th class="updated">Updated</th>
                        <th class="created">Created</th>
                    </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(user, index) in users" 
                    :key="index"
                >
                    <td class="text-left text-primary indicator user-listing-username" @click="toggleUserDisplay(user.Username)">{{user.Username}}</td>
                    <td class="text-left user-listing-enabled">{{user.Enabled}}</td>
                    <td class="text-left user-listing-account-status">{{user.UserStatus}}</td>
                    <td class="text-left user-listing-updated">{{user.UserLastModifiedDate}}</td>
                    <td class="text-left user-listing-created">{{user.UserCreateDate}}</td>
                </tr>
                </tbody>
            </v-table>
        </div>
    </v-main>
</template>
  
<script>
export default {
    name: 'UserListing',
    props: ['users'],
    methods: {
        toggleUserDisplay(username) {
            this.$emit('toggleUserDisplay', username);
        }
    }
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.indicator {
    cursor: pointer;
}
</style>
  