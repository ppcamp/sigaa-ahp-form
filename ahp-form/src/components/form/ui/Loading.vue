<!-- UI: Loading (Sending informations) -->

<template>
  <v-dialog v-model="loading" persistent width="35em">
    <v-card class="pa-5 text-center">
      <v-progress-circular
        :size="50"
        color="primary"
        class="mr-5"
        indeterminate
      ></v-progress-circular>
      <span class="overline"
        >Enviando as informações para os pesquisadores</span
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UiLoading',
  props: {
    loading: { type: Boolean }
  }
}
</script>

<style>

</style>