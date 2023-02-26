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
            @change="toggleSelectAll"
          ></v-checkbox>
          <form @submit.prevent="updateClient">
            <div class="mr-25" v-for="provider in configuredProviders" :key="provider" style="display: inline-block">
              <v-checkbox
              :value="isSelected(provider)"
              :label="provider !== 'COGNITO' ? provider : ' and Password'"
              @change="onChange($event, provider)"
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
      }
    },
    methods: {
      updateClient() {
        let client = { SupportedIdentityProviders: this.selectedProviders };
        this.$emit('updateClient', client);
      },
      allProvidersActive() {
        let configureddIdentityProviders = this.configuredProviders.sort();
        let enabledIdentityProviders = this.selectedProviders.sort()

        return configureddIdentityProviders.every((provider, index) => provider === enabledIdentityProviders[index]);
      },
      onChange(event, provider) {
        if (event.target.checked) {
          this.selectedProviders.push(provider);
        } else {
          this.selectedProviders.splice(this.selectedProviders.indexOf(provider), 1);
        }
      },
      toggleSelectAll() {
        if (this.allProvidersActive()) {
          this.selectAll = true;
        } else {
          this.selectAll = false;
        }
      },
    },
    async mounted() {
      console.log('userpoolClient', this.userpoolClient);
      
      this.configuredProviders = [...this.userpoolClient.configuredIdentityProviders];
      this.configuredProviders.push("COGNITO");

      this.selectedProviders = [...this.userpoolClient.enabledIdentityProviders];
      this.selectAll = this.allProvidersActive();

      console.log('configuredProviders', this.configuredProviders);
      console.log('selectedProviders', this.selectedProviders);

      // await this.fetchUserpoolClient();
    }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  