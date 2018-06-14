<template>
  <section :class="{active: active}" @click="togglePlay(track)">
    <div class="image-container">
      <img v-if="track" :src="track.cover" alt="">
    </div>
    <div class="info-container">
      <div class="info--top">
        <span class="user-name">{{ track ? track.userName : '' }}</span>
        <span class="prop">
          <img src="@/assets/icons/heart.svg">
        </span>
      </div>
      <p class="track-name">{{ track ? track.name : '' }}</p>
    </div>
    <div class="loading" v-if="track && track.loading"> loading </div>
    <div class="equalizer" v-if="track && track.playing"></div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'BasicTrackListCard',
  props: {
    track: {
      type: Object,
      default: null,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    ...mapActions('player', ['togglePlay', 'play', 'pause']),
  },
})
</script>

<style scoped lang="stylus">
// TODO: lazyload images
section
  position relative
  display flex
  padding var(--space__small)

section:not(:last-of-type):after
  content ''
  position absolute
  width 100%
  right 0
  bottom 0
  height 2px
  // create a gradient border as a divider between sections
  background linear-gradient(
    to right,
    'rgba(%s, 0)' % var(--divider-line-color),
    'rgba(%s, 0.2)' % var(--divider-line-color),
    'rgba(%s, 0.2)' % var(--divider-line-color),
    'rgba(%s, 0.4)' % var(--divider-line-color),
    'rgba(%s, 0.2)' % var(--divider-line-color)
  )

section.active
  // TODO: glass effect

.image-container
  width 50px
  height @width
  background 'rgba(%s, 0.3)' % var(--divider-line-color)
  flex-shrink 0

.image-container img
  width 100%

.info-container
  overflow hidden // we don't want a scrollbar
  display flex
  flex-direction column // wrap elements vertically
  margin-right 1rem // space for equalizer
  padding 0 var(--space__small)

.user-name, .track-name
  box-sizing border-box
  overflow-x hidden // we don't want a horizontal scroll bar
  text-overflow ellipsis // replace too long text with "..." at the end
  user-select none // we don't want text to be selectable
  white-space nowrap // force text to single line

.user-name
  /* lineheight must be larger so that letter don't get cut up, but that introduces extra space, with we take care of with a negative margin-top */
  $font-size = 0.7rem
  $half-line-height-extra-space = -1 * $font-size * 0.25
  $margin-top = 0.3rem // bring username more to center
  $margin-bottom = 0.11rem // less vertical space between texts
  margin-top $margin-top + $half-line-height-extra-space
  margin-bottom $margin-bottom + $half-line-height-extra-space
  color var(--user-name-color)
  font-size $font-size
  line-height $font-size * 1.5 /* 50% larger than font-size */

  &:empty
    width 100px
    height @font-size
    margin-top $margin-top
    margin-bottom $margin-bottom
    background-image linear-gradient(100deg, transparent, 'rgba(%s, 0.2)' % var(--divider-line-color) 50%, transparent 200px), linear-gradient('rgba(%s, 0.3)' % var(--divider-line-color), 'rgba(%s, 0.3)' % var(--divider-line-color)) /* placeholder color */
    background-size 30px 200px /* highlight */, 200px 200px /* placeholder content */
    background-repeat no-repeat
    animation shine 1s linear infinite
    background-position -200px 0 /* highlight */, 0 0 /* placeholder content */

.info--top
  display flex
  align-items center

  // height 10px
  .prop
    $scale = 0.8
    /* lineheight must be larger so that letter don't get cut up, but that introduces extra space, with we take care of with a negative margin-top */
    $font-size = 0.7rem
    $half-line-height-extra-space = -1 * $font-size * 0.25
    $margin-top = 0.3rem // bring username more to center
    $margin-bottom = 0.11rem // less vertical space between texts
    display flex
    width 0.7rem * $scale
    height 0.7rem * $scale
    margin-top $margin-top + $half-line-height-extra-space * 2
    margin-bottom $margin-bottom + $half-line-height-extra-space
    margin-left 0.5rem

    >*
      width 100%

.track-name
  /* lineheight must be larger so that letter don't get cut up, but that introduces extra padding, with we take care of with a negative margin-top */
  $font-size = 0.9rem
  margin-top -1 * $font-size * 0.25 /* 50% of lineheight-padding */
  color var(--track-name-color)
  font-size $font-size
  line-height $font-size * 1.5

  &:empty
    width 200px
    height @font-size
    margin-top 0
    background-image linear-gradient(100deg, transparent, 'rgba(%s, 0.2)' % var(--divider-line-color) 50%, transparent 200px), linear-gradient('rgba(%s, 0.3)' % var(--divider-line-color), 'rgba(%s, 0.3)' % var(--divider-line-color)) /* placeholder color */
    background-size 30px 200px /* highlight */, 200px 200px /* placeholder content */
    background-repeat no-repeat
    animation shine 1s linear infinite
    background-position -200px 0 /* highlight */, 0 0 /* placeholder content */

@keyframes shine
  to
    background-position 200px 0 /* highlight */, 0 0 /* placeholder content */

// equalizer
$size = 4rem
$max = ($size / 2.857142857)
// When $size is 40px, $max is 14px, $width is 4px, $margin is 1px
$width = ($max / 6)
$margin = ($max / 14)
$color = var(--equalizer-color)
$equalizers = 4
$equalizerSize = ($equalizers * $width) + (($equalizers - 1) * $margin)
$bottom = (($size - $max) / 2)
$left = (($size - $equalizerSize) / 2)
$two = ($max / 7)
// Heights
$three = ($max / 4.666666667)
$four = ($max / 3.5)
$five = ($max / 2.8)
$six = ($max / 2.333333333)
$seven = ($max / 2)
$eight = ($max / 1.75)
$nine = ($max / 1.555555556)
$ten = ($max / 1.4)
$eleven = ($max / 1.272727273)
$twelve = ($max / 1.166666667)
$thirteen = ($max / 1.076923077)
$fourteen = $max

.equalizer
  position absolute
  display block
  width $width
  right $left
  bottom $bottom
  height $two
  background-color $color

.equalizer, .equalizer::before, .equalizer::after
  animation equalize 1.25s steps(25, end) 0s infinite

.equalizer::before, .equalizer::after
  content ''
  position absolute
  width $width
  bottom 0
  left $width + $margin
  height $max
  background-color $color

.equalizer::before
  // Equalizer 2
  animation-name equalize2

.equalizer::after
  // Equalizer 3
  left $width * 2 + $margin * 1.5
  animation-name equalize3

@keyframes equalize
  0%
    height $four

  4%
    height $two

  8%
    height $four

  12%
    height $seven

  16%
    height $ten

  20%
    height $thirteen

  24%
    height $twelve

  28%
    height $eleven

  32%
    height $eleven

  36%
    height $eight

  40%
    height $ten

  44%
    height $ten

  48%
    height $eleven

  52%
    height $twelve

  56%
    height $thirteen

  60%
    height $twelve

  64%
    height $twelve

  68%
    height $eleven

  72%
    height $ten

  76%
    height $eleven

  80%
    height $twelve

  84%
    height $twelve

  88%
    height $thirteen

  92%
    height $ten

  96%
    height $seven

  100%
    height $four

@keyframes equalize2
  0%
    height $twelve

  4%
    height $thirteen

  8%
    height $twelve

  12%
    height $twelve

  16%
    height $eleven

  20%
    height $eleven

  24%
    height $eleven

  28%
    height $twelve

  32%
    height $twelve

  36%
    height $thirteen

  40%
    height $thirteen

  44%
    height $thirteen

  48%
    height $eleven

  52%
    height $eight

  56%
    height $six

  60%
    height $eight

  64%
    height $ten

  68%
    height $eleven

  72%
    height $thirteen

  76%
    height $twelve

  80%
    height $twelve

  84%
    height $eleven

  88%
    height $eleven

  92%
    height $nine

  96%
    height $eleven

  100%
    height $twelve

@keyframes equalize3
  0%
    height $nine

  4%
    height $seven

  8%
    height $nine

  12%
    height $eleven

  16%
    height $thirteen

  20%
    height $size / 2.666666667

  24%
    height $fourteen

  28%
    height $eleven

  32%
    height $nine

  36%
    height $eight

  40%
    height $seven

  44%
    height $five

  48%
    height $eight

  52%
    height $ten

  56%
    height $eleven

  60%
    height $thirteen

  64%
    height $twelve

  68%
    height $eleven

  72%
    height $eleven

  76%
    height $ten

  80%
    height $twelve

  84%
    height $thirteen

  88%
    height $fourteen

  92%
    height $twelve

  96%
    height $ten

  100%
    height $nine
</style>
