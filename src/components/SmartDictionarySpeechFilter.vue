<template>
  <div class="speechFilter">
    <div v-for="(item, index) in partOfSpeechList" :key="item + index">
      <label 
          @change="activeSpeechFilter(item)"
          class="speechFilter__checkBox checkBox"
      > {{item}}
        <input type="checkbox">
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "SmartDictionarySpeechFilter",
    data() {
      return {}
    }, 
    computed: {
      ...mapGetters('data', ['getPartOfSpeechList']),
      partOfSpeechList() {
        if(this.getPartOfSpeechList) {
          return this.getPartOfSpeechList
        } else { return [] }
      }
    },
    methods: {
      activeSpeechFilter(item) {
        this.$store.commit("data/activeSpeechFilter", item)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .speechFilter
    &__checkBox
      display: block
      position: relative
      padding-left: 35px
      margin-bottom: 12px
      cursor: pointer
      font-size: 19px
    &__checkBox > input
      position: absolute
      opacity: 0
      cursor: pointer
      height: 0
      width: 0
    &__checkBox input:checked ~ .checkmark
      background-color: #6ec0fb
    &__checkBox input:checked ~ .checkmark:after
      display: block

  .checkmark 
    position: absolute
    top: 0
    left: 0
    height: 24px
    width: 24px
    border-radius: 3px
    background-color: #c1c1c1
    &:after
      content: ""
      position: absolute
      display: none
</style>