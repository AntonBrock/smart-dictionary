<template>
  <div class="searchBlock">
    <div class="searchBlock__field">
      <input 
        @focus="inputUnActive = false"
        @blur="inputUnActive = true"
        type="text" 
        v-model="search"
      >
      <img 
          v-show="inputUnActive"
          src="../assets/iconSearch.svg" 
          alt="searchField">
    </div>
    <div 
      v-if="getActiveStarredList"
      class="searchBlock__partsOfSpeech"
    >
      <speech-filter />
    </div>
  </div>
</template>

<script>

  import api from '../api/api'
  import { mapGetters } from 'vuex'

  import SpeechFilter from './SmartDictionarySpeechFilter'

  export default {
    name: "SmartDictionarySearch",
    data() {
      return {
        search: null,
        inputUnActive: true
      }
    },
    components: {
      SpeechFilter
    },
    watch: {
      search() {
        if(this.search !== null && !this.getActiveStarredList ) {
          this.$emit("search", this.search)
          api.get(this.search)
          .then(res => {
            let newWord = {
              "word": res.data.word,
              "partOfSpeech": res.data.results[0].partOfSpeech,
              "definition": res.data.results[0].definition,
              "pronunciation": res.data.pronunciation.all,
              "synonyms": res.data.results[0].synonyms,
              "examples": res.data.results[0].examples,
              "similarTo": res.data.results[0].similarTo,
              "starred": false,
              "showMore": false
            }
            this.$store.commit("data/setSearchingList", newWord)
          }).catch(err => console.log(err))
        } else {
          if(this.getActiveStarredList) {
            this.$store.commit("data/searchInStarredList",this.search)
          }
        }
      },
      getActiveStarredList(val) {
        if(val) {
          this.search = ""
        }
      }
    },
    computed: {
      ...mapGetters('data', ['getActiveStarredList'])
    }
  }
</script>

<style lang="sass" scoped>
  .searchBlock
    background: #efefef
    min-height: 150px
    padding: 10px
    margin-right: 30px
    border-radius: 5px
    &__partsOfSpeech
      text-align: left
      margin-top: 10px
    &__field 
      position: relative
      > input
          height: 40px
          width: 100%
          outline: none
          color: #333333
          font-size: 15px
          border-radius: 5px
          border: 1px solid #b1ddfd
          &::placeholder
            color: #cccccc
      > img
          position: absolute
          right: 5%
          top: 12px
          width: 20px
  @media screen and (max-width: 768px)
    .searchBlock
      margin-right: unset
</style>