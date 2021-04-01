<!-- Formulário: Parte 2
     Contém as seções:
        - l1Q2: Competências, habilidades e atributos pessoais e profissionais
        - l1Q3: Competências e habilidades interpessoais: trabalho em equipe e comunicação
-->

<template>
  <v-app>
    <!-- Header -->
    <h1 align="center">Formulário de pesquisa acadêmica: Parte 2</h1>
    <Info />
    <!-- Add a navbar to iterate over "Form" -->
    <Navbar />

    <!-- Add quiz -->
    <v-form v-model="validForm" ref="form">
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
import { redoAHP, round } from "@/libraries/common";
import { AhpData, FormSectionData } from "@/libraries/types";


export default {
  name:'Form_page2',

  // variables
  data() {
    return {
      // The notation follows the logic:
      // * l_ -> level, where _ is the value
      // * Q_ -> question, where _ is the value
      // * S_ -> sub question, where _ is the value
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
    // console.log("🚀 -> created -> Setting up tests");
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
      // console.log("🚀 -> onSliderChange -> slider_index [0..9]: ", slider_index);

      // Get equivalent value to ahp
      const slider_value = this.ahp.values[slider_index];
      // console.log("🚀 -> onSliderChange -> slider_value", slider_value);

      // Put into ahp matrix
      obj.matrix[row][col] = slider_value;
      obj.matrix[col][row] = round(slider_value ** -1);
      // console.log("🚀 -> onSliderChange -> Matrix", obj.matrix);
      // console.log("🚀 -> onSliderChange -> Form", obj.formMatrix);


      const [result, ahp_index] = checkAhp(obj.matrix);
      // console.log("🚀 -> onSliderChange -> result", result);
      // console.log("🚀 -> onSliderChange -> ahp_index", ahp_index);

      // Update object
      if (!result) {
        obj.ci = round(ahp_index);
        obj.valid = false;
      } else {
        obj.ci = 0;
        obj.valid = true;
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

      // NOTE: Uma vez que eu estou aceitando arquivos com CI errado,
      // ... é necessário enviar o arquivo original para que o AHP possa ser calculado na api

      // Now, we execute the ahp for each matrix again, because we
      // didn't changed the ahp matrix by default, so now, assuming that
      // everything is ok, we do.
      // checkAhp(this.lRoot.matrix, this.lRoot.matrix);
      // // console.log("submit -> this.lRoot.matrix", this.lRoot.matrix);
      // checkAhp(this.l1Q1.matrix, this.l1Q1.matrix);
      // // console.log("submit -> this.l1Q1.matrix", this.l1Q1.matrix);
      // checkAhp(this.l2Q1S2.matrix, this.l2Q1S2.matrix);
      // // console.log("submit -> this.l2Q1S2.matrix", this.l2Q1S2.matrix);
      // checkAhp(this.l2Q1S3.matrix, this.l2Q1S3.matrix);
      // // console.log("submit -> this.l2Q1S3.matrix", this.l2Q1S3.matrix);
      //  // We do not validate it
      // // checkAhp(this.l2Q1S5, this.l2Q1S5.matrix);
      // checkAhp(this.l1Q2.matrix, this.l1Q2.matrix);
      // // console.log("submit -> this.l1Q2.matrix", this.l1Q2.matrix);
      // checkAhp(this.l1Q3.matrix, this.l1Q3.matrix);
      // // console.log("submit -> this.l1Q3.matrix", this.l1Q3.matrix);

      // Send email
      const data = {
        name: username,
        email: email,
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
        .post(`http://${process.env.VUE_APP_PUBLIC_URL}:3000/email/Part2`, data)
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
