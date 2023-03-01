<template>
  <v-container class="mb-12" :style="{ background: '#f2f2f2' }">
    <div class="mb-14">
      <span class="text-h5 page-title">Service Provider Details</span>
    </div>
    <div>
      <div class="mb-8 text-left entity-id">
        <span class="font-weight-bold mr-8">Entity ID: </span>
        <span class="ml-8">{{entityId}}</span>
        <span class="ml-8 copy-entity-id copy-text"  @click="copyText(entityId)"><v-icon class="mdi mdi-content-copy content-copy" aria-hidden="true"></v-icon></span>
      </div>

      <div class="mb-8 text-left acs-url">
        <span class="font-weight-bold mr-8">ACS URL: </span>
        <span class="ml-8">{{acsURL}}</span>
        <span class="ml-8 copy-acs-url copy-text" @click="copyText(acsURL)"><v-icon class="mdi mdi-content-copy content-copy" aria-hidden="true"></v-icon></span>
      </div>
    </div>
  </v-container>
</template>
  
  <script>
  export default {
    name: 'ServiceProviderDetails',
    props: ['entityId', 'acsURL'],
    methods: {
      async copyText(myText) {
        try {
          await navigator.clipboard.writeText(myText);
          // this.$toastr.success(`copied`)
        } catch($e) {
          // this.$toastr.error(`failed to copy`)
        }
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .page-title {
    color: #3c3c3c;
  }

  .copy-text {
    cursor: pointer;
  }
  </style>
  