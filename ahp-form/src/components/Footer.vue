<template>
  <v-footer dark class="indigo lighten-1">
    <v-container>
      <v-row justify="center" class="pb-2">
        <v-btn
          icon
          class="mx-4 white--text"
          title="Enviar email para o pesquisador"
          href="mailto:p.augustocampos@gmail.com?subject=Formulario"
        >
          <v-icon size="24px" alt="Ícone de email"> mdi-gmail </v-icon>
        </v-btn>
      </v-row>
      <v-row>
        <v-col>
          <v-container justify-center fill-height fluid>
            <v-btn
              icon
              href="https://unifei.edu.br/"
              target="_blank"
              title="Site da unifei"
              alt="Site da unifei"
              class="mx-5"
            >
              <v-img
                dark
                alt="Unifei Logo"
                class="shrink ma-4"
                src="@/assets/img/EFEI_logo.png"
                width="60"
              />
            </v-btn>
            Universidade Federal de Itajubá -- Campus Itabira
          </v-container>
        </v-col>
        <v-col align="right">
          <strong class="overline">Pesquisadores:</strong>
          <p class="caption">
            Pedro Augusto Campos Dos Santos (Aluno)
            <br />
            Giovanni Bernardes (Professor Orientador)
            <br />
            Ana ... (Professora Co-orientadora)
            <br />
            Rodrigo Braga ... (Professor Co-orientador)
            <br />
          </p>
        </v-col>
      </v-row>
      <v-col align="center">
        <p class="caption text--lighten-2 grey--text">
          * Em caso de problemas/dúvidas, sinta-se a vontade para entrar em
          contato com os pesquisadores através do email.
        </p>
      </v-col>
      <v-divider></v-divider>
      <v-row>
        <v-card-text class="white--text" align="center">
          {{ String(new Date().getFullYear()) }} —
          <strong>Pedro A C Santos</strong>
        </v-card-text>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>