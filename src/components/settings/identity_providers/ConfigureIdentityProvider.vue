<template>
  <v-container>
    <div class="mb-12">
      <span class="font-weight-bold">Configure Identity Provider</span>
    </div>
    <div>
      <form @submit.prevent="createProvider">
        <v-text-field
          v-model="identityProvier.providerName"
          label="Provider Name"
        ></v-text-field>
        <v-select
          v-model="identityProvier.providerType"
          :items="providerTypes"
          label="Select Provider Type"
        ></v-select>
        <v-file-input
          class="mb-6"
          accept="image/*"
          v-model="identityProvier.metadataFile"
          label="Metadata document"
        ></v-file-input>
        <span>------- Or -------</span>
        <v-text-field
          class="mt-6"
          v-model="identityProvier.metadataURL"
          label="Metadata URL"
        ></v-text-field>
        <v-btn
          class="me-4"
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
    name: 'HomeScreen',
    data() {
      return {
        providerTypes: ['SAML'],
        identityProvier: {
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
      createProvider(identityProvier) {
        this.$emit('createProvider', identityProvier);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
