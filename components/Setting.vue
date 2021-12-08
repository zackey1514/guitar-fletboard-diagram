<template>
  <v-expansion-panels
    v-model="isOpen"
    :readonly="!(isSm || isXs)"
  >
    <v-expansion-panel>
      <v-expansion-panel-header
        :hide-actions="!(isSm || isXs)"
      >
        <div>
          <v-icon dense>
            mdi-tune-vertical
          </v-icon>
          Setting
        </div>
        <template #actions>
          <v-icon :color="color">
            $expand
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col>
            <SongKey v-model="localSongKey" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="localSongScaleName"
              label="Scale"
              :color="color"
              :item-color="color"
              :items="scales"
              item-text="display"
              item-value="name"
              dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Slider
              v-model="localFlet"
              title="Flet"
              :min="12"
              :max="24"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Slider
              v-model="localCapo"
              title="Capo"
              :min="0"
              :max="flet"
            />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import scale from '../lib/scales'

export default {
  props: {
    songKey: {
      type: Number,
      default: 0
    },
    capo: {
      type: Number,
      default: 0,
    },
    flet: {
      type: Number,
      default: 0,
    },
    songScale: {
      type: Array,
      default: () => [],
    },
    songScaleName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      color: this.$config.color,
    }
  },
  computed: {
    scales() {
      return scale
    },
    isSm() {
      return this.$vuetify.breakpoint.name === 'sm'
    },
    isXs() {
      return this.$vuetify.breakpoint.name === 'xs'
    },
    localSongKey: {
      get() {
        return this.songKey
      },
      set(newVal) {
        this.$emit('update:songKey', newVal)
      }
    },
    localCapo: {
      get() {
        return this.capo
      },
      set(newVal) {
        this.$emit('update:capo', newVal)
      }
    },
    localFlet: {
      get() {
        return this.flet
      },
      set(newVal) {
        this.$emit('update:flet', newVal)
      }
    },
    localSongScale: {
      get() {
        return this.songScale
      },
      set(newVal) {
        this.$emit('update:songScale', newVal)
      }
    },
    localSongScaleName: {
      get() {
        return this.songScaleName
      },
      set(newVal) {
        this.$emit('update:songScaleName', newVal)
      }
    },
    // breakpoint が sm 以下の時は常に開けておく
    isOpen() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return undefined
        case 'sm': return undefined
        default: return 0
      }
    }
  },
}
</script>
