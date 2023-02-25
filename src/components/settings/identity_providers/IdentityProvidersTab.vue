<template>
  <v-card class="pa-6">
    <div class="idp-tab-container">
      <ConfigureIdentityProvider class="mb-6" @createProvider="handleCreateProvider"></ConfigureIdentityProvider>
      <v-divider></v-divider>
      <!-- <EnableIdentityProvider 
        :userpoolClient="userpoolClient" 
        @update:userpoolClient="userpoolClient = $event"
      ></EnableIdentityProvider> -->
      <v-divider></v-divider>
      <IdentityProviderListing
        class="mt-6"
        :identityProviders="identityProviders" 
        @deleteProvider="handleDeleteProvider"
        @toggleEditMode="handleToggleEditMode"
        v-show="!editProviderMode"
      ></IdentityProviderListing>
      <EditIdentityProvider 
        v-show="editProviderMode"
        :identityProvider="identityProvider"
        @toggleEditMode="handleToggleEditMode"
      ></EditIdentityProvider>
    </div>
  </v-card>
</template>
  
  <script>
  import * as R from 'ramda';
  import IdentityProviderListing from './IdentityProviderListing'
  import ConfigureIdentityProvider from './ConfigureIdentityProvider'
  // import EnableIdentityProvider from './EnableIdentityProvider'
  import EditIdentityProvider from './EditIdentityProvider'

  import {
    // getIdentityProvider,
    createIdentityProvider,
    deleteIdentityProvider,
    updateIdentityProvider,
    updateUserpoolClient,
    getUserpoolClient,
  } from '../../../services/AWSCognitoService.js';
  // import {
  //   getIdentityProvider,
  //   listIdentityProviders,
  //   createIdentityProvider,
  //   deleteIdentityProvider,
  //   updateIdentityProvider,
  //   updateUserpoolClient,
  //   getUserpoolClient,
  // } from '../../../services/AWSCognitoService.js';

