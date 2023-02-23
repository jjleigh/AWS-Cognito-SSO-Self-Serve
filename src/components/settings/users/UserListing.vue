<template>
    <v-main>
        <div class="contents white-bg p-40">
            <div class="row pb-30">
                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                    <i class="fa fa-times close fs-20" @click="toggleUserDisplay(user.Username)"></i>
                </div>
            </div>
            <v-table>
                <thead>
                    <tr>
                        <th class="fs-10 pl-20 username">Username</th>
                        <th class="xs-none fs-10 enabled">Enabled</th>
                        <th class="xs-none fs-10 account-status">Account Status</th>
                        <th class="fs-10 updated">Updated</th>
                        <th class="fs-10 created">Created</th>
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
    async mounted() {
      console.log('UserTab', this.users)
    }
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.indicator {
    cursor: pointer;
}
</style>
  