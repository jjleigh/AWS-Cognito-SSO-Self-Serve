<template>
    <v-main :style="{ background: '#f2f2f2' }">
        <div class="ml-12 user">
            <div>
                <div class="d-flex justify-end mr-8">
                    <v-icon class="mdi mdi-close close" aria-hidden="true" @click="toggleUserDisplay(user.Username)"></v-icon>
                </div>
            </div>
            <div >
                <div class="mb-12 text-left">
                    <v-btn variant="flat" color="info" v-show="user.Enabled" class="mr-15" @click="disableCognitoUser()">Disable user</v-btn>
                    <v-btn variant="flat" color="info" v-show="!user.Enabled" class="mr-15" @click="enableCognitoUser()">Enable user</v-btn>
                </div>
                <div class="mb-8 text-left">
                    <span class="font-weight-bold mr-8">Username</span>
                    <span class="user-details-username">{{user.Username}}</span>
                </div>
                <div class="mb-8 text-left">
                    <span class="font-weight-bold mr-8">Email</span>
                    <span class="user-details-email">{{user.Email}}</span>
                </div>
                <div class="mb-8 text-left">
                    <span class="font-weight-bold mr-8">Enabled</span>
                    <span class="user-details-enabled">{{user.Enabled}}</span>
                </div>
                <div class="mb-8 text-left">
                    <span class="font-weight-bold mr-8">Account status</span>
                    <span class="user-details-account-status">{{user.UserStatus}}</span>
                </div>
                <div class="mb-8 text-left">
                    <span class="font-weight-bold mr-8">Last Modified</span>
                    <span class="user-details-updated">{{user.UserLastModifiedDate}}</span>
                </div>
                <div class="mb-8 text-left">
                    <span class="font-weight-bold mr-8">Created</span>
                    <span class="user-details-created">{{user.UserCreateDate}}</span>
                </div>
            </div>
        </div>
    </v-main>
</template>
  
<script>
    import '@mdi/font/css/materialdesignicons.css'
    export default {
        name: 'UserDetails',
        props: ['user'],
        methods: {
            disableCognitoUser() {
                this.$emit('disableCognitoUser');
            },
            enableCognitoUser() {
                this.$emit('enableCognitoUser');
            },
            toggleUserDisplay(username) {
                this.$emit('toggleUserDisplay', username);
            }
        },
    }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
