<template>
  <v-container>
    <div class="mb-12">
      <span class="font-weight-bold">Configure Identity Provider</span>
    </div>
    <div>
      <form @submit.prevent="createProvider">
        <v-text-field
          v-model="identityProvider.providerName"
          label="Provider Name"
          class="provider-name"
        ></v-text-field>
        <v-select
          v-model="identityProvider.providerType"
          :items="providerTypes"
          label="Select Provider Type"
          class="provider-type"
        ></v-select>
        <v-file-input
          class="mb-6 metadata-file"
          accept="image/*"
          v-model="identityProvider.metadataFile"
          label="Metadata document"
        ></v-file-input>
        <span>------- Or -------</span>
        <v-text-field
          class="mt-6 metadata-url"
          v-model="identityProvider.metadataURL"
          label="Metadata URL"
        ></v-text-field>
        <v-btn
          class="me-4 submit-button"
          color="info"
          type="submit"
        >
          submit
        </v-btn>
      </form>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'ConfigureIdentityProvider',
    data() {
      return {
        providerTypes: ['SAML'],
        identityProvider: {
          providerName: undefined,
          providerType: '',
          providerDetails: {
            metadataFile: undefined,
            metadataURL: undefined
          },
        },
      };
    },
    methods: {
      createProvider() {
        this.$emit('createProvider', this.identityProvider);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
