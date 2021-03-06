<!-- UI for inconsistent response -->

<template>
  <v-row justify="center">
    <v-alert
      prominent
      type="error"
      :value="show"
      border="top"
      transition="scale-transition"
      class="pa-5"
    >
      <v-row align="center">
        <v-col cols=11 class="grow text-center">
          Existe um pouco de inconsistência nas respostas apresentadas nesta seção.
          Gostaria de retificar alguma resposta? <span class="emoji"/>
        </v-col>
        <v-col
          cols=1
          align-self="center"
          title="Índice de consistência. Calculado a cada modificação para esta seção. Para ser considerado consistente, deve ser abaixo de 0.1"
          class="riPercentage"
        >
          <p class="text-center mb-0 text-overline">IC</p>
          <p class="text-right text-h5">
            {{ ciIndex }}
          </p>
        </v-col>
      </v-row>
    </v-alert>
  </v-row>
</template>

<script>

export default {
  name: 'UiSectionError',
  props: {
    show: { type: Boolean },
    percentage: { type: String },
    ciIndex: { type: Number }
  }
}

</script>

<style scoped>
  .emoji::after {
    content: "😔";
    font-size:1.2em
  }
  .riPercentage:hover {
    cursor: help;
  }
</style>