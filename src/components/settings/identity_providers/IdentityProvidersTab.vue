<template>
  <v-card class="pa-6">
    <div class="idp-tab-container">
      <ConfigureIdentityProvider class="mt-8 mb-8" @createProvider="handleCreateProvider"></ConfigureIdentityProvider>
      <v-divider></v-divider>
      <EnableIdentityProvider
        class="mt-8 mb-8"
        :userpoolClient="userpoolClient" 
        @updateClient="handleUpdateClient"
      ></EnableIdentityProvider>
      <v-divider></v-divider>
      <IdentityProviderListing
        class="mt-8 mb-8"
        :identityProviders="identityProviders" 
        @deleteProvider="handleDeleteProvider"
        @toggleEditMode="handleToggleEditMode"
        v-show="!editProviderMode"
      ></IdentityProviderListing>
      <EditIdentityProvider 
        v-show="editProviderMode"
        :identityProvider="identityProvider"
        @updatelProvider="handleUpdateProvider"
        @toggleEditMode="handleToggleEditMode"
      ></EditIdentityProvider>
    </div>
  </v-card>
</template>
  
  <script>
  import IdentityProviderListing from './IdentityProviderListing'
  import ConfigureIdentityProvider from './ConfigureIdentityProvider'
  import EnableIdentityProvider from './EnableIdentityProvider'
  import EditIdentityProvider from './EditIdentityProvider'

  import {
    // getIdentityProvider,
    createIdentityProvider,
    deleteIdentityProvider,
    updateIdentityProvider,
    updateUserpoolClient,
    // listIdentityProviders
    // getUserpoolClient,
  } from '../../../services/AWSCognitoService.js';
export default {
  name: 'IdentityProvidersTab',
  components: {
    IdentityProviderListing,
    ConfigureIdentityProvider,
    EnableIdentityProvider,
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
        configureddIdentityProviders: [],
        enabledIdentityProviders: []
      },
    }
  },
  methods: {
    setproviderToDelete(providerName = '') {
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
      } else {
        this.identityProvider = {
          providerName: undefined,
          providerType: undefined,
          providerDetails: {
            metadataFile: undefined,
            metadataURL: undefined
          }
        }
      }
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
        this.$toastr.success(`Identity Provier ${providerName} successfully deleted`, resp);
        this.identityProviders = this.identityProviders.filter(item => item.ProviderName !== providerName);
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
        this.$toastr.success(`Identity Provider ${this.identityProvider.providerName} successfully updated`, resp);
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
        this.$toastr.success('Client successfully updated', resp);
      }).catch(e => {
        this.$toastr.error('Client failed to update: ', e);
      });
    },
    async fetchUserpoolClient() {
      // const results = await getUserpoolClient(this.userpoolId, this.poolClientId, this.region);
      // this.userpoolClient.supportedIdentityProviders = results.UserPoolClient.SupportedIdentityProviders;
      this.userpoolClient =  {
        configuredIdentityProviders: ['Okta', 'Azure AD', 'Ping Federate'],
        enabledIdentityProviders: ['Okta', 'Azure AD']
      }
    },
  },
  beforeMount() {
    this.fetchUserpoolClient();
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
  