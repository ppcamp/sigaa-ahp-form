<template>
  <v-container class="pa-5 my-5">
    <v-divider></v-divider>

    <!-- Title -->
    <p
      class="text-center display-1 my-5 pb-4"
      :id="linkId"
    >
      {{ title }}
    </p>

    <!-- Questions -->
    <div v-for="(a, iA) in obj.questions" :key="a">
      <v-row
        v-for="(b, iB) in obj.questions.slice(iA)"
        :key="b"
        min-height=""
      >
        <v-row v-if="a != b" class="px-5">
          <v-col cols="5">
            <span class="font-weight-bold"> {{ a }} </span>
          </v-col>
          <v-col cols="2" class="text-center">
            <span class="font-weight-bold"> vs </span>
          </v-col>
          <v-col cols="5" class="text-right">
            <span class="font-weight-bold">
              {{ b }}
            </span>
          </v-col>
        </v-row>

        <!-- Sliders -->
        <v-card-text v-if="a != b">

          <v-slider
            step="1"
            :min="ahp.min"
            :max="ahp.max"
            :tick-labels="ahp.ticks"
            class="font-weight-bold text--darken-2 grey--text slider"
            color="indigo lighten-1"
            track-color="indigo lighten-1"
            v-model="obj.formMatrix[iA][iB + iA]"
            @change="onSliderChange(iA, iB + iA, obj)"
          >
          </v-slider>

        </v-card-text>
      </v-row>
    </div>

    <!-- UI: inconsistent responses -->
    <UiSectionError :show="!obj.valid" :ciIndex="obj.ci"/>
  </v-container>
</template>

<script>
import UiSectionError from '@/components/form/ui/SectionError';
import { AhpData, FormSectionData } from "@/libraries/types";

export default {
  name: 'FormQuestion',

  components: {
    UiSectionError
  },

  props: {
    linkId: { type: String },
    title: { type: String },
    obj: { type: FormSectionData },
    ahp: { type: AhpData },
    onSliderChange: { type: Function },
  }
}
</script>

<style scoped>
  .slider {
    font-size: 0.9em;
    height: 10em !important;
  }
</style>