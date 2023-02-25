<template>
  <v-container>
    <div class="mb-8">
      <span class="font-weight-bold">Identity Provider Listing</span>
    </div>
    <div class="contents white-bg p-40">
      <v-table>
        <thead>
          <tr>
            <th class="pl-20">Provider</th>
            <th >Edit</th>
            <th >Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
              v-for="(idp, index) in identityProviders" 
              :key="index"
          >
            <td class="text-left">{{idp.providerType}}:{{idp.providerName}}</td>
            <td class="text-left actions" @click="toggleEditForm(idp.providerName)">
              <v-icon class="mdi mdi-pencil pencil" aria-hidden="true"></v-icon>
            </td>
            <td class="text-left actions" @click="setproviderToDelete(idp.providerName); dialog = true">
              <v-icon class="mdi mdi-delete delete" aria-hidden="true"></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
      </div>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="auto"
        >
          <v-card>
            <v-card-text>
              Are you sure you want to delete this identity provider?
            </v-card-text>
            <v-card-actions>
              <v-btn class="ml-8 mr-8" color="info" variant="text" small @click="dialog = false">Close Dialog</v-btn>
              <v-btn class="ml-8" color="error" variant="flat" small @click="dialog = false; deleteProvider(providerToDelete)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </template>
  
<script>
  export default {
    name: 'IdentityProviderListing',
    props: ['identityProviders'],
    data() {
      return {
        dialog: false,
        providerToDelete: null,
      };
    },
    methods: {
      deleteProvider(provider) {
        this.$emit('deleteProvider', provider);
      },
      setproviderToDelete(provider) {
        this.providerToDelete = provider;
      },
    },
    async mounted() {
      console.log('IdentityProviderListing', this.identityProviders)
    }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .actions {
    cursor: pointer;
  }
  </style>
  