<template>
  <div class="speechFilter">
    <div v-for="(item, index) in partOfSpeechList" :key="item + index">
      <label 
          class="speechFilter__checkBox checkBox"
      > {{item.partOfSpeech}}
        <input 
          @change="activeSpeechFilter(item)"
          type="checkbox"
          v-model="item.checked"
        >
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
          // this.getPartOfSpeechList
          return []
        } else { return [] }
      }
    },
    methods: {
      activeSpeechFilter(item) {
        if(item.checked) {
          this.$store.commit("data/activeSpeechFilter", item.partOfSpeech)
        } else {
          this.$store.commit("data/activeSpeechFilter", null)
        }
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