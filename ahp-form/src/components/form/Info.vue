<template>
  <v-container justify-center fill-height fluid>
    <v-card flat max-width="70em" class="ma-5 pa-5">
      <v-card-title id="info">Instruções</v-card-title>
      <v-card-text>

        <p class="text-justify">
          O objetivo deste questionário é priorizar a importância de cada
          competência esperada para um profissional formado no curso de
          Engenharia de Computação da Unifei – Itabira.
        </p>

        <p class="text-justify">
          O formulário realiza sempre comparação entre duas competências.
          Considere que a escala é baseada no "grau de importância" onde
          0 significa que as competências comparadas possuem a mesma
          importância.
        </p>

        <p class="text-justify">
          O questionário utiliza o Analythic Hierarchy Process para checar a
          índice consistência (IC)
          das repostas dos fornecidas.
          O questionário irá informar o valor do IC, sendo desejável um
          IC <span v-html="'<'"/> 0,1 para cada seção.
          Caso o seja IC <span v-html="'>'"/> 0,1 você poderá revisar suas respostas (se desejar),
          ou prosseguir respondendo o formulário e enviá-lo.
        </p>

        <p class="text-justify">
          Ao concluir, será solicitado seu nome e e-mail para contato
          apenas para controle das respostas enviadas.
          Todos as repostas e informações são sigilosas (
            apenas o pesquisador responsável terá acesso aos dados)
            e seguem as Resoluções 466/12 e 510/16 do CNS que
            versam sobre a ética em pesquisa.
        </p>

        <p class="text-justify">
          Desde já agradecemos sua participação nesta pesquisa.
        </p>

        <p class="text-right font-weight-bold primary--text text--darken-2">
          Tempo estimado: 10min.
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

<style scoped>
  p {
    text-indent: 2em
  }
</style>