<template>
  <v-form v-model="validForm" ref="form">
    <!-- 0. Root  -->
    <v-container class="py-5 my-5 px-5">
      <v-divider></v-divider>
      <!-- Title -->
      <p class="text-center display-1 my-5 pb-4" id="sec1">Visão geral</p>

      <!-- Questions -->
      <div v-for="(a, iA) in lRoot.questions" :key="a">
        <v-row
          v-for="(b, iB) in lRoot.questions.slice(iA)"
          :key="b"
          min-height=""
        >
          <v-row v-if="a != b" class="px-5">
            <v-col cols="5">
              <span class="font-weight-bold"> {{ a }} </span>
            </v-col>
            <v-col cols="2" class="text-center">
              <span class="font-weight-bold"> vs </span>
            </v-col>
            <v-col cols="5" class="text-right">
              <span class="font-weight-bold">
                {{ b }}
              </span>
            </v-col>
          </v-row>

          <!-- Sliders -->
          <v-card-text v-if="a != b">
            <v-slider
              step="1"
              :min="ahp.min"
              :max="ahp.max"
              :tick-labels="ahp.ticks"
              class="font-weight-bold text--darken-2 grey--text"
              style="font-size: 0.9em; height: 10em !important"
              color="indigo lighten-1"
              track-color="indigo lighten-1"
              v-model="lRoot.formMatrix[iA][iB + iA]"
              @change="insertIntoMatrix(iA, iB + iA, lRoot)"
            >
            </v-slider>
            <v-divider></v-divider>
          </v-card-text>
        </v-row>
      </div>

      <!-- UI: inconsistent responses -->
      <UiError :show="!lRoot.valid" />
    </v-container>


    <!-- 1. Conhecimento técnico -->
    <v-container class="py-5 my-5 px-5">
      <!-- Title -->
      <p class="text-center display-1 my-5 pb-4" id="sec2">
        Conhecimento técnico
      </p>

      <!-- Questions -->
      <div v-for="(a, iA) in l1Q1.questions" :key="a">
        <v-row
          v-for="(b, iB) in l1Q1.questions.slice(iA)"
          :key="b"
          min-height=""
        >
          <v-row v-if="a != b" class="px-5">
            <v-col cols="5">
              <span class="font-weight-bold"> {{ a }} </span>
            </v-col>
            <v-col cols="2" class="text-center">
              <span class="font-weight-bold"> vs </span>
            </v-col>
            <v-col cols="5" class="text-right">
              <span class="font-weight-bold">
                {{ b }}
              </span>
            </v-col>
          </v-row>

          <!-- Sliders -->
          <v-card-text v-if="a != b">
            <v-slider
              step="1"
              :min="ahp.min"
              :max="ahp.max"
              :tick-labels="ahp.ticks"
              class="font-weight-bold text--darken-2 grey--text"
              style="font-size: 0.9em; height: 10em !important"
              color="indigo lighten-1"
              track-color="indigo lighten-1"
              v-model="l1Q1.formMatrix[iA][iB + iA]"
              @change="insertIntoMatrix(iA, iB + iA, l1Q1)"
            >
            </v-slider>
            <v-divider></v-divider>
          </v-card-text>
        </v-row>
      </div>

      <!-- UI: inconsistent responses -->
      <UiError :show="!l1Q1.valid" />
    </v-container>

    <!-- 1.2. Conhecimento, métodos e ferramentas fundamentais de computação básica -->
    <v-container class="py-5 my-5 px-5">
      <!-- Title -->
      <p class="text-center display-1 my-5 pb-4" id="sec3">
        Conhecimento, métodos e ferramentas fundamentais de computação básica
      </p>

      <!-- Questions -->
      <div v-for="(a, iA) in l2Q1S2.questions" :key="a">
        <v-row
          v-for="(b, iB) in l2Q1S2.questions.slice(iA)"
          :key="b"
          min-height=""
        >
          <v-row v-if="a != b" class="px-5">
            <v-col cols="5">
              <span class="font-weight-bold"> {{ a }} </span>
            </v-col>
            <v-col cols="2" class="text-center">
              <span class="font-weight-bold"> vs </span>
            </v-col>
            <v-col cols="5" class="text-right">
              <span class="font-weight-bold">
                {{ b }}
              </span>
            </v-col>
          </v-row>

          <!-- Sliders -->
          <v-card-text v-if="a != b">
            <v-slider
              step="1"
              :min="ahp.min"
              :max="ahp.max"
              :tick-labels="ahp.ticks"
              class="font-weight-bold text--darken-2 grey--text"
              style="font-size: 0.9em; height: 10em !important"
              color="indigo lighten-1"
              track-color="indigo lighten-1"
              v-model="l2Q1S2.formMatrix[iA][iB + iA]"
              @change="insertIntoMatrix(iA, iB + iA, l2Q1S2)"
            >
            </v-slider>
            <v-divider></v-divider>
          </v-card-text>
        </v-row>
      </div>

      <!-- UI: inconsistent responses -->
      <UiError :show="!l2Q1S2.valid" />
    </v-container>

    <!-- 1.3. Conhecimento, métodos e ferramentas na área de sistemas de software -->
    <v-container class="py-5 my-5 px-5">
      <!-- Title -->
      <p class="text-center display-1 my-3 pb-4" id="sec4">
        Conhecimento, métodos e ferramentas na área de sistemas de software
      </p>

      <!-- Questions -->
      <div v-for="(a, iA) in l2Q1S3.questions" :key="a">
        <v-row
          v-for="(b, iB) in l2Q1S3.questions.slice(iA)"
          :key="b"
          min-height=""
        >
          <v-row v-if="a != b" class="px-5">
            <v-col cols="5">
              <span class="font-weight-bold"> {{ a }} </span>
            </v-col>
            <v-col cols="2" class="text-center">
              <span class="font-weight-bold"> vs </span>
            </v-col>
            <v-col cols="5" class="text-right">
              <span class="font-weight-bold">
                {{ b }}
              </span>
            </v-col>
          </v-row>

          <!-- Sliders -->
          <v-card-text v-if="a != b">
            <v-slider
              step="1"
              :min="ahp.min"
              :max="ahp.max"
              :tick-labels="ahp.ticks"
              class="font-weight-bold text--darken-2 grey--text"
              style="font-size: 0.9em; height: 10em !important"
              color="indigo lighten-1"
              track-color="indigo lighten-1"
              v-model="l2Q1S3.formMatrix[iA][iB + iA]"
              @change="insertIntoMatrix(iA, iB + iA, l2Q1S3)"
            >
            </v-slider>
            <v-divider></v-divider>
          </v-card-text>
        </v-row>
      </div>

      <!-- UI: inconsistent responses -->
      <UiError :show="!l2Q1S3.valid" />

    </v-container>

    <!-- 1.5. Conhecimentos básicos em sistemas de comunicação -->
    <v-container class="py-5 my-5 px-5">
      <!-- Title -->
      <p class="text-center display-1 my-3 pb-4" id="sec5">
        Conhecimentos básicos em sistemas de comunicação
      </p>

      <!-- Questions -->
      <div v-for="(a, iA) in l2Q1S5.questions" :key="a">
        <v-row
          v-for="(b, iB) in l2Q1S5.questions.slice(iA)"
          :key="b"
          min-height=""
        >
          <v-row v-if="a != b" class="px-5">
            <v-col cols="5">
              <span class="font-weight-bold"> {{ a }} </span>
            </v-col>
            <v-col cols="2" class="text-center">
              <span class="font-weight-bold"> vs </span>
            </v-col>
            <v-col cols="5" class="text-right">
              <span class="font-weight-bold">
                {{ b }}
              </span>
            </v-col>
          </v-row>

          <!-- Sliders -->
          <v-card-text v-if="a != b">
            <v-slider
              step="1"
              :min="ahp.min"
              :max="ahp.max"
              :tick-labels="ahp.ticks"
              class="font-weight-bold text--darken-2 grey--text"
              style="font-size: 0.9em; height: 10em !important"
              color="indigo lighten-1"
              track-color="indigo lighten-1"
              v-model="l2Q1S5.formMatrix[iA][iB + iA]"
            >
              <!-- As we only have 1 value, we don't need to validate it -->
              <!-- @change="insertIntoMatrix(iA, iB + iA, l2Q1S5)" -->
            </v-slider>
            <v-divider></v-divider>
          </v-card-text>
        </v-row>
      </div>

      <!-- UI: inconsistent responses -->
      <UiError :show="!l2Q1S5.valid" />

    </v-container>

    <!-- 2. Competências, habilidades e atributos pessoais e profissionais -->
    <v-container class="py-5 my-5 px-5">
      <!-- Title -->
      <p class="text-center display-1 my-3 pb-4" id="sec6">
        Competências, habilidades e atributos pessoais e profissionais
      </p>

      <!-- Questions -->
      <div v-for="(a, iA) in l1Q2.questions" :key="a">
        <v-row
          v-for="(b, iB) in l1Q2.questions.slice(iA)"
          :key="b"
          min-height=""
        >
          <v-row v-if="a != b" class="px-5">
            <v-col cols="5">
              <span class="font-weight-bold"> {{ a }} </span>
            </v-col>
            <v-col cols="2" class="text-center">
              <span class="font-weight-bold"> vs </span>
            </v-col>
            <v-col cols="5" class="text-right">
              <span class="font-weight-bold">
                {{ b }}
              </span>
            </v-col>
          </v-row>

          <!-- Sliders -->
          <v-card-text v-if="a != b">
            <v-slider
              step="1"
              :min="ahp.min"
              :max="ahp.max"
              :tick-labels="ahp.ticks"
              class="font-weight-bold text--darken-2 grey--text"
              style="font-size: 0.9em; height: 10em !important"
              color="indigo lighten-1"
              track-color="indigo lighten-1"
              v-model="l1Q2.formMatrix[iA][iB + iA]"
              @change="insertIntoMatrix(iA, iB + iA, l1Q2)"
            >
            </v-slider>
            <v-divider></v-divider>
          </v-card-text>
        </v-row>
      </div>

      <!-- UI: inconsistent responses -->
      <UiError :show="!l1Q2.valid" />
    </v-container>

    <!-- 3. Competências e habilidades interpessoais: trabalho em equipe e comunicação -->
    <v-container class="py-5 my-5 px-5">
      <!-- Title -->
      <p class="text-center display-1 my-3 pb-4" id="sec7">
        Competências e habilidades interpessoais: trabalho em equipe e
        comunicação
      </p>

      <!-- Questions -->
      <div v-for="(a, iA) in l1Q3.questions" :key="a">
        <v-row
          v-for="(b, iB) in l1Q3.questions.slice(iA)"
          :key="b"
          min-height=""
        >
          <v-row v-if="a != b" class="px-5">
            <v-col cols="5">
              <span class="font-weight-bold"> {{ a }} </span>
            </v-col>
            <v-col cols="2" class="text-center">
              <span class="font-weight-bold"> vs </span>
            </v-col>
            <v-col cols="5" class="text-right">
              <span class="font-weight-bold">
                {{ b }}
              </span>
            </v-col>
          </v-row>

          <!-- Sliders -->
          <v-card-text v-if="a != b">
            <v-slider
              step="1"
              :min="ahp.min"
              :max="ahp.max"
              :tick-labels="ahp.ticks"
              class="font-weight-bold text--darken-2 grey--text"
              style="font-size: 0.9em; height: 10em !important"
              color="indigo lighten-1"
              track-color="indigo lighten-1"
              v-model="l1Q3.formMatrix[iA][iB + iA]"
              @change="insertIntoMatrix(iA, iB + iA, l1Q3)"
            >
            </v-slider>
            <v-divider></v-divider>
          </v-card-text>
        </v-row>
      </div>

      <!-- UI: inconsistent responses -->
      <UiError :show="!l1Q3.valid" />
    </v-container>

    <!---------------------- End of Questions ----------------------->

    <!-- Confirmation and send -->
    <v-container>
      <v-divider dark></v-divider>
      <!-- Text -->
      <v-row>
        <span id="confirmation" class="pa-5 display-1 my-5">Confirmar e enviar</span>
      </v-row>

      <!-- Input fields -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="user.username"
            :rules="rules.empty"
            :counter="200"
            label="Nome"
            clearable
            required
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="6">
          <v-text-field
            v-model="user.email"
            :rules="rules.email"
            label="E-mail"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- UI: Agreement (modal) -->
      <v-row justify="center">
        <v-checkbox v-model="acceptTerms" color="green" value="acceptTerms">
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
                    <p class="text-justify" style="text-indent: 2em">
                      Ao clicar nesta caixa de seleção
                      <b>você estará concordando em enviar suas informações</b>
                      para os pesquisadores. Essa informação irá conter os dados
                      preenchidos nas perguntas e no formulário de
                      identificação.
                    </p>
                    <p class="text-justify" style="text-indent: 2em">
                      O conteúdo deste formulário, caso seja disponibilizado
                      para o público, não irá conter os detalhes pessoais do
                      entrevistado (nome e email).
                    </p>
                    <p class="text-justify" style="text-indent: 2em">
                      Por razões éticas, as respostas serão tratadas de forma agregada e confidencial,
                      preservando assim a privacidade de todos os respondentes. O site onde a pesquisa está
                      é perfeitamente seguro e utilizado tanto no meio acadêmico como por empresas.
                      As informações coletadas serão utilizadas unicamente para fins acadêmicos
                    </p>
                    <!--
                    <p class="text-justify" style="text-indent: 2em">
                      Salienta-se que a pesquisa foi aprovada pelo Comitê de Ética em Pesquisa
                      <span class="red--text"> XXX </span>,
                        sob protocolo <span class="red--text">YYY</span>.
                    </p>
                    -->
                    <p class="text-justify" style="text-indent: 2em">
                      Quanto aos possíveis riscos ou danos à sua participação, esses são considerados mínimos e
                      relacionados ao preenchimento de questionários, tais como: tomar o tempo do respondente,
                      provocar cansaço, gerar desconforto, causar sentimento de insegurança quanto à opção de
                      resposta que melhor reflete sua opinião diante das afirmativas relacionadas ao produto.
                      Sendo assim, <strong>você poderá desistir do preenchimento do questionário a qualquer momento,
                      sem penalidade alguma. </strong>
                    </p>
                    <p class="text-justify" style="text-indent: 2em">
                      Durante todo o período da pesquisa, você terá a possibilidade de esclarecer qualquer dúvida
                      ou solicitar assistência. Para isso, basta entrar em contato com os pesquisadores.

                      <strong>A sua participação é livre e voluntária. Não haverá nenhuma forma de compensação financeira e,
                      também, não haverá custos para o (a) participante </strong>.
                    </p>
                    <p class="text-justify" style="text-indent: 2em">
                      A sua identidade permanecerá em sigilo
                      durante toda pesquisa e, especialmente, na publicação dos resultados. Além disso, destaca-se
                      que não será identificada a organização em que o participante atua e que as informações
                      coletadas serão utilizadas unicamente para fins acadêmicos.

                      Como já citado, toda a informação possuirá identificadores aleatórios, de modo que, <strong>em
                      caso de extravio de informações, não será possível, a priori, identificar a sua origem.</strong>


                    </p>
                    <p class="text-justify font-weight-bold text--darken-2 primary--text" style="text-indent: 2em;">
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

      <!-- Send btn -->
      <v-row justify="center" class="mb-5 pb-5">
        <v-btn class="success" :disabled="!acceptTerms" @click="submit">
          Enviar
        </v-btn>
      </v-row>
    </v-container>

    <!-- UI: Loading when sending the data -->
    <UiLoading :loading="loading" />

    <!-- UI: Error when send -->
    <UiErrorOnSend
      :show="errorOnSend"
      :reset="reset"
      :reason="errorOnSendCode"
    />

    <!-- UI: Confirmation when send -->
    <UiConfirmSent
      :show="sent"
      :reset="reset"
    />
  </v-form>
</template>



<script>
import axios from "axios";
import UiError from '@/components/ui/FormError';
import UiLoading from '@/components/ui/Loading';
import UiErrorOnSend from '@/components/ui/ErrorOnSend';
import UiConfirmSent from '@/components/ui/ConfirmWhenSend';

export default {
  name:'Form',
  data() {
    return {
      // 0. Upper (Root)
      lRoot: {
        // n!/( p!(n-p)! ) Where p = 2
        questions: [
          "Conhecimento técnico",
          "Competências, habilidades e atributos pessoais e profissionais: gerenciar projetos, compreender problemas e autoaprendizado",
          "Competências e habilidades interpessoais: trabalho em equipe e comunicação",
        ],
        // AHP
        matrix: undefined,
        // Form values (needed to get values)
        formMatrix: undefined,
        // Notes (explanations that will be into tooltip)
        notes: null,
        // UI: check if ahp is valid or not
        valid: true,
      },

      // The notation follows the logic:
      // * l_ -> level, where _ is the value
      // * Q_ -> question, where _ is the value
      // * S_ -> sub question, where _ is the value

      // 1. Level 1 (Conhecimento téc ...)
      l1Q1: {
        // n!/( p!(n-p)! ) Where p = 2
        questions: [
          "Matemática e física",
          "Conhecimento, métodos e ferramentas fundamentais de computação básica",
          "Conhecimento, métodos e ferramentas na área de sistemas de software",
          "Conhecimento, métodos e ferramentas na área de sistemas microprocessados",
          "Conhecimentos básicos em sistemas de comunicação",
          "Conhecimentos básicos em sistemas de automação",
        ],
        // AHP
        matrix: undefined,
        // Form values (needed to get values)
        formMatrix: undefined,
        // Notes (explanations that will be into tooltip)
        notes: null,
        // UI: check if ahp is valid or not
        valid: true,
      },

      // 1.2 Level 2 (Conhecimento, métodos ...)
      l2Q1S2: {
        // n!/( p!(n-p)! ) Where p = 2
        questions: [
          "Lógica, algoritmos, teoria da computação e estrutura de dados",
          "Linguagens e paradigmas de programação específicos",
          "Projeto e análise de algoritmos",
        ],
        // AHP
        matrix: undefined,
        // Form values (needed to get values)
        formMatrix: undefined,
        // Notes (explanations that will be into tooltip)
        notes: null,
        // UI: check if ahp is valid or not
        valid: true,
      },

      // 1.2 Level 2 (Conhecimento, métodos ...)
      l2Q1S3: {
        // n!/( p!(n-p)! ) Where p = 2
        questions: [
          "Configurar plataformas para aplicações de software e serviços",
          "Arquiteturas de computadores",
          "Segurança de sistemas de computação",
          "Engenharia de software e práticas no desenvolvimento de software e versionamento",
          "Inteligência artificial",
          "Desenvolvimento Web e Mobile",
        ],
        // AHP
        matrix: undefined,
        // Form values (needed to get values)
        formMatrix: undefined,
        // Notes (explanations that will be into tooltip)
        notes: null,
        // UI: check if ahp is valid or not
        valid: true,
      },

      // 1.5 Level 2 (Conhecimentos básicos ...)
      // Due the fact that this only has one question, we'll not validate-it
      l2Q1S5: {
        // n!/( p!(n-p)! ) Where p = 2
        questions: [
          "Redes de computadores",
          "Software para sistemas de comunicação",
        ],
        // AHP
        // matrix: undefined,
        // Form values (needed to get values)
        formMatrix: undefined,
        // Notes (explanations that will be into tooltip)
        notes: null,
        // UI: check if ahp is valid or not
        valid: true,
      },

      // 2. Level 1 (Competências, habilidades e atributos pessoais e ...)
      l1Q2: {
        // n!/( p!(n-p)! ) Where p = 2
        questions: [
          "Gerenciar projetos e sistemas de computação",
          "Realizar estudos de viabilidade técnico-econômica",
          "Compreender e resolver problemas",
          "Autoaprendizado",
          "Criatividade e Inovação",
        ],
        // AHP
        matrix: undefined,
        // Form values (needed to get values)
        formMatrix: undefined,
        // Notes (explanations that will be into tooltip)
        notes: null,
        // UI: check if ahp is valid or not
        valid: true,
      },

      // 3. Level 1 (Competências e habilidades interpessoais ...)
      l1Q3: {
        // n!/( p!(n-p)! ) Where p = 2
        questions: [
          "Comunicação oral e escrita",
          "Língua inglesa",
          "Empreender e exercer liderança",
          "Trabalho em equipe",
        ],
        // AHP
        matrix: undefined,
        // Form values (needed to get values)
        formMatrix: undefined,
        // Notes (explanations that will be into tooltip)
        notes: null,
        // UI: check if ahp is valid or not
        valid: true,
      },

      // Sliders
      ahp: {
        // Values that will be inserted into matrix
        values: [0.11, 0.14, 0.2, 0.33, 1, 3, 5, 7, 9],
        // Questions labels
        ticks: ["9", "7", "5", "3", "Igual", "3", "5", "7", "9"],
        // Range (iterate over values and ticks)
        min: 0,
        max: 8,
      },

      // Send form
      rules: {
        email: [
          (v) =>
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
              v
            ) || "E-mail inválido",
        ],
        empty: [
          (v) =>
            v.length >= 5 || "Não alcançou o tamanho mínimo de caracteres.",
        ],
      },
      user: { username: "", email: "" },
      acceptTerms: false,

      // Validate form (put fields in red if false)
      validForm: true,

      // UI interations (allerts)
      loading: false,         // Sending info to email
      errorOnSend: false,     // Ocurred a problem when sending info to email
      errorOnSendCode: null,  // code that will get the status of requisition
      sent: false,            // Email sent
    };
  },
  components: {
    UiError,
    UiLoading,
    UiErrorOnSend,
    UiConfirmSent
  },

  // Executes before render the page
  created() {
    // This variable will get the matrix dimensions
    let size = 0;
    // This variable will store the value of position in form
    const pos = 4;

    // Initialize matrix for "Default questions (Root)"
    size = this.lRoot.questions.length;
    this.lRoot.formMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(pos));
    this.lRoot.matrix = Array(size)
      .fill()
      .map(() => Array(size).fill(1));

    // Initialize matrix for "conhecimento técnico"
    size = this.l1Q1.questions.length;
    this.l1Q1.formMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(pos));
    this.l1Q1.matrix = Array(size)
      .fill()
      .map(() => Array(size).fill(1));

    // Initialize matrix for "Conhecimento, métodos e ferramentas fundamentais de computação básica"
    size = this.l2Q1S2.questions.length;
    this.l2Q1S2.formMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(pos));
    this.l2Q1S2.matrix = Array(size)
      .fill()
      .map(() => Array(size).fill(1));

    // Initialize matrix for "Conhecimento, métodos e ferramentas na área de sistemas de software"
    size = this.l2Q1S3.questions.length;
    this.l2Q1S3.formMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(pos));
    this.l2Q1S3.matrix = Array(size)
      .fill()
      .map(() => Array(size).fill(1));

    // Initialize matrix for "Conhecimentos básicos em sistemas de comunicação"
    size = this.l2Q1S5.questions.length;
    this.l2Q1S5.formMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(pos));
    // As we only have 1 question, we'll not validate
    // this.l2Q1S5.matrix = Array(size)
    //   .fill()
    //   .map(() => Array(size).fill(1));

    // Initialize matrix for "Competências, habilidades e atributos pessoais e profissionais"
    size = this.l1Q2.questions.length;
    this.l1Q2.formMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(pos));
    this.l1Q2.matrix = Array(size)
      .fill()
      .map(() => Array(size).fill(1));

    // Initialize matrix for "Competências e habilidades interpessoais: trabalho em equipe e comunicação"
    size = this.l1Q3.questions.length;
    this.l1Q3.formMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(pos));
    this.l1Q3.matrix = Array(size)
      .fill()
      .map(() => Array(size).fill(1));

    // console.log("created -> this.lRoot.matrix", this.lRoot.matrix);
    // console.log("created -> this.lRoot.formMatrix", this.lRoot.formMatrix);
  },

  // Functions
  methods: {
    /**
     * Round number into n decimal "places"
     * @param num The number to be rounded
     * @param places The number of decimal places. Default = 2
     * @return The rounded number
     */
    round(num, places = 2) {
      return Math.round((num + Number.EPSILON) * 10 ** places) / 10 ** places;
    },

    /**
     * Get values from form matrix and insert it onto ahp matrix
     * @param row The row number
     * @param col The col number
     * @param obj The dictionary object that holds "formMatrix"
     *              (form values) and matrix (ahp values)
     */
    insertIntoMatrix(row, col, obj) {
      // Get value from form matrix
      const value = obj.formMatrix[row][col];
      // Put into ahp matrix
      obj.matrix[row][col] = this.ahp.values[value];
      obj.matrix[col][row] = this.round(this.ahp.values[value] ** -1);

      // console.log("insertIntoMatrix -> value", value);
      // console.log("insertIntoMatrix -> Matrix", this.lRoot.matrix);
      // console.log("insertIntoMatrix -> Form", this.lRoot.formMatrix);

      // Check ahp
      obj.valid = true;
      const result = this.checkAhp(obj.matrix);
      if (!result) obj.valid = false;
    },

    /**
     * Verifies if AHP is valid.
     * @note This method not change the current value of object. So we can use it
     *       later if not pass through test.
     * @param obj The matrix that holds the ahp values
     * @param matrix If pass some value, we'll gonna change the object passed
     * @return true/false If pass/or not through ahp validation
     */
    checkAhp(obj, matrix = null) {
      const len = obj.length;

      // If we don't pass matrix object, we'll
      //  copy the matrix to not change the current value of matrix in "obj"
      if (!matrix) matrix = obj.map((rowArray) => rowArray.slice());
      let _m = obj.map((rowArray) => rowArray.slice());

      // console.log("checkAhp -> matrix", matrix);
      // console.log("checkAhp -> _m", _m);

      // Inconsistency index
      const RI = [
        // Matrix dimensions starting with one
        0,
        0,
        0.58,
        0.9,
        1.12,
        1.24,
        1.32,
        1.41,
        1.45,
        1.49,
        1.51,
        1.48,
        1.56,
        1.57,
        1.59,
      ];

      for (let col = 0; col < len; col++) {
        let sum = 0;
        // Sum each column
        for (let row = 0; row < len; row++) sum += matrix[row][col];
        // Normalize the copied table
        for (let row = 0; row < len; row++) _m[row][col] /= sum;
      }

      // Priority vector (sum of row / row length)
      let priorityVec = new Array(len);
      for (let row = 0; row < len; row++)
        priorityVec[row] = _m[row].reduce((prev, curr) => prev + curr) / len;

      // Apply the (priorityVec)' into column values
      for (let col = 0; col < len; col++)
        for (let row = 0; row < len; row++)
          matrix[row][col] = this.round(priorityVec[col] * matrix[row][col]);

      // Weight vector
      let weightVec = new Array(len);
      for (let row = 0; row < len; row++)
        weightVec[row] = matrix[row].reduce((prev, curr) => prev + curr) / len;

      // Check consistency
      const CI =
        (weightVec
          // Calc result (weightVec./priorityVec)
          .map((curr, i) => curr / priorityVec[i])
          .reduce((prev, curr) => prev + curr) -
          len) /
        (len - 1);

      const CR = CI / RI[len - 1];
      // console.log("checkAhp -> CI", CI);
      // Where 0.1 it's given by Saaty also
      // console.log("checkAhp -> CR", CR);
      return CR < 0.1;
    },

    /**
     * Reset all variables and validations
     */
    reset() {
      // Reset all by reloading the current page
      this.$router.go();
    },

    /**
     * Send data to researches emails.
     */
    submit() {
      const { username, email } = this.user;
      // Check if fields where filled
      this.$refs.form.validate();
      if (!username || !email) return; // Not submit

      // Doesn't need to check the ahp anymore, because
      //  we're check'in in each section

      // Now, we execute the ahp for each matrix again, because we
      // didn't changed the ahp matrix by default, so now, assuming that
      // everything is ok, we do.
      this.checkAhp(this.lRoot.matrix, this.lRoot.matrix);
      // console.log("submit -> this.lRoot.matrix", this.lRoot.matrix);
      this.checkAhp(this.l1Q1.matrix, this.l1Q1.matrix);
      // console.log("submit -> this.l1Q1.matrix", this.l1Q1.matrix);
      this.checkAhp(this.l2Q1S2.matrix, this.l2Q1S2.matrix);
      // console.log("submit -> this.l2Q1S2.matrix", this.l2Q1S2.matrix);
      this.checkAhp(this.l2Q1S3.matrix, this.l2Q1S3.matrix);
      // console.log("submit -> this.l2Q1S3.matrix", this.l2Q1S3.matrix);
      // this.checkAhp(this.l2Q1S5, this.l2Q1S5.matrix); // We do not validate it
      this.checkAhp(this.l1Q2.matrix, this.l1Q2.matrix);
      // console.log("submit -> this.l1Q2.matrix", this.l1Q2.matrix);
      this.checkAhp(this.l1Q3.matrix, this.l1Q3.matrix);
      // console.log("submit -> this.l1Q3.matrix", this.l1Q3.matrix);

      // Send email
      const data = {
        name: username,
        email: email,
        rootMatrix: String(
          this.lRoot.matrix.map((curr) => "[" + curr.join() + "],").join("")
        ),
        matrixQ1: String(
          this.l1Q1.matrix.map((curr) => "[" + curr.join() + "],").join("")
        ),
        matrixQ1S2: String(
          this.l2Q1S2.matrix.map((curr) => "[" + curr.join() + "],").join("")
        ),
        matrixQ1S3: String(
          this.l2Q1S3.matrix.map((curr) => "[" + curr.join() + "],").join("")
        ),
        Q1S5: String(this.l2Q1S5.formMatrix[0][0]),
        matrixQ2: String(
          this.l1Q2.matrix.map((curr) => "[" + curr.join() + "],").join("")
        ),
        matrixQ3: String(
          this.l1Q3.matrix.map((curr) => "[" + curr.join() + "],").join("")
        ),
      };
      // console.log("submit -> Send email");
      // console.log("submit -> email", email);
      // console.log("submit -> username", username);
      // console.log("submit -> data", data);

      // Start UI loading animation
      this.loading = true;
      axios
        .post(`http://${process.env.VUE_APP_PUBLIC_URL}:3000/email`, data)
        .then(
          () => {
            this.loading = false; // close ui anim
            this.sent = true; // opens ui sent msg
          },
          (err) => {
            this.loading = false; // close ui anim
            this.errorOnSend = true; // open error message
            this.errorOnSendCode = err.response.status;
            // console.log("submit -> err.response.status", err.response.status);
            // console.log("submit -> axios err", err);
          }
        );
    },
  },
};
</script>
