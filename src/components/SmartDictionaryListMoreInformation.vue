<template>
  <div class="moreInformation">
    <div
      v-show="word.pronunciation" 
      class="moreInformation__pronunciation pronunciation"
    >  
      <span class="pronunciation__title">Transcription: </span>
      <span class="pronunciation__body">{{word.pronunciation}}</span>
    </div>
    <div 
      v-show="word.synonyms"
      class="moreInformation__container"
    >  
      <span class="moreInformation__title">Synonyms: </span>
      <div
        class="moreInformation__body"
        v-for="(item, index) in word.synonyms"
        :key='item + index'
      >
        <span>{{item}}</span>
      </div>
    </div>
    <div 
      v-show="word.examples"
      class="moreInformation__container"
    >
      <span class="moreInformation__title">Examples: </span>
      <div
        class="moreInformation__body"
        v-for="(item, index) in word.examples"
        :key='item + index'
      >
        <span>{{item}}</span>
      </div>
    </div>
    <div 
      v-show="word.similarTo"
      class="moreInformation__container"
    >
      <span class="moreInformation__title">Similar To:</span>
      <div
        class="moreInformation__body"
        v-for="(item, index) in word.similarTo"
        :key='item + index'
      >
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmartDictionaryMoreInformation",
  props: {
    word: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
  .moreInformation
    &__pronunciation
      text-align: left
      margin-bottom: 10px
    &__container
      text-align: left
      margin-bottom: 10px
    &__title
      font-weight: bold
    &__body
      margin-top: 3px
      margin-left: 10px
  .pronunciation
    &__title
      font-weight: bold
    &__body
      font-style: italic
</style>