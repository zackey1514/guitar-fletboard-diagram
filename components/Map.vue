<template>
  <v-container class="map-container my-4">
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <Setting
          :song-key.sync="songKey"
          :capo.sync="capo"
          :flet.sync="fletNumber"
          :song-scale.sync="songScales"
          :song-scale-name.sync="songScaleName"
        />
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-btn
              outlined
              x-small
              fab
              dark
              :color="color"
              @click="tuneAllDown()"
            >
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
            半音上げ下げ
            <v-btn
              outlined
              x-small
              fab
              dark
              :color="color"
              @click="tuneAllUp()"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-btn
              small
              outlined
              :color="color"
              plain
              @click="reset"
            >
              reset
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <table>
            <tbody>
              <tr>
                <div>開放弦</div>
                <th
                  v-for="(flet, fi) in flets"
                  :key="fi"
                >
                  {{ flet }}
                </th>
              </tr>
              <tr
                v-for="(mapNoteName, si) in mapNoteNames"
                :key="si"
              >
                <div
                  class="d-flex flex-row open-string"
                >
                  <div>
                    <div>
                      <button
                        class="btn-tune"
                        @click="tuneUp(si)"
                      >
                        +
                      </button>
                    </div>
                    <div
                      class="string-name"
                    >
                      {{ openStringNames[si] }}
                    </div>
                    <div>
                      <button
                        class="btn-tune"
                        @click="tuneDown(si)"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <td
                  v-for="(note, ni) in mapNoteName"
                  :key="ni"
                  :class="[ note === songKeyName ? 'root' : '',
                            ni < capo ? 'disable' : '',
                            ni > 0 ? 'string' : '']"
                >
                  <div
                    :class="[note ? 'note' : '']"
                  >
                    {{ note }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            {{ openStrings }}
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { range } from '../lib/util'
import scale from '../lib/scales'
import { getNoteName, getFullNoteName, getScaleNoteName } from '../lib/note'

export default {
  data () {
    return {
      color: this.$config.color,
      capo: 0,
      // 6弦
      fletNumber: 14,
      // 開放弦の音番号 1弦->6弦
      openStrings: [52, 47, 43, 38, 33, 28],
      openStringNames: [],
      // スケールマップに描画される音番号
      mapNoteNumbers: [],
      // スケールマップに描画される音名
      mapNoteNames: [],
      songKey: 0,
      // スケールがt/fで入る
      songScales: [],
      songScaleNotes: [],
      songScaleName: 'major',
      // scales: scale,
    }
  },
  computed: {
    flets() {
      return range(this.fletNumber + 1)
    },
    songKeyName() {
      return getNoteName(this.songKey)
    }
  },
  watch: {
    openStrings() {
      this.makeMap()
    },
    flets() {
      this.makeMap()
    },
    notes() {
      this.makeMap()
    },
    songKey() {
      this.makeScale()
      this.makeMap()
    },
    songScaleName() {
      this.makeScale()
      this.makeMap()
    },
    search() {
      const searchRegExp = new RegExp(this.search)
      this.more = this.more2.filter((m) => {
        return searchRegExp.test(m)
      })
    }
  },
  created() {
    this.makeScale()
    this.makeMap()
  },
  methods: {
    addItem (index) {
      if (this.items.length > 3) {
        const removed = this.items.splice(1, 1)
        this.more.push(...removed)
      }
      this.items.push(
        ...this.more.splice(index, 1),
      )
      this.$nextTick(() => { this.currentItem = this.items.length - 1 })
    },
    // スケールマップを描画する値を代入していく
    makeMap() {
      // スケールマップ上の音番号
      this.mapNoteNumbers =
        this.openStrings.map((openString) => {
          return this.flets.map((f) => {
            return openString + f
          })
        })
      // スケールマップ上の音名
      this.mapNoteNames =
        this.mapNoteNumbers.map((stringNoteNumber) => {
          return stringNoteNumber.map((note) => {
            return getScaleNoteName(note, this.songScaleNotes)
          })
        })
      // 開放弦の国際式音名
      this.openStringNames =
        this.openStrings.map((openString) => {
          return getFullNoteName(openString)
        })
    },

    // キーに合わせてスケールの順番を変える（キーを先頭にした配列にする）
    makeScale() {
      // const _scaleObj = this.scales.find(s => s.name === this.songScaleName)
      const _scaleObj = scale.find(s => s.name === this.songScaleName)
      const scales = [..._scaleObj.notes]
      let i = 0
      let tmp
      while (i < this.songKey) {
        tmp = scales.pop()
        scales.unshift(tmp)
        i++
      }
      // この辺どうにかしたい
      this.songScales = scales
      this.songScaleNotes = scales.map((isInScale, index) => {
        if (isInScale) {
          return getNoteName(index)
        } else {
          return ''
        }
      })
    },

    // チューニング上げ下げ 開放弦の音番号を変更する
    tuneUp(stringNumber) {
      this.openStrings.splice(stringNumber, 1, this.openStrings[stringNumber] + 1)
    },
    tuneDown(stringNumber) {
      this.openStrings.splice(stringNumber, 1, this.openStrings[stringNumber] - 1)
    },
    tuneAllUp() {
      for (const stringNumber of range(this.openStrings.length)) {
        this.openStrings.splice(stringNumber, 1, this.openStrings[stringNumber] + 1)
      }
    },
    tuneAllDown() {
      for (const stringNumber of range(this.openStrings.length)) {
        this.openStrings.splice(stringNumber, 1, this.openStrings[stringNumber] - 1)
      }
    },

    // チューニングをデフォルト状態へリセット
    reset() {
      this.openStrings = [52, 47, 43, 38, 33, 28]
    }
  },
}
</script>

<style lang="scss" scoped>

table {
  table-layout: fixed;
  width: 100%;
  color: #50514F;
}

th {
  height: 2em;
  text-align: center;
}

td {
  position: relative;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  width: 2.15em;
  min-width: 2.15em;
  max-width: 2.15em;
  height: 2em;
  text-align: center;
  line-height: 1;
  vertical-align: middle;
}

.string {
  background: linear-gradient(to bottom, #ccc, transparent 1px) 0% 100% / 100% 50% no-repeat, transparent;
}

.note {
  color: #fff;
  border-radius: 50%;
  background: #858caf;
  display: inline-block;
  text-align: center;
  padding: 3px 6px;
}

.open-string {
  width: 4em;
  height: 4em;
}

.btn-tune {
  width: 1em;
  height: 1em;
  font-size: 0.9em;
  border-radius: 50%;
  background: #3F51B5;
  color: #fff;
  text-decoration: none;
}

.root {
  color: red;
}

.disable {
  background-color: black;
  color: black;
}

</style>
