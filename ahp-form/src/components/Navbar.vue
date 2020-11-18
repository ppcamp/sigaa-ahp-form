<template>
  <nav>
    <!-- Default navigation bar (used in large desktops) -->
    <!-- <v-app-bar app color="indigo lighten-1" dark hide-on-scroll class>
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
      <v-btn href="#habtec" small text>
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
    </v-app-bar> -->

    <!-- New vertical bar -->
    <v-app-bar
      color="indigo lighten-1"
      dark
      collapse
      class="pr-4"
      app
      hide-on-scroll
      min-width="8.5em"
    >
      <!-- collapse-on-scroll="true" -->
      <v-btn text block @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon> Menu
      </v-btn>
    </v-app-bar>

    <!-- Menu hided -->
    <v-navigation-drawer app v-model="drawer" temporary class="px-3">
      <v-container fluid>
        <div style="height: 10em"></div>

        <v-row class="my-1 py-1" align="center" justify="space-around">
          <v-btn text block small title="Informações" href="#info">
            <v-icon class="mr-2">mdi-information-outline</v-icon>Informações
          </v-btn>
        </v-row>

        <v-row class="my-1 py-1" align="center" justify="space-around">
          <v-btn text block small title="Informações" href="#general">
            <v-icon class="mr-2">mdi-school</v-icon>Visão geral
          </v-btn>
        </v-row>

        <v-row class="my-1 py-1" align="center" justify="space-around">
          <v-btn text block small title="Informações" href="#contec">
            <v-icon class="mr-2">mdi-notebook-edit-outline</v-icon>Conhecimento
            técnico
          </v-btn>
        </v-row>

        <v-row class="my-1 py-1" align="center" justify="space-around">
          <v-btn href="#habinterpessoal" small text disabled>
            <v-icon class="mr-2">mdi-account-group</v-icon>
            <span class="mr-1">Habilidades interpessoais</span>
          </v-btn>
        </v-row>

        <v-row class="my-1 py-1" align="center" justify="space-around">
          <v-btn href="#habintrapessoal" small text disabled>
            <v-icon class="mr-2">mdi-account</v-icon>
            <span class="mr-1">Habilidades intrapessoais</span>
          </v-btn>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
