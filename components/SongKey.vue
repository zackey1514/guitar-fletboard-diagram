<template>
  <v-select
    v-model="key"
    label="Key"
    :color="color"
    :item-color="color"
    :items="notes"
  />
</template>

<script>
import * as noteName from '../lib/note'

export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      key: 'C',
      color: this.$config.color
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
  watch: {
    // key（音名）が変わると、対応した音番号を代入する
    key() {
      this.localValue = noteName.getNoteNum(this.key)
    }
  },
}
</script>
