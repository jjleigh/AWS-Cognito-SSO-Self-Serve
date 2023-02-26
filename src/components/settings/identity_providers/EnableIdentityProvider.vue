<template>
  <v-container>
    <div class="mb-30">
      <div class="mb-30">
        <span class="font-weight-bold">Enabled Identity Providers</span>
      </div>
      <div>
        <div style="display: inline-block">
          <v-checkbox
            v-model="selectAll"
            label="Select All"
            :checked="allProvidersSelected"
            @change="toggleSelectAll"
          ></v-checkbox>
          <form @submit.prevent="updateClient">
            <div class="mr-25" v-for="provider in configuredProviders" :key="provider" style="display: inline-block">
              <v-checkbox
              :value="provider"
              v-model="selectedProviders"
              :checked="isSelected(provider)"
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
      selectAll: false,
      configuredProviders: [],
      selectedProviders: []
    }),
    computed: {
      isSelected() {
        return (provider) => {
          return this.selectedProviders.includes(provider);
        };
      },
    },
    methods: {
      updateClient() {
        let client = { SupportedIdentityProviders: this.selectedProviders };
        this.$emit('updateClient', client);
      },
      allProvidersSelected() {
        let configuredIdentityProviders = [...this.configuredProviders].sort();
        let enabledIdentityProviders = [...this.selectedProviders].sort()
        let result = configuredIdentityProviders.every((provider, index) => provider === enabledIdentityProviders[index]);

        console.log('allProvidersSelected', result)
        return result;
      },
      toggleSelectAll() {
        console.log('toggle')
        if (this.allProvidersSelected()) {
          this.selectAll = true;
        } else {
          this.selectAll = false;
        }
      },
    },
    async mounted() {
      this.configuredProviders = [...this.userpoolClient.configuredIdentityProviders];
      this.configuredProviders.push("COGNITO");

      this.selectedProviders = [...this.userpoolClient.enabledIdentityProviders];
      this.selectAll = this.allProvidersSelected();
      console.log('mounted selectedProviders', this.selectedProviders);
      // await this.fetchUserpoolClient();
    }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  