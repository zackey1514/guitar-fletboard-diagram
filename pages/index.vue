<template>
  <div>
    <Map v-for="i in map" :key="i" />
    <v-row>
      <v-col>
        <v-btn @click="addMap">
          Add
        </v-btn>
        <v-btn @click="removeMap">
          Remove
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: 1
    }
  },
  methods: {
    addMap() {
      this.map++
    },
    removeMap() {
      if (this.map > 1) {
        this.map--
      }
    }
  }
}
</script>