export default {
  name: 'IdentityProvidersTab',
  components: {
    IdentityProviderListing,
    ConfigureIdentityProvider,
    // EnableIdentityProvider,
    EditIdentityProvider
  },
  data: function() {
    return {
      identityProviders: [],
      editProviderMode: false,
      identityProvider: {
        providerName: undefined,
        providerType: '',
        providerDetails: {
          metadataFile: undefined,
          metadataURL: undefined
        },
      },
      userpoolClient: {
        supportedIdentityProviders: [],
        allowedIdentityProviders: []
      },
    }
  },
  methods: {
    allProvidersActive() {
      const allowedIdentityProviders = new Set(this.userpoolClient.allowedIdentityProviders)
      const supportedIdentityProviders =  new Set(this.userpoolClient.supportedIdentityProviders)
      const allSupported = R.equals(allowedIdentityProviders, supportedIdentityProviders);
      return allSupported;
    },
    onChangeCheckbox(e, providerName) {
      const unselected = !this.isActive(providerName);
      console.log('event', e);

      if(unselected) {
        this.userpoolClient.supportedIdentityProviders.push(providerName);
      } else {
        const update = this.userpoolClient.supportedIdentityProviders.filter(item => item !== providerName);
        this.userpoolClient.supportedIdentityProviders = update;
      }
    },
    onChangeSelectAllCheckbox(e) {
      const allSelected = this.allProvidersActive();
      console.log('event', e);
      if(allSelected) {
        this.userpoolClient.supportedIdentityProviders = [];
      } else {
        this.userpoolClient.supportedIdentityProviders = this.userpoolClient.allowedIdentityProviders;
      }
    },
    setproviderToDelete(providerName = '') {
      console.log('providerName', providerName);
      this.providerToDelete = providerName;
    },
    async handleToggleEditMode(providerName = undefined) {
      if(this.fileBlobURL) {
        URL.revokeObjectURL(this.fileBlobURL);
      }
      if (providerName) {
        // const results = await getIdentityProvider(this.userpoolId, providerName,this.region);

        // this.identityProvider.providerName = providerName;
        // this.identityProvider.providerDetails.MetadataFile = results.IdentityProvider.ProviderDetails.MetadataFile;
        // const blob = new Blob(
        //   [results.IdentityProvider.ProviderDetails.MetadataFile], 
        //   { type: 'application/xml' }
        // )
        // this.fileBlobURL = URL.createObjectURL(blob);
        // this.identityProvider.providerDetails.MetadataURL = results.IdentityProvider.ProviderDetails.MetadataURL;
        // this.identityProvider.providerType = results.IdentityProvider.ProviderType;
        // this.hasMetadataFile = results.IdentityProvider.ProviderDetails.MetadataFile ? true : false;

        this.identityProvider = {
          providerName: 'Okta',
          providerType: 'SAML',
          providerDetails: {
            metadataFile: undefined,
            metadataURL: 'https://example.com'
          },
        }
      }
      console.log('IdentityProvidersTab editProviderMode', this.editProviderMode)
      this.editProviderMode = !this.editProviderMode;
    },
    onMetadataDocumentChange(e) {
      const files = e.target.files || e.dataTransfere.files;
      this.identityProvider.providerDetails.metadataFile = files[0];
    },
    async fetchIdentityProviders() {
      // const results = await listIdentityProviders(this.userpoolId, this.region);
      // this.identityProviders = results.Providers;

      this.identityProviders = [
        {
          providerName: 'Okta',
          providerType: 'SAML',
          providerDetails: {
            MetadataFile: '',
            MetadataURL: ''
          },
        },
        {
          providerName: 'Ping Federate',
          providerType: 'SAML',
          providerDetails: {
            MetadataFile: undefined,
            MetadataURL: undefined
          },
        },
        {
          providerName: 'Azure AD',
          providerType: 'SAML',
          providerDetails: {
            metadataFile: undefined,
            metadataURL: undefined
          },
        }
      ]
    },
    async handleCreateProvider() {
      let details;
      if(this.identityProviders.providerDetails.MetadataFile) {
        const file = await this.readFileAsync(this.identityProviders.providerDetails.MetadataFile);
        details = { 
          ...this.identityProviders.providerDetails,
          MetadataFile: file
        }
      } else {
        details = { ...this.identityProviders.providerDetails }
      }
      await createIdentityProvider(
        this.userpoolId, 
        this.identityProviders.providerName, 
        this.identityProviders.providerType, 
        details, 
        this.region
      ).then(resp => {
        this.identityProviders = [...this.identityProviders, resp.IdentityProvider];
        this.$toastr.success(`Identity Provider ${this.identityProviders.providerName} successfully created`);
      }).catch(e => {
        this.$toastr.error('Identity Provider failed to create: ', e);
      }).finally(resp => {
        this.identityProvider = {
          providerName: undefined,
          providerType: '',
          providerDetails: {
            metadataFile: undefined,
            metadataURL: undefined
          },
        }
        this.$toastr.info('finished', resp);
      });
    },
    async handleDeleteProvider(providerName) {
      await deleteIdentityProvider(
        this.userpoolId, 
        providerName, 
        this.region
      ).then(resp => {
        this.$toastr.success(`Identity Provier ${providerName} successfully deleted`);
        this.identityProviders = this.identityProviders.filter(item => item.ProviderName !== providerName);
        console.log('resp', resp);
      }).catch(e => {
        this.$toastr.error('Identity Provier ${providerName} failed to delete: ', e);
      });
    },
    async handleUpdateProvider() {
      let details;
      if(this.identityProvider.providerDetails.MetadataFile) {
        const file = await this.readFileAsync(this.identityProvider.providerDetails.MetadataFile);
        details = { 
          ...this.identityProvider.providerDetails,
          MetadataFile: file
        }
      } else {
        details = { ...this.identityProvider.providerDetails }
      }
      await updateIdentityProvider(
        this.userpoolId, 
        this.identityProvider.providerName, 
        details, 
        this.region
      ).then(resp => {
        this.$toastr.success(`Identity Provider ${this.identityProvider.providerName} successfully updated`);
        console.log('resp', resp);
      }).catch(e => {
        this.$toastr.error(`Identity Provider ${this.identityProvider.providerName} failed to update: `, e);
      });
      this.identityProvider = {
        providerName: '',
        providerType: '',
        providerDetails: {
          MetadataURL: undefined,
          MetadataFile: undefined
        },
      }
      this.toggleEditForm();
    },
    async handleUpdateClient() {
      await updateUserpoolClient(
        this.userpoolId, 
        this.poolClientId, 
        this.userpoolClient.supportedIdentityProviders,
        this.redirectUrl,
        this.ssoScope,
        this.responseType,
        this.region
      ).then(resp => {
        this.$toastr.success('Client successfully updated');
        console.log('resp', resp)
      }).catch(e => {
        this.$toastr.error('Client failed to update: ', e);
      });
    },
    async fetchUserpoolClient() {
      const results = await getUserpoolClient(this.userpoolId, this.poolClientId, this.region);
      this.userpoolClient.supportedIdentityProviders = results.UserPoolClient.SupportedIdentityProviders;
    },
  },
  async mounted() {
    await this.fetchIdentityProviders();
    // await this.fetchUserpoolClient();
    // this.userpoolClient.allowedIdentityProviders = this.identityProviders.map(idp => idp.ProviderName)
    // this.userpoolClient.allowedIdentityProviders.push("COGNITO")
  }
}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .idp-tab-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
  