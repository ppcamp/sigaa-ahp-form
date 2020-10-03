<template>
  <v-main>
    <Info />
    <Form />
  </v-main>
</template>

<script>
// @ is an alias to /src
import Info from "@/components/Info";
import Form from "@/components/Form";

export default {
  name: "Competencias",
  components: { Info, Form },
};
</script>
