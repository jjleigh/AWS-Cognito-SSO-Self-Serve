<template>
  <v-container>
    <div class="mb-12">
      <span class="font-weight-bold">Edit Identity Provider</span>
    </div>
    <div>
      <form @submit.prevent="updateProvider">
        <v-text-field
          v-model="form.identityProvider.providerName"
          label="Provider Name"
          class="provider-name"
          readonly
        ></v-text-field>
        <v-text-field
          v-model="form.identityProvider.providerType"
          label="Provider Type"
          class="provider-type"
          readonly
        ></v-text-field>
        <v-file-input
          class="mb-6 metadata-file"
          accept="image/*"
          v-model="form.identityProvider.metadataFile"
          label="Metadata document"
        ></v-file-input>
        <span>------- Or -------</span>
        <v-text-field
          class="mt-6 metadata-url"
          v-model="form.identityProvider.metadataURL"
          label="Metadata URL"
        ></v-text-field>
        <v-btn
          class="me-4 cancel-button"
          type="flat"
          @click="toggleEditMode()"
        >
          Cancel
        </v-btn>
        <v-btn
          class="me-4 save-button"
          color="info"
          type="submit"
          @click="toggleEditMode()"
        >
          Update Provider
        </v-btn>
      </form>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'EditIdentityProvider',
    props: ['identityProvider'],
    data() {
      return {
        form: {
          identityProvider: Object.assign({}, this.identityProvider),
        },
      };
    },
    methods: {
      updateProvider() {
        this.$emit('updateProvider', this.form.identityProvider);
      },
      toggleEditMode() {
        this.$emit('toggleEditMode');
      },
    },
  };
</script>

<style scoped>
</style>
