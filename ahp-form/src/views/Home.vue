<template>
  <v-container justify-center fill-height fluid>
    <v-card flat max-width="50em" class="ma-5 pa-5">
      <v-card-title>Motivo do questionário</v-card-title>
      <v-card-text>
        <p class="text-justify" style="text-indent: 2em">
          O objetivo deste questionário é realizar uma pesquisa com
          profissionais da área da informática, sendo esses, responsáveis por
          realizar a contratação da equipe de TI.
        </p>
        <p class="text-justify" style="text-indent: 2em">
          Além disso, ele também será usado para realizar uma pesquisa com
          docentes da área,
        </p>
      </v-card-text>

      <v-card-title>Como funciona o questionário?</v-card-title>
      <v-card-text>
        <p class="text-justify" style="text-indent: 2em">
          O questionário utiliza o AHP -- <i>Analythic Hierarchy Process</i>,
          sendo esta, uma técnica desenvolvida por Saaty(1980) para tomada de
          decisões. A técnica pode ser utilizada para
          <b>validar as informações</b> obtidas no questionário, i.e., se o que
          foi selecionado está coerente, dessa forma, caso esteja muito
          incoerente, será requisitado que preencha
          <b> todo o questionário novamente</b>.
        </p>
        <p class="text-justify" style="text-indent: 2em">
          Ao concluir, será pedido um email para contato e, por fim, as
          informações serão enviadas para o email dos pesquisadores.
        </p></v-card-text
      >

      <v-card-title> O que se espera ao final do questionário? </v-card-title>
      <v-card-text>
        <p class="text-justify" style="text-indent: 2em">
          Ao final do questionário, será possível entender melhor o que os
          professores e o mercado esperam do aluno egresso, de maneira que seja
          possível o uso da ferramenta pelo MEC para mensurar, de maneira
          quantitativa, as diretivas propostas para o curso, assim como,
          elaborar uma grade curricular que esteja mais próximo do esperado pelo
          mercado.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
