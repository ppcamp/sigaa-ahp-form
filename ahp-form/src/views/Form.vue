<template>
  <v-app>
    <!-- Header -->
    <h1 align="center">Formulário de pesquisa acadêmica</h1>
    <Info />
    <!-- Add a navbar to iterate over "Form" -->
    <Navbar />

    <!-- Add quiz -->
    <v-form v-model="validForm" ref="form">
      <!-- lRoot: Visão geral  -->
      <FormQuestion
        linkId="sec1"
        title="Visão Geral"
        :obj="lRoot"
        :ahp="ahp"
        :onSliderChange="onSliderChange"
      />

      <!-- l1Q1: Conhecimento técnico  -->
      <FormQuestion
        linkId="sec2"
        title="Conhecimento técnico"
        :obj="l1Q1"
        :ahp="ahp"
        :onSliderChange="onSliderChange"
      />

      <!-- l2Q1S2: Conhecimento, métodos e ferramentas fundamentais de computação básica  -->
      <FormQuestion
        linkId="sec3"
        title="Conhecimento, métodos e ferramentas fundamentais de computação básica"
        :obj="l2Q1S2"
        :ahp="ahp"
        :onSliderChange="onSliderChange"
      />

      <!-- l2Q1S3: Conhecimento, métodos e ferramentas na área de sistemas de software  -->
      <FormQuestion
        linkId="sec4"
        title="Conhecimento, métodos e ferramentas na área de sistemas de software"
        :obj="l2Q1S3"
        :ahp="ahp"
        :onSliderChange="onSliderChange"
      />

      <!-- l2Q1S5: Conhecimentos básicos em sistemas de comunicação  -->
      <FormQuestion
        linkId="sec5"
        title="Conhecimentos básicos em sistemas de comunicação"
        :obj="l2Q1S5"
        :ahp="ahp"
        :onSliderChange="onSliderChange"
      />

      <!-- l1Q2: Competências, habilidades e atributos pessoais e profissionais  -->
      <FormQuestion
        linkId="sec6"
        title="Competências, habilidades e atributos pessoais e profissionais"
        :obj="l1Q2"
        :ahp="ahp"
        :onSliderChange="onSliderChange"
      />

      <!-- l1Q3: Competências e habilidades interpessoais: trabalho em equipe e comunicação  -->
      <FormQuestion
        linkId="sec7"
        title="Competências e habilidades interpessoais: trabalho em equipe e comunicação"
        :obj="l1Q3"
        :ahp="ahp"
        :onSliderChange="onSliderChange"
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

        <!-- Checkbox and modal -->
        <FormTerms :swap="onClickTermCheckBox" :accept="acceptTerms"/>

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
import UiLoading from '@/components/form/ui/Loading';
import UiErrorOnSend from '@/components/form/ui/ErrorOnSend';
import UiConfirmSent from '@/components/form/ui/ConfirmWhenSend';
import FormTerms from '@/components/form/Terms';

// Libraries
import axios from "axios";
import { checkAhp } from "@/libraries/ahp";
import { round } from "@/libraries/common";
import { AhpData, FormSectionData } from "../libraries/types";


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
      ahp: new AhpData(),

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
    FormTerms,
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
    // This constant will store the value of position in form
    const SLIDER_START_POS = 4;
    // This constant will store the ahp default value
    const AHP_START_VALUE = 1;

    // Visão geral
    this.lRoot = new FormSectionData({
      questions: [
        "Conhecimento técnico",
        "Competências, habilidades e atributos pessoais e profissionais: gerenciar projetos, compreender problemas e autoaprendizado",
        "Competências e habilidades interpessoais: trabalho em equipe e comunicação",
      ],
      matrix: FormSectionData.newMatrix(3, AHP_START_VALUE),
      formMatrix: FormSectionData.newMatrix(3, SLIDER_START_POS),
      notes: [""],
      valid: true,
    });
    // Conhecimento técnico
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
      matrix: FormSectionData.newMatrix(6, AHP_START_VALUE),
      formMatrix: FormSectionData.newMatrix(6, SLIDER_START_POS),
      notes: [""],
      valid: true,
    });
    // Conhecimento, métodos e ferramentas fundamentais de computação básica
    this.l2Q1S2 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Lógica, algoritmos, teoria da computação e estrutura de dados",
        "Linguagens e paradigmas de programação específicos",
        "Projeto e análise de algoritmos",
      ],
      matrix: FormSectionData.newMatrix(3, AHP_START_VALUE),
      formMatrix: FormSectionData.newMatrix(3, SLIDER_START_POS),
      notes: [""],
      valid: true,
    });
    // Conhecimento, métodos e ferramentas na área de sistemas de software
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
      matrix: FormSectionData.newMatrix(6, AHP_START_VALUE),
      formMatrix: FormSectionData.newMatrix(6, SLIDER_START_POS),
      notes: [""],
      valid: true,
    });
    // Conhecimentos básicos em sistemas de comunicação
    this.l2Q1S5 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Redes de computadores",
        "Software para sistemas de comunicação",
      ],
      matrix: FormSectionData.newMatrix(2, AHP_START_VALUE),
      formMatrix: FormSectionData.newMatrix(2, SLIDER_START_POS),
      notes: [""],
      valid: true,
    });
    // Competências, habilidades e atributos pessoais e profissionais
    this.l1Q2 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Gerenciar projetos e sistemas de computação",
        "Realizar estudos de viabilidade técnico-econômica",
        "Compreender e resolver problemas",
        "Autoaprendizado",
        "Criatividade e Inovação",
      ],
      matrix: FormSectionData.newMatrix(5, AHP_START_VALUE),
      formMatrix: FormSectionData.newMatrix(5, SLIDER_START_POS),
      notes: [""],
      valid: true,
    });
    // Competências e habilidades interpessoais: trabalho em equipe e comunicação
    this.l1Q3 = new FormSectionData({
      // n!/( p!(n-p)! ) Where p = 2
      questions: [
        "Comunicação oral e escrita",
        "Língua inglesa",
        "Empreender e exercer liderança",
        "Trabalho em equipe",
      ],
      matrix: FormSectionData.newMatrix(4, AHP_START_VALUE),
      formMatrix: FormSectionData.newMatrix(4, SLIDER_START_POS),
      notes: [""],
      valid: true,
    });

    // console.log("🚀 -> created -> All objects where created");
  },

  // Functions
  methods: {
    /**
     * Swap acceptTerms variable. Needed for FormTerms component.
     */
    onClickTermCheckBox() {
      this.acceptTerms = !this.acceptTerms;
    },

    /**
     * TODO: Check if ahp's values are right
     * Get values from form matrix and insert it onto ahp matrix
     * @param {Number} row The row number
     * @param {Number} col The col number
     * @param {FormSectionData} obj The dictionary object that holds "formMatrix"
     *              (form values) and matrix (ahp values)
     */
    onSliderChange(row, col, obj) {
      // console.log("🚀 -> onSliderChange -> col", col);
      // console.log("🚀 -> onSliderChange -> row", row);

      // Get slider's index from form matrix
      const slider_index = obj.formMatrix[row][col];

      // Put into ahp matrix
      obj.matrix[row][col] = this.ahp.values[slider_index];
      obj.matrix[col][row] = round(this.ahp.values[slider_index] ** -1);

      // console.log("🚀 -> onSliderChange -> slider_index [0..9]: ", slider_index);
      // console.log("🚀 -> onSliderChange -> Matrix", obj.matrix);
      // console.log("🚀 -> onSliderChange -> Form", obj.formMatrix);

      // Check ahp
      obj.valid = true;
      const [result, ahp_index] = checkAhp(obj.matrix);
      // console.log("🚀 -> onSliderChange -> result", result);
      // console.log("🚀 -> onSliderChange -> ahp_index", ahp_index);

      // Update object
      if (!result) {
        obj.ci = round(ahp_index);
        obj.valid = false;
      }
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
