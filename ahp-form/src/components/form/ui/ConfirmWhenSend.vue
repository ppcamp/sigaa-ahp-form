<template>
  <div class="text-center">
    <v-bottom-sheet v-model="show" persistent>
      <v-sheet class="text-center" height="10em">
        <v-btn class="ma-4" text color="error" @click="reset"> Fechar </v-btn>
        <h3 class="pa-2">
          <v-icon size="2em" class="pr-5" color="green">
            mdi-email-check-outline
          </v-icon>
          Informações enviadas com sucesso para os pesquisadores!
          <br/>
          <span class="text-overline">
            *Obrigado pela sua participação* <span class="emoji"/>
          </span>
        </h3>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name:"UiConfirmSent",
  props: {
    show: { type: Boolean },
    reset: { type: Function }
  }
}
</script>

<style scoped>
  .emoji::after {
    content: "😊";
    font-size:1.3em
  }
</style>