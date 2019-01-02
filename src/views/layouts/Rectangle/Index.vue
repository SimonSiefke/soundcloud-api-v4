<template>
  <div class="layout--leftright">
    <div class="container">
      <svg>
        <rect v-for="(rectangle,index) in rectangles" :key="index" :style="{'fill':rectangle.color}" :width="rectangle.width" height="rectangle.height" :x="rectangle.x" :y="rectangle.y" @click="activeIndex=index"/>
      </svg>
    </div>
    <div class="controls">
    <button type="reset" @click="reset">reset</button>
      <div v-if="activeIndex!==-1" >
      <label for="width">
        Width
      </label>

    <input id="width" v-model.number="activeRectangle.width" type="number" />
    <label for="height">Height</label>
    <input v-model.number="activeRectangle.height" type="number" />
    <label for="x">X</label> <input id="x" v-model.number="activeRectangle.x" type="number" :disabled="isOtherAtLeft"/>
   <label for="y">Y</label> <input id="y" v-model.number="activeRectangle.y" type="number" :disabled="isOtherAtTop" />

   <textarea v-model="rectanglesJSON" ols="30" rows="10"/>
      </div>
      </div>
  </div>
</template>
<script lang="ts">

import Vue from 'vue'
import _ from 'lodash'

// @ts-ignore
const randomColor = () => {
  const rand = () => Math.floor(Math.random() * 255)
  return `rgb(${rand()},${rand()},${rand()})`
}

// @ts-ignore
const rectangles = require('./rectangles.json')

const getInitialRectangles = () => {
  let rectangles = []
  const localStorageRectangles = localStorage.getItem('RECTANGLES')
  const initialRectangles = require('./rectangles.json')
  if (localStorageRectangles) {
    rectangles = JSON.parse(localStorageRectangles)
  } else if (initialRectangles) {
    rectangles = initialRectangles
  }
  // @ts-ignore
  return rectangles.map(r => ({ ...r, color: r.color || randomColor() }))
}
export default Vue.extend({
  data() {
    return {
      activeRectangle: null as null | object,
      activeIndex: -1,
      rectangles: getInitialRectangles(),
      hasChanged: false,
    }
  },
  computed: {
    computedActiveRectangle(): object {
      return { ...this.activeRectangle }
    },
    isOtherAtLeft(): boolean {
      if (this.activeRectangle === null) {
        return true
      }

// @ts-ignore
      const { y, height, x, width } = this.activeRectangle
      return (
        !!this.rectangles.find(
// @ts-ignore
          (rectangle, index) =>
            index !== this.activeIndex &&
            rectangle.x + rectangle.width === x &&
            y <= rectangle.y &&
            rectangle.y <= y + height,
        ) || x === 0
      )
    },
    isOtherAtTop(): boolean {
      if (this.activeRectangle === null) {
        return true
      }
// @ts-ignore

      const { y, height, x, width } = this.activeRectangle
      return (
        !!this.rectangles.find(
// @ts-ignore

          (rectangle, index) =>
            index !== this.activeIndex &&
            rectangle.y + rectangle.height === y &&
            x <= rectangle.x &&
            rectangle.x <= x + width,
        ) || y === 0
      )
    },
    rectanglesJSON(): string {
      return JSON.stringify(this.rectangles)
    },
  },
  watch: {
    rectangles: {
      handler(value) {
        this.putIntoLocalStorage(value)
      },
      deep: true,
    },
    activeIndex(value) {
      const rectangle = this.rectangles[value]
      this.hasChanged = false
      this.activeRectangle = rectangle
    },
    computedActiveRectangle: {
      handler(newValue, oldValue) {
        if (!this.hasChanged) {
          this.hasChanged = true
          return
        }
        const { x, y, width, height } = oldValue
        const {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        } = newValue

        const otherRectangles = this.rectangles.filter(
// @ts-ignore

          (_, index) => index !== this.activeIndex,
        )

        for (const rectangle of otherRectangles) {
          const isAtTop =
            rectangle.y === y + height &&
            rectangle.x <= x &&
            x <= rectangle.x + rectangle.width

// @ts-ignore
          const isAtLeft =
            rectangle.x + rectangle.width === x &&
            y <= rectangle.y &&
            rectangle.y <= y + height
          const isAtTopOther = otherRectangles.find(
            r =>
              r !== rectangle &&
              rectangle.y === r.y + r.height &&
              rectangle.x <= r.x &&
              r.x <= rectangle.x + rectangle.width,
          )
          const goesUp = newY + newHeight > y + height
          const goesDown = !goesUp

          if (
            rectangle.x === x + width &&
            rectangle.y <= y &&
            y <= rectangle.y + rectangle.height
          ) {
            this.$set(rectangle, 'x', newX + newWidth)
          } else if (isAtTop && (goesUp || (!isAtTopOther && goesDown))) {
            this.$set(rectangle, 'y', newY + newHeight)
          }

          let isLeftFree = true
          while (true) {
            isLeftFree =
              rectangle.x > 0 &&
              !this.rectangles.find(
                r => r !== rectangle && r.x + r.width === rectangle.x,
              )
            console.log(isLeftFree)
            console.log(
              this.rectangles.indexOf(
                this.rectangles.find(
// @ts-ignore

                  r => r !== rectangle && r.x + r.width === rectangle.x,
                ),
              ),
            )
            console.log(rectangle.x > 0)
            if (!isLeftFree) {
              break
            }
            this.$set(rectangle, 'x', rectangle.x - 1)
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    putIntoLocalStorage: _.throttle(value => {
      localStorage.setItem('RECTANGLES', JSON.stringify(value))
    }, 10),
    reset() {
      localStorage.removeItem('RECTANGLES')
      this.rectangles = getInitialRectangles()
    },
  },
})
</script>


<style lang="stylus" scoped>
svg
  height calc(100vh - 200px)
  width 100%

.controls
  color white
  display grid
  grid-gap 0.5rem 1rem
  grid-template-columns auto 1fr

  button
    grid-column span 2

  div
    display contents
</style>
