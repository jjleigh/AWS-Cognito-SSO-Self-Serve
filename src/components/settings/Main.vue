<template>
  <v-card class="pa-6">
    <v-card-title class="text-left settings-title">
      <v-breadcrumbs>Settings</v-breadcrumbs>
    </v-card-title>
    <v-container class="mb-12">
      <div class="mb-14">
        <span class="admin-settings color_top service-provider-details-heading">Service Provider Details</span>
      </div>
      <div class="mb-30">
        <div class="table-responsive">
          <table class="table">
            <tbody>
            <tr>
              <td class="mr-20">Entity ID: </td>
              <td class="ml-70">{{entityId}}</td>
              <td class="copy-text pl-70 copy-entity-id" @click="copyText(entityId)">
                <i class="fa fa-copy" aria-hidden="true"></i>
              </td>
            </tr>
            <tr>
              <td class="mr-20">ACS URL: </td>
              <td class="ml-70">{{acsURL}}</td>
              <td class="copy-text pl-70 copy-acs" @click="copyText(acsURL)">
                <i class="fa fa-copy"></i>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </v-container>
    
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

  export default {
    name: 'SettingsPage',
    components: {
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
      async copyText(myText) {
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
  