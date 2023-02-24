<template>
  <v-container class="mb-12" :style="{ background: '#f2f2f2' }">
    <div class="mb-14">
      <span class="text-h5">Service Provider Details</span>
    </div>
    <div>
      <div class="mb-8 text-left">
        <span class="font-weight-bold mr-8">Entity ID: </span>
        <span class="ml-8">{{entityId}}</span>
        <span class="ml-8"  @click="copyText(entityId)"><v-icon class="mdi mdi-content-copy content-copy" aria-hidden="true"></v-icon></span>
      </div>

      <div class="mb-8 text-left">
        <span class="font-weight-bold mr-8">ACS URL: </span>
        <span class="ml-8">{{acsURL}}</span>
        <span class="ml-8" @click="copyText(acsURL)"><v-icon class="mdi mdi-content-copy content-copy" aria-hidden="true"></v-icon></span>
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
        this.$emit('copyText', myText);
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  