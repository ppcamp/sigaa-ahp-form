<!-- UI: Agreement (modal) -->

<template>
  <v-row justify="center">
    <!-- Here we need just to bind this component, like useState([]) React approach -->
    <v-checkbox :v-model="accept" @click="swap" color="green">
      <template v-slot:label>
        <div>
          Ao clicar, você concorda com os
          <v-dialog width="600px">
            <template v-slot:activator="{ on, attrs }">
              <span
                title="Clique para visualizar os termos"
                class="primary--text"
                v-bind="attrs"
                v-on="on"
              >
                termos
              </span>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline"> Termos para concessão de dados </span>
              </v-card-title>
              <v-card-text>

                <p class="text-justify">
                  Ao clicar nesta caixa de seleção
                  <b>você estará concordando em enviar suas informações</b>
                  para os pesquisadores. Essa informação irá conter os dados
                  preenchidos nas perguntas e no formulário de
                  identificação.
                </p>

                <p class="text-justify">
                  O conteúdo deste formulário, caso seja disponibilizado
                  para o público, não irá conter os detalhes pessoais do
                  entrevistado (nome e email).
                </p>

                <p class="text-justify">
                  Por razões éticas, as respostas serão tratadas de forma agregada e confidencial,
                  preservando assim a privacidade de todos os respondentes. O site onde a pesquisa está
                  é perfeitamente seguro e utilizado tanto no meio acadêmico como por empresas.
                  As informações coletadas serão utilizadas unicamente para fins acadêmicos
                </p>

                <!--
                <p class="text-justify">
                  Salienta-se que a pesquisa foi aprovada pelo Comitê de Ética em Pesquisa
                  <span class="red--text"> XXX </span>,
                    sob protocolo <span class="red--text">YYY</span>.
                </p>
                -->

                <p class="text-justify">
                  Quanto aos possíveis riscos ou danos à sua participação, esses são considerados mínimos e
                  relacionados ao preenchimento de questionários, tais como: tomar o tempo do respondente,
                  provocar cansaço, gerar desconforto, causar sentimento de insegurança quanto à opção de
                  resposta que melhor reflete sua opinião diante das afirmativas relacionadas ao produto.
                  Sendo assim, <strong>você poderá desistir do preenchimento do questionário a qualquer momento,
                  sem penalidade alguma. </strong>
                </p>

                <p class="text-justify">
                  Durante todo o período da pesquisa, você terá a possibilidade de esclarecer qualquer dúvida
                  ou solicitar assistência. Para isso, basta entrar em contato com os pesquisadores.

                  <strong>A sua participação é livre e voluntária. Não haverá nenhuma forma de compensação financeira e,
                  também, não haverá custos para o (a) participante </strong>.
                </p>

                <p class="text-justify">
                  A sua identidade permanecerá em sigilo
                  durante toda pesquisa e, especialmente, na publicação dos resultados. Além disso, destaca-se
                  que não será identificada a organização em que o participante atua e que as informações
                  coletadas serão utilizadas unicamente para fins acadêmicos.

                  Como já citado, toda a informação possuirá identificadores aleatórios, de modo que, <strong>em
                  caso de extravio de informações, não será possível, a priori, identificar a sua origem.</strong>
                </p>

                <p class="text-justify font-weight-bold text--darken-2 primary--text">
                  Caso tenha alguma dúvida sobre o questionário, envie-nos um e-mail para: rodrigobraga@unifei.edu.br
                  Sua participação é muito importante para nós!
                </p>
              </v-card-text>
            </v-card>
          </v-dialog>
          de partipação nessa pesquisa. Seus dados pessoais não serão divuldados e estão protegidos.
        </div>
      </template>
    </v-checkbox>
  </v-row>
</template>

<script>
export default {
  name: 'FormTerms',

  props: {
    accept: { type: Boolean },
    swap: { type: Function },
  },
}
</script>

<style scoped>
  p {
    text-indent: 2em;
  }
</style>