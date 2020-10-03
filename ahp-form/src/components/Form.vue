<template>
  <div class="form">
    <v-form v-model="validForm" ref="form">
      <v-container class="pt-5">
        <v-divider></v-divider>
        <p class="text-center display-1 my-5" id="conhecimentotec">
          Conhecimento técnico
        </p>

        <div v-for="(a, iA) in questions" :key="a">
          <v-row v-for="(b, iB) in questions.slice(iA)" :key="b" min-height="">
            <v-tooltip top color="indigo darken-2">
              <template v-slot:activator="{ on, attrs }">
                <v-row v-if="a != b" class="px-5" v-on="on" v-bind="attrs">
                  <v-col cols="5"
                    ><span class="font-weight-bold"> {{ a }} </span></v-col
                  >
                  <v-col cols="2" class="text-center"
                    ><span class="font-weight-bold"> vs </span></v-col
                  >
                  <v-col cols="5" class="text-right"
                    ><span class="font-weight-bold">
                      {{ b }}
                    </span></v-col
                  >
                </v-row>
              </template>
              <h4>
                O quão [<i
                  ><b>{{ a }}</b></i
                >] é mais "importante" com relação à [<i
                  ><b>{{ b }}</b></i
                >]
              </h4>
            </v-tooltip>

            <v-card-text v-if="a != b">
              <v-slider
                persistent-hint
                step="2"
                thumb-label
                ticks="always"
                tick-size="1"
                :min="ahp.min"
                :max="ahp.max"
                :tick-labels="ahp.ticks"
                class="pb-5 mb-5 grey--text text-subtitle-1"
                color="indigo lighten-1"
                track-color="indigo lighten-1"
                dense
                v-model="matrix[iA][iB + iA]"
                @change="iMatrixValue(iA, iB + iA)"
              >
              </v-slider>
              <v-divider></v-divider>
            </v-card-text>
          </v-row>
        </div>

        <v-divider dark></v-divider>
        <v-row>
          <span class="pa-5 display-1 my-5">Confirmar e enviar</span>
        </v-row>
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
        <v-row justify="center">
          <v-checkbox v-model="acceptTerms" color="green" value="acceptTerms">
            <template v-slot:label>
              <div>
                Ao clicar, você concorda em ceder suas informações, de acordo
                com o
                <v-dialog width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <span
                      title="Clique para visualizar os termos"
                      class="primary--text"
                      v-bind="attrs"
                      v-on="on"
                    >
                      contrato
                    </span>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> concessão de dados </span>
                    </v-card-title>
                    <v-card-text>
                      Concordo em disponibilizar os dados.
                    </v-card-text>
                  </v-card>
                </v-dialog>
                .
              </div>
            </template>
          </v-checkbox>
        </v-row>
        <v-row justify="center">
          <v-alert
            prominent
            type="error"
            :value="!validAhp"
            border="top"
            transition="scale-transition"
          >
            <v-row align="center">
              <v-col class="grow">
                Infelizmente, ao fazer a checagem, suas respostas foram
                incoerentes, por favor, resete o formulário e tente novamente
                😞.
              </v-col>
              <v-col class="shrink">
                <v-btn @click="reset">Resetar</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-row>
        <v-row justify="center" class="mb-5 pb-5">
          <v-btn class="success" :disabled="!acceptTerms" @click="submit">
            Enviar
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
const nodemailer = require("nodemailer");

export default {
  data() {
    return {
      ahp: {
        ticks: [
          "Igual",
          "Moderada",
          "Mais importante",
          "Muito mais",
          "Extremamente mais",
        ],
        min: 1,
        max: 9,
        step: 2,
      },
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
      // O número de perguntas é dado pela fórmula de combinação: n!/( p!(n-p)! )
      // onde n é a qnt do vetor e p são as perguntas (em pares => 2)
      questions: [
        "Matemática e física",
        "Lógica, algoritmos e estrutura de dados",
        "Linguagens e paradigmas de programação específicos",
        // "Teoria da computação",
        // "Projeto e análise de algoritmos",
        // "Configurar plataformas para aplicações de software e serviços",
        // "Arquiteturas de computadores",
        // "Segurança de sistemas de computação",
        // "Engenharia de software e práticas no desenvolvimento de software e versionamento",
        // "Inteligência artificial",
        // "Desenvolvimento Web e Mobile",
        // "Conhecimento, métodos e ferramentas na área de sistemas microprocessados",
        // "Redes de computadores",
        // "Software para sistemas de comunicação",
        // "Protocolos de comunicação em hardware",
        // "Conhecimentos básicos em sistemas de automação",
      ],
      matrix: undefined,
      acceptTerms: false,
      validForm: true,
      validAhp: true,
    };
  },
  created() {
    // Initiallize the matrix itself filled with ones
    this.matrix = new Array(this.questions.length);
    for (let row = 0; row < this.matrix.length; row++)
      this.matrix[row] = new Array(this.questions.length).fill(1);
  },
  methods: {
    iMatrixValue(row, col) {
      this.matrix[col][row] = this.matrix[row][col] ** -1;
      // console.log("Matrix --> ", this.matrix);
    },
    checkAhp() {
      const len = this.matrix.length;
      // Copy matrix
      let _m = this.matrix.map((rowArray) => rowArray.slice());
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
        for (let row = 0; row < len; row++) sum += this.matrix[row][col];
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
          this.matrix[row][col] *= priorityVec[col];
      // console.log("checkAhp -> priorityVec", priorityVec);
      // Weight vector
      let weightVec = new Array(len);
      for (let row = 0; row < len; row++)
        weightVec[row] =
          this.matrix[row].reduce((prev, curr) => prev + curr) / len;
      // console.log("checkAhp -> weightVec", weightVec);
      // Check consistency
      const CI =
        (weightVec
          .map((curr, i) => curr / priorityVec[i]) // Calc result (weightVec./priorityVec)
          .reduce((prev, curr) => prev + curr) -
          len) /
        (len - 1);
      // console.log("checkAhp -> CI", CI);
      const CR = CI / RI[len - 1];
      // Where 0.1 it's given by Saaty also
      // console.log("checkAhp -> CR", CR);
      return CR < 0.1;
    },
    reset() {
      // Reset matrix
      this.matrix.map((arrayRow) => arrayRow.fill(1));
      this.validAhp = true;
      this.$refs.form.resetValidation();
      this.user.email = this.user.username = "";
      // this.$refs.form.reset();
    },
    submit() {
      const { username, email } = this.user;
      const result = this.checkAhp();
      if (!result) this.validForm = this.validAhp = false;
      else {
        // Send email
        console.log("Send email: ");
        console.log("submit -> email", email);
        console.log("submit -> username", username);
        console.log("Matrix --> ", this.matrix);

        const data = {
          Nome: username,
          Email: email,
          Matriz: this.matrix,
        };
        console.log("submit -> data", data);

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.USER,
            pass: process.env.PSSWD,
          },
        });

        const mailOptions = {
          from: "sigaaForm@noreplay.com",
          to: "p.augustocampos@gmail.com",
          subject: "[Formulário Sigaa] Compentências",
          text: data,
        };

        transporter.sendMail(mailOptions, function(error) {
          if (error) console.log("Error");
          else console.log("Email send");
        });
      }
    },
  },
};
</script>
