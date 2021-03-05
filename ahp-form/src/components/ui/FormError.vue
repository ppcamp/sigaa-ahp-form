<!-- UI for inconsistent response -->

<template>
  <v-row justify="center">
    <v-alert
      prominent
      type="error"
      :value="show"
      border="top"
      transition="scale-transition"
    >
      <v-row align="center">
        <v-col class="grow">
          Existe um pouco de inconsistência nas respostas apresentadas nesta seção.
          Gostaria de retificar alguma resposta? <span class="emoji"/>
        </v-col>
      </v-row>
    </v-alert>
  </v-row>
</template>

<script>

export default {
  name: 'UiError',
  props: {
    show: { type: Boolean },
    percentage: { type: String },
  }
}

</script>

<style scoped>
  .emoji::after {
    content: "😔";
    font-size:1.2em
  }
</style>