<!-- UI: Error when send email -->

<template>
  <v-dialog v-model="show" persistent width="35em">
    <v-card class="pa-5 text-center">
      <h3 class="pa-2">
        <v-btn class="px-0" text color="error" @click="reset"> Fechar </v-btn>
        <br />
        <br />
        <v-icon size="2em" class="pr-5" color="red">
          mdi-alert-decagram
        </v-icon>
        Houve um erro ao enviar as informações
        <br />
        <br />
        <p align="justify" class="caption text--darken-2 grey--text">
          * Por favor entre em contato com os pesquisadores para avisá-los
          sobre este problema.
          <strong>
            <span class="error--text">
              Erro: {{ reason }}
            </span>
          </strong>
        </p>
      </h3>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name:'UiErrorOnSend',
  props: {
    show: { type: Boolean },
    reset: { type: Function },
    reason: { type: String }
  }
}
</script>
