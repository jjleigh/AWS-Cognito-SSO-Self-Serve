<template>
  <v-container>
    <div class="mb-30">
      <div class="mb-30">
        <span class="font-weight-bold">Enabled Identity Providers</span>
      </div>
      <div>
        <div>
          <v-checkbox
            v-model="selectAll"
            label="Select All"
            :indeterminate="isIndeterminate"
            @click="toggleSelectAll"
          ></v-checkbox>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
  export default {
    name: 'EnableIndentityProvider',
    props: ['userpoolClient'],
    methods: {
      updateClient(identityProvider) {
        this.$emit('updateProvider', identityProvider);
      },
      isActive(providerName) {
        return this.userpoolClient.supportedIdentityProviders.includes(providerName);
      },
      allProvidersActive() {
        return this.userpoolClient.allowedIdentityProviders.every(provider => provider.checked);
      },
      onChangeCheckbox(event, provider) {
        if (event.target.checked) {
          this.selectedProviders.push(provider);
        } else {
          this.selectedProviders.splice(this.selectedProviders.indexOf(provider), 1);
        }
      },
      toggleSelectAll() {
        const updatedClient = { ...this.userpoolClient };
        if (this.allProvidersActive()) {
          updatedClient.allowedIdentityProviders.forEach(provider => {
            provider.checked = false;
          });
          this.selectedProviders = [];
        } else {
          updatedClient.allowedIdentityProviders.forEach(provider => {
            provider.checked = true;
            if (!this.selectedProviders.includes(provider.name)) {
              this.selectedProviders.push(provider.name);
            }
          });
        }
        this.$emit('updateProvider', updatedClient);
      },
    }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  