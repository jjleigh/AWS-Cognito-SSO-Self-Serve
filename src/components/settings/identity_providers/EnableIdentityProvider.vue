<template>
  <v-container>
    <div class="mb-30">
      <div class="mb-30">
        <span class="font-weight-bold">Enabled Identity Providers</span>
      </div>
      <div>
        <div style="display: inline-block" class="checkbox-container">
          <v-checkbox
            label="Select All"
            v-model="allSelected"
            @change="toggleSelectAll"
            class="enable-provider-checkbox select-all-checkbox"
          ></v-checkbox>
          <form @submit.prevent="updateClient">
            <div class="mr-25" v-for="provider in configuredProviders" :key="provider" style="display: inline-block">
              <v-checkbox
              :data-test="`${provider}`"
              :value="provider"
              v-model="selectedProviders"
              :checked="isSelected(provider)"
              class="enable-provider-checkbox"
              :class="{ [`${provider}`]: true }"
              :label="provider !== 'COGNITO' ? provider : 'Email and Password'"
              >
              </v-checkbox>
            </div>
            <div>
              <v-btn
                class="me-4"
                color="info"
                type="submit"
              >
                Update Client
              </v-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
  export default {
    name: 'EnableIndentityProvider',
    props: ['userpoolClient'],
    data: () => ({
      configuredProviders: [],
      selectedProviders: []
    }),
    watch: {
      selectedProviders: function(newSelectedProviders) {
        if (newSelectedProviders.length === this.configuredProviders.length) {
          this.allSelected = true;
        } else {
          this.allSelected = false;
        }
      }
    },
    computed: {
      isSelected() {
        return (provider) => {
          return this.selectedProviders.includes(provider);
        };
      },
      allSelected() {
        return this.configuredProviders.length === this.selectedProviders.length;
      },
    },
    methods: {
      updateClient() {
        let client = { SupportedIdentityProviders: this.selectedProviders };
        this.$emit('updateClient', client);
      },
      toggleSelectAll(event) {
        if(event.target.checked) {
          this.selectedProviders = [...this.configuredProviders];
        } else {
          this.selectedProviders = [];
        }
      },
    },
    async mounted() {
      this.configuredProviders = [...this.userpoolClient.configuredIdentityProviders];
      this.configuredProviders.push("COGNITO");

      this.selectedProviders = [...this.userpoolClient.enabledIdentityProviders];
    }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  