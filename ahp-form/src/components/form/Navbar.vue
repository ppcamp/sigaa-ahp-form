<template>
  <nav style="width: 500px">
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
      :collapse="$vuetify.breakpoint.mobile ? false : true"
      class="pr-4"
      app
      :hide-on-scroll="$vuetify.breakpoint.mobile ? false : true"
    >
      <!-- collapse-on-scroll="true" -->
      <v-btn text block @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon> Menu
      </v-btn>
    </v-app-bar>

      <!-- Menu hided -->
      <v-navigation-drawer
        app
        v-model="drawer"
        temporary
        class="px-3"
        height="100%"
        :width="$vuetify.breakpoint.mobile ? '100%' : '30%'"
      >

        <!-- Menu items -->
        <v-list
          nav
          dense
          style="margin:auto"
        >
          <div :style="!$vuetify.breakpoint.mobile ? 'height:8em' : 'height:2em'"></div>


          <v-list-item title="Informações" href="#info">
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Informações
            </v-list-item-title>
          </v-list-item>

          <!-- Seções -->
          <v-list-group
            :value="group"
            prepend-icon="mdi-menu-down"
          >
            <template v-slot:activator>
              <v-list-item-title>Seções</v-list-item-title>
            </template>
            <!-- Iterate over section -->
            <v-list-item
              v-for="([name, link, icon], i) in sections"
              :key="i"
              link
              :title="name"
              :href="link"
              class="ml-5"
            >
              <v-list-item-icon>
                <v-icon>
                  {{icon}}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{name}}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Confirmation -->
          <v-list-item title="Confirmação" href="#confirmation">
            <v-list-item-icon>
              <v-icon>mdi-check-all</v-icon>
            </v-list-item-icon>

            <v-list-item-title >
              Confirmar e enviar
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- UI: Exit button when in mobile -->
        <div style="bottom:0; position:fixed; left:50%; transform: translate(-50%, -50%);">
          <v-btn
            v-if="$vuetify.breakpoint.mobile"
            elevation="0"
            align="center"
            class="red ma-5 white--text"
            v-on:click="drawer=false"
            title="Fechar o menu"
          >
            <v-icon size="24px" alt="Fechar o menu"> mdi-close </v-icon>
            <span>Fechar o menu</span>
          </v-btn>
        </div>
      </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name:'Navbar',
  data() {
    return {
      sections: [
        ["Visão geral", "#sec1", "mdi-share"],
        ["Conhecimento técnico", "#sec2", "mdi-share"],
        ["Conhecimento, métodos e ferramentas fundamentais de computação básica", "#sec3", "mdi-share"],
        ["Conhecimento, métodos e ferramentas na área de sistemas de software", "#sec4", "mdi-share"],
        ["Conhecimentos básicos em sistemas de comunicação", "#sec5", "mdi-share"],
        ["Competências, habilidades e atributos pessoais e profissionais", "#sec6", "mdi-share"],
        ["Competências e habilidades interpessoais: trabalho em equipe e comunicação", "#sec7", "mdi-share"],
      ],
      group: false,
      drawer: false,
    };
  },
};
</script>
