<template>
  <v-app>
    <!-- Add more informations -->
    <Info />

    <!-- Add a navbar to iterate over "Form" -->
    <Navbar />
    <!-- Add quiz -->
    <Form />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Form from "@/components/Form";
import Info from "@/components/Info";

export default {
  name: "Home",
  components: {
    Navbar,
    Form,
    Info,
  },
};
</script>
