<template>
  <nav>
    <!-- Bar 4 large screen -->
    <v-app-bar app color="indigo lighten-1" dark hide-on-scroll class>
      <div class="d-flex align-center">
        <span class="ma-2">
          <v-btn
            title="Página
            inicial"
            to="/"
            small
            text
          >
            <v-icon class="mr-2">mdi-home</v-icon>
            Página inicial
          </v-btn>
        </span>
      </div>
      <v-spacer></v-spacer>
      <v-btn to="Competencias" small text>
        <v-icon class="mr-2">mdi-notebook-edit-outline</v-icon>
        <span class="mr-1">Conhecimento técnico</span>
      </v-btn>
      <v-btn href="#habinterpessoal" small text disabled>
        <v-icon class="mr-2">mdi-account-group</v-icon>
        <span class="mr-1">Habilidades interpessoais</span>
      </v-btn>
      <v-btn href="#habintrapessoal" small text disabled>
        <v-icon class="mr-2">mdi-account</v-icon>
        <span class="mr-1">Habilidades intrapessoais</span>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
