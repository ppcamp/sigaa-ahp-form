<template>
  <v-app>
    <!-- Header -->
    <h1 align="center">Formulário de pesquisa acadêmica</h1>
    <Info />
    <!-- Add a navbar to iterate over "Form" -->
    <Navbar />

    <!-- Add quiz -->
    <v-form v-model="validForm" ref="form">
      <!-- 0. Root  -->
      <FormQuestion
        linkId="sec1"
        title="Visão Geral"
        :obj="lRoot"
        :ahp="ahp"
        :insertIntoMatrix="insertIntoMatrix"
      />

      <FormQuestion
        linkId="sec2"
        title="Conhecimento técnico"
        :obj="l1Q1"
        :ahp="ahp"
        :insertIntoMatrix="insertIntoMatrix"
      />

      <FormQuestion
        linkId="sec3"
        title="Conhecimento, métodos e ferramentas fundamentais de computação básica"
        :obj="l2Q1S2"
        :ahp="ahp"
        :insertIntoMatrix="insertIntoMatrix"
      />

      <FormQuestion
        linkId="sec4"
        title="Conhecimento, métodos e ferramentas na área de sistemas de software"
        :obj="l2Q1S3"
        :ahp="ahp"
        :insertIntoMatrix="insertIntoMatrix"
      />

      <FormQuestion
        linkId="sec5"
        title="Conhecimentos básicos em sistemas de comunicação"
        :obj="l2Q1S5"
        :ahp="ahp"
        :insertIntoMatrix="insertIntoMatrix"
      />

      <FormQuestion
        linkId="sec6"
        title="Competências, habilidades e atributos pessoais e profissionais"
        :obj="l1Q2"
        :ahp="ahp"
        :insertIntoMatrix="insertIntoMatrix"
      />

      <FormQuestion
        linkId="sec7"
        title="Competências e habilidades interpessoais: trabalho em equipe e comunicação"
        :obj="l1Q3"
        :ahp="ahp"
        :insertIntoMatrix="insertIntoMatrix"
      />

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
  </v-app>
</template>

<script>
// Components
import Navbar from "@/components/form/Navbar";
import Info from "@/components/form/Info";
import FormQuestion from '@/components/form/Questions';
import UiLoading from '@/components/ui/Loading';
import UiErrorOnSend from '@/components/ui/ErrorOnSend';
import UiConfirmSent from '@/components/ui/ConfirmWhenSend';
// Libraries
import axios from "axios";
import { checkAhp } from "@/libraries/ahp";
import { round } from "@/libraries/common";
import { FormSectionData } from "../libraries/types";


export default {
  name:'Form',

  // variables
  data() {
    return {
      // The notation follows the logic:
      // * l_ -> level, where _ is the value
      // * Q_ -> question, where _ is the value
      // * S_ -> sub question, where _ is the value
      lRoot: null,
      l1Q1: null,
      l2Q1S2: null,
      l2Q1S3: null,
      l2Q1S5: null,
      l1Q2: null,
      l1Q3: null,

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

  // components
  components: {
    Navbar,
    Info,
    UiLoading,
    UiErrorOnSend,
    UiConfirmSent,
    FormQuestion
  },

  /**
   * Executes before create the element
   * @description Create a new object for each section
   */
  created() {
    // This variable will store the value of position in form
    const pos = 4;


    // 0. Upper (Root)
    this.lRoot = new FormSectionData({
      questions: [
        "Conhecimento técnico",
        "Competências, habilidades e atributos pessoais e profissionais: gerenciar projetos, compreender problemas e autoaprendizado",
        "Competências e habilidades interpessoais: trabalho em equipe e comunicação",
      ],
      matrix: Array(3)
                .fill()
                .map(() => Array(3).fill(1)),
      formMatrix: Array(3)
                    .fill()
                    .map(() => Array(3).fill(pos)),
      notes: null,
      valid: true,
    });

    // 1. Level 1 (Conhecimento téc ...)
    this.l1Q1 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Matemática e física",
        "Conhecimento, métodos e ferramentas fundamentais de computação básica",
        "Conhecimento, métodos e ferramentas na área de sistemas de software",
        "Conhecimento, métodos e ferramentas na área de sistemas microprocessados",
        "Conhecimentos básicos em sistemas de comunicação",
        "Conhecimentos básicos em sistemas de automação",
      ],
      matrix: Array(6)
                .fill()
                .map(() => Array(6).fill(1)),
      formMatrix: Array(6)
                    .fill()
                    .map(() => Array(6).fill(pos)),
      notes: null,
      valid: true,
    });

    // 1.2 Level 2 (Conhecimento, métodos ...)
    this.l2Q1S2 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Lógica, algoritmos, teoria da computação e estrutura de dados",
        "Linguagens e paradigmas de programação específicos",
        "Projeto e análise de algoritmos",
      ],
      matrix: Array(3)
                .fill()
                .map(() => Array(3).fill(1)),
      formMatrix: Array(3)
                    .fill()
                    .map(() => Array(3).fill(pos)),
      notes: null,
      valid: true,
    });

    this.l2Q1S3 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Configurar plataformas para aplicações de software e serviços",
        "Arquiteturas de computadores",
        "Segurança de sistemas de computação",
        "Engenharia de software e práticas no desenvolvimento de software e versionamento",
        "Inteligência artificial",
        "Desenvolvimento Web e Mobile",
      ],
      matrix: Array(6)
                .fill()
                .map(() => Array(6).fill(1)),
      formMatrix: Array(6)
                    .fill()
                    .map(() => Array(6).fill(pos)),
      notes: null,
      valid: true,
    });

    // Due the fact that this only has one question, we'll not validate-it
    // TODO: Fix problem with number of elements in this section
    this.l2Q1S5 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Redes de computadores",
        "Software para sistemas de comunicação",
      ],
      matrix: Array(2)
                .fill()
                .map(() => Array(2).fill(1)),
      formMatrix: Array(2)
                    .fill()
                    .map(() => Array(2).fill(pos)),
      notes: null,
      valid: true,
    });

    this.l1Q2 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Gerenciar projetos e sistemas de computação",
        "Realizar estudos de viabilidade técnico-econômica",
        "Compreender e resolver problemas",
        "Autoaprendizado",
        "Criatividade e Inovação",
      ],
      matrix: Array(5)
                .fill()
                .map(() => Array(5).fill(1)),
      formMatrix: Array(5)
                    .fill()
                    .map(() => Array(5).fill(pos)),
      notes: null,
      valid: true,
    });

    this.l1Q3 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Comunicação oral e escrita",
        "Língua inglesa",
        "Empreender e exercer liderança",
        "Trabalho em equipe",
      ],
      matrix: Array(4)
                .fill()
                .map(() => Array(4).fill(1)),
      formMatrix: Array(4)
                    .fill()
                    .map(() => Array(4).fill(pos)),
      notes: null,
      valid: true,
    });

    // console.log("created -> this.lRoot.matrix", this.lRoot.matrix);
    // console.log("created -> this.lRoot.formMatrix", this.lRoot.formMatrix);
  },

  // Functions
  methods: {
    /**
     * TODO: Check if ahp's values are right
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
      obj.matrix[col][row] = round(this.ahp.values[value] ** -1);

      // console.log("insertIntoMatrix -> value", value);
      // console.log("insertIntoMatrix -> Matrix", this.lRoot.matrix);
      // console.log("insertIntoMatrix -> Form", this.lRoot.formMatrix);

      // Check ahp
      obj.valid = true;
      const result = checkAhp(obj.matrix);
      if (!result) obj.valid = false;
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
      checkAhp(this.lRoot.matrix, this.lRoot.matrix);
      // console.log("submit -> this.lRoot.matrix", this.lRoot.matrix);
      checkAhp(this.l1Q1.matrix, this.l1Q1.matrix);
      // console.log("submit -> this.l1Q1.matrix", this.l1Q1.matrix);
      checkAhp(this.l2Q1S2.matrix, this.l2Q1S2.matrix);
      // console.log("submit -> this.l2Q1S2.matrix", this.l2Q1S2.matrix);
      checkAhp(this.l2Q1S3.matrix, this.l2Q1S3.matrix);
      // console.log("submit -> this.l2Q1S3.matrix", this.l2Q1S3.matrix);
       // We do not validate it
      // checkAhp(this.l2Q1S5, this.l2Q1S5.matrix);
      checkAhp(this.l1Q2.matrix, this.l1Q2.matrix);
      // console.log("submit -> this.l1Q2.matrix", this.l1Q2.matrix);
      checkAhp(this.l1Q3.matrix, this.l1Q3.matrix);
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
