<template>
    <v-card class="pa-6">
      <div class="users-tab-container">
        <UserListing 
          :users="users" 
          @toggleUserDisplay="handleToggleUserDisplay"
          v-show="!user.Username"
        />
        <UserDetails
          :user="user" 
          @toggleUserDisplay="handleToggleUserDisplay"
          v-show="user.Username"
        />
      </div>
    </v-card>
  </template>
  
  <script>
  import UserListing from './UserListing'
  import UserDetails from './UserDetails'
  // import {
  //   disableUser,
  //   enableUser,
  //   //   getUser,
  //   //   listUsers,
  // } from '../../../services/AWSCognitoService.js';

  export default {
    name: 'UsersTab',
    components: {
      UserListing,
      UserDetails
    },
    data: function() {
      return {
        users: [],
        user: {
          Username: null,
          UserStatus: null,
          Email: null,
          Enabled: null,
          UserCreateDate: null,
          UserLastModifiedDate: null,
        },
      }
    },
    methods: {
      async handleToggleUserDisplay(username) {
        console.log('username', username)
        if (this.user.Username) {
          this.user = {
            Username: null,
            UserStatus: null,
            Email: null,
            Enabled: null,
            UserCreateDate: null,
            UserLastModifiedDate: null,
          };
          this.selectedUser = false;
        } else {
          // const results = await getUser(this.userpoolId, username, this.region);
          // this.user = {
          //   Username: results.Username,
          //   UserStatus: results.UserStatus,
          //   Email: results.UserAttributes.find(atr => atr.Name === 'email').Value,
          //   Enabled: results.Enabled,
          //   UserCreateDate: results.UserCreateDate,
          //   UserLastModifiedDate: results.UserLastModifiedDate,
          // };

          this.user = {
            Username: 'Jane_Doe',
            UserStatus: 'EXTERNAL',
            Email: 'jane_doe@example.com',
            Enabled: true,
            UserCreateDate: 'today',
            UserLastModifiedDate: 'today',
          }

          this.selectedUser = true;
        }
      },
      async fetchUsers() {
        // const results = await listUsers(this.userpoolId, this.region);
        // this.users = results.Users;
        console.log('fetchUsers');
        this.users = [
          {
            Username: 'Jane_Doe',
            UserStatus: 'EXTERNAL',
            Email: 'jane_doe@example.com',
            Enabled: true,
            UserCreateDate: 'today',
            UserLastModifiedDate: 'today',
          },
          {
            Username: 'Jessica_Rabbit',
            UserStatus: 'EXTERNAL',
            Email: 'jessica_rabbit@example.com',
            Enabled: true,
            UserCreateDate: 'today',
            UserLastModifiedDate: 'today',
          },
          {
            Username: 'Roger_Rabbit',
            UserStatus: 'EXTERNAL',
            Email: 'roger_rabbit@example.com',
            Enabled: true,
            UserCreateDate: 'today',
            UserLastModifiedDate: 'today',
          }
        ]
      },
      // async handleDisableUser() {
      //   await disableUser(
      //     this.userpoolId, 
      //     this.user.Username, 
      //     this.region
      //   ).then(resp => {
      //     console.log('resp', resp);
      //     // this.$toastr.success(`User ${this.user.Username} successfully disabled`, resp);
      //   }).catch(e => {
      //     console.log('e', e);
      //     // this.$toastr.error(`User ${this.user.Username} failed to disable: `, e);
      //   });
      //   this.user = {
      //     ...this.user,
      //     Enabled: false,
      //   };
      // },
      // async handleEnableUser() {
      //   await enableUser(
      //     this.userpoolId, 
      //     this.user.Username, 
      //     this.region
      //   ).then(resp => {
      //     // this.$toastr.success(`User ${this.user.Username} successfully enabled`, resp);
      //     console.log('resp', resp);
      //   }).catch(e => {
      //     // this.$toastr.error(`User ${this.user.Username} failed to enable: `, e);
      //     console.log('e', e);
      //   });
      //   this.user = {
      //     ...this.user,
      //     Enabled: true,
      //   };
      // },
    },
    async mounted() {
      console.log('UsersTab mounted');
      await this.fetchUsers();
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .users-tab-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
 </style>
  