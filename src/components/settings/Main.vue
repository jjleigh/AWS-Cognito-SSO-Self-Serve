<template>
  <v-card class="pa-6">
    <v-card-title class="text-left settings-title">
      <v-breadcrumbs>Settings</v-breadcrumbs>
    </v-card-title>
    <ServiceProviderDetails @copyText="handleCopyText" :entityId="entityId" :acsURL="acsURL"/>
    <v-tabs v-model="activeTabIndex" bg-color="transparent"
      color="blue-darken-3"
      grow
    >
      <v-tab
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :value="index"
      >
        {{ tab.title }}
      </v-tab>
    </v-tabs>

    <v-window v-model="activeTabIndex">
      <v-window-item
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :value="index"
      >
        <component :is="tab.component" />
      </v-window-item>
    </v-window>
  </v-card>
</template>
  
<script>
  import IdentityProvidersTab from './identity_providers/IdentityProvidersTab';
  import UsersTab from './users/UsersTab';
  import ServiceProviderDetails from './ServiceProviderDetails';

  export default {
    name: 'SettingsPage',
    components: {
      ServiceProviderDetails,
      IdentityProvidersTab,
      UsersTab,
    },
    
    props: {
      route: Object
    },
    data: () => ({
      drawer: false,
      activeTabIndex: 0,
      entityId: '',
      acsURL: '',
      tabs: [
        { title: 'Identity Providers', component: 'IdentityProvidersTab' },
        { title: 'Users', component: 'UsersTab' }
      ],
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
    methods: {
      async readFileAsync(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();

          reader.onload = () => {
            resolve(reader.result);
          };

          reader.onerror = reject;

          reader.readAsText(file);
        });
      },
      async handleCopyText(myText) {
        try {
          await navigator.clipboard.writeText(myText);
          this.$toastr.success(`copied`)
        } catch($e) {
          this.$toastr.error(`failed to copy`)
        }
      },
      async getUserpoolInfo() {
        this.userpoolId = 'userPoolId';
        this.entityId = `urn:amazon:cognito:sp:${this.userpoolId}`;
        this.region = 'us-east-1';
        this.poolClientId = 'userpoolClientId';
        this.responseType = 'code';
        this.redirectUrl = 'localhost:8080';
        this.ssoScope = 'email,phone,openid,profile';
        this.acsURL = `https://example.auth.us-east-1.amazoncognito.com/saml2/idpresponse`;
      },
    },
    async mounted() {
      await this.getUserpoolInfo();
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.settings-title {
  margin-bottom: 45px;
  font-family: Avenir;
}
img {
  display: inline;
}
button {
  cursor: pointer;
}
button:focus {
  outline: 0px solid transparent;
}
a {
  cursor: pointer;
}
h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
  