<!-- this component cannot be functional component yet because of https://github.com/vuejs/vue-loader/issues/1136 -->
<template>
  <!-- using tabindex 0 on the div to make it focusable via keyboard -->
  <div
    :class="{active: active}"
    class="track"
    tabindex="0"
    @click="togglePlay(track)"
    @keydown.enter="togglePlay(track)">
    <div class="image-container">
      <img
        v-if="track && track.cover"
        :src="track.cover"
        crossorigin="anonymous"
        alt="">
    </div>
    <div class="info-container">
      <span class="user-name">
        {{ track ? track.userName : '' }}
      </span>
      <p
        tabindex="-1"
        class="track-name">
        {{ track ? track.name : '' }}
      </p>
    </div>
    <div
      v-if="track && track.audioShouldBeState==='SHOULD_BE_PLAYING' && track.audioState!=='PLAYING'"
      class="loading"> loading </div>
    <div
      v-if="track && track.audioState==='PLAYING'"
      class="equalizer"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Track } from '@/types'

@Component({
  name: 'BasicTrackListCard',
})
export default class BasicTrackListCard extends Vue {
  /*********
   * Props *
   *********/
  @Prop({ default: null })
  private track!: Track

  @Prop({ required: true })
  private active!: boolean

  /***********
   * Methods *
   ***********/
  @Action('player/togglePlay') private togglePlay!: () => void
}
</script>

<style scoped lang="stylus">
// TODO: lazyload images
.track
  box-sizing border-box // on focus, the element shouldn't change its size
  position relative
  display flex
  border 2px solid transparent // use a transparent border so that the content doesn't jump when we focus and add a border
  // TODO: margin or padding?
  padding var(--space__small) var(--space__small) var(--space__small) var(--space__small)

.navigation--tab .track:focus
  border-color var(--user-name-color)

.track:not(:last-of-type):after
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

.track.active
  // TODO: glass effect maybe?

.image-container
  overflow hidden // some images are not square
  width 50px
  height @width
  background 'rgba(%s, 0.3)' % var(--divider-line-color)
  flex-shrink 0 // make it full width and height

.image-container img
  width 100%
  height 100%
  object-fit cover // make it full width and height and crop it

.info-container
  overflow hidden // we don't want a scrollbar
  display flex
  flex-direction column // wrap elements vertically
  margin-right 1rem // space for equalizer
  padding 0 var(--space__small)

.user-name, .track-name
  overflow-x hidden // we don't want a horizontal scrollbar
  text-overflow ellipsis // replace too long text with "..." at the end
  user-select none // we don't want text to be selectable
  white-space nowrap // force text to single line

.user-name
  /* lineheight must be larger so that letters like y and g don't get cut, but that introduces extra space, with we take care of with a negative margin-top */
  $font-size = 0.75rem
  $half-line-height-extra-space = -1 * $font-size * 0.25
  $margin-top = 0.3rem // bring username more to center
  $margin-bottom = 0.11rem // less vertical space between texts
  margin-top $margin-top + $half-line-height-extra-space
  margin-bottom $margin-bottom + $half-line-height-extra-space
  color var(--user-name-color)
  font-size $font-size
  line-height $font-size * 1.5 // 50% larger than font-size

  &:empty
    width 100px
    height @font-size
    margin-top $margin-top
    margin-bottom $margin-bottom
    background-image linear-gradient(100deg, transparent, 'rgba(%s, 0.2)' % var(--divider-line-color) 50%, transparent 200px), linear-gradient('rgba(%s, 0.3)' % var(--divider-line-color), 'rgba(%s, 0.3)' % var(--divider-line-color)) // placeholder color
    background-size 30px 200px /* highlight */, 200px 200px /* placeholder content */
    background-repeat no-repeat
    animation shine 1s linear infinite
    background-position -200px 0 /* highlight */, 0 0 /* placeholder content */

.track-name
  /* lineheight must be larger so that letters like y and g don't get cut, but that introduces extra space, with we take care of with a negative margin-top */
  $font-size = 1rem
  $half-line-height-extra-space = -1 * $font-size * 0.25
  $margin-top = 0.05rem // bring username more to center
  margin-top $margin-top + $half-line-height-extra-space // 50% of lineheight-padding
  color var(--track-name-color)
  font-size $font-size
  line-height $font-size * 1.5

  // show an animation when its empty/loading
  &:empty
    width 200px
    height @font-size
    margin-top $margin-top
    background-image linear-gradient(100deg, transparent, 'rgba(%s, 0.2)' % var(--divider-line-color) 50%, transparent 200px), linear-gradient('rgba(%s, 0.3)' % var(--divider-line-color), 'rgba(%s, 0.3)' % var(--divider-line-color)) /* placeholder color */
    background-size 30px 200px /* highlight */, 200px 200px /* placeholder content */
    background-repeat no-repeat
    animation shine 1s linear infinite
    background-position -200px 0 /* highlight */, 0 0 /* placeholder content */

@keyframes shine
  to
    background-position 200px 0 /* highlight */, 0 0 /* placeholder content */

// equalizer
$precision = 5
$size = 4rem
$max = ($size / 2.857142857)
// When $size is 40px, $max is 14px, $width is 4px, $margin is 1px
$width = ($max / 6)
$margin = ($max / 14)
$color = var(--equalizer-background)
$equalizers = 4
$equalizerSize = ($equalizers * $width) + (($equalizers - 1) * $margin)
$bottom = (($size - $max) / 2)
$left = (($size - $equalizerSize) / 2)
// Heights
$two = round(($max / 7), $precision)
$three = round(($max / 4.666666667), $precision)
$four = round(($max / 3.5), $precision)
$five = round(($max / 2.8), $precision)
$six = round(($max / 2.333333333), $precision)
$seven = round(($max / 2), $precision)
$eight = round(($max / 1.75), $precision)
$nine = round(($max / 1.555555556), $precision)
$ten = round(($max / 1.4), $precision)
$eleven = round(($max / 1.272727273), $precision)
$twelve = round(($max / 1.166666667), $precision)
$thirteen = round(($max / 1.076923077), $precision)
$fourteen = round($max, $precision)

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
    height round($size * (1 / 2.666666667), $precision)

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
