<template>
  <v-container justify-center fill-height fluid>
    <v-card flat max-width="70em" class="ma-5 pa-5">
      <v-card-title id="info">Motivo do questionário</v-card-title>
      <v-card-text>
        <p class="text-justify" style="text-indent: 2em">
          O objetivo deste questionário é realizar uma pesquisa com
          profissionais da área da informática, sendo esses, responsáveis por
          realizar a contratação da equipe de TI. Adicionalmente, este questionário
          também será utilizado para realizar a pesquisa com docentes da área.
        </p>
      </v-card-text>

      <v-card-title>Como funciona o questionário?</v-card-title>
      <v-card-text>
        <p class="text-justify" style="text-indent: 2em">
          O questionário utiliza o AHP -- <i>Analythic Hierarchy Process</i>,
          sendo esta, uma técnica desenvolvida por Saaty(1980) para tomada de
          decisões. A técnica pode ser utilizada para
          <b>validar as informações</b> obtidas no questionário, i.e, se as respostas
          selecionadas estão coerentes ou não.
          Caso esteja muito incoerente, será requisitado um novo preenchimento para a seção.
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
          possível o uso da ferramenta para mensurar, de maneira
          quantitativa, as diretivas propostas para o curso.
        </p>
      </v-card-text>

      <v-card-title> Notas: </v-card-title>
      <v-card-text>
        <p class="text-justify" style="text-indent: 2em">
          <v-icon>mdi-alert-circle-outline</v-icon> Nota: Os dados informados
          aqui serão enviados aos responsáveis pela pesquisa, toda e qualquer
          informação será sigilosa.
        </p>
        <p class="text-justify" style="text-indent: 2em">
          <v-icon>mdi-alert-circle-outline</v-icon>
          Nota<sup>2</sup>: Para o preenchimento do formulário, considere que a
          escala é com base no "<strong>grau de importância</strong>".
        </p>
        <p class="text-justify" style="text-indent: 2em">
          <v-icon>mdi-alert-circle-outline</v-icon>
          Nota<sup>3</sup>: <strong>O formulário irá validar as suas respostas a cada
          seção</strong>. Certifique-se de preencher de maneira mais coerente possível.
          Isso ajudará no processo de análise dos resultados.
        </p>
        <p class="text-right font-weight-bold blue-grey--text">
          Tempo estimado: 25min.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name:'Info'
};
</script>