<template>
  <div>
    <v-subheader>{{ title }}</v-subheader>
    <v-slider
      v-model="localValue"
      :color="color"
      track-color="grey"
      always-dirty
      thumb-label
      :min="min"
      :max="max"
    >
      <template #prepend>
        <v-icon
          :color="color"
          @click="decrese"
        >
          mdi-minus
        </v-icon>
      </template>
      <template #append>
        <v-icon
          :color="color"
          @click="increse"
        >
          mdi-plus
        </v-icon>
      </template>
    </v-slider>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      color: this.$config.color,
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    },
  },
  methods: {
    increse() {
      this.localValue += 1
    },
    decrese() {
      this.localValue -= 1
    },
  }
}
</script>
