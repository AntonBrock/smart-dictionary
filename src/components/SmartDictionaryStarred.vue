<template>
  <div class="list">
    <div v-if="starredList.length > 0">
      <draggable 
          v-model="starredList" 
          group="starredList" 
      >
        <div
          v-for="(word, index) in starredList"
          :key="index" 
          class="list__words word"
        >
          <div
            :class="{'word__container--open': word.showMore}"
            class="word__container container"
          >
            <div class="container__mainInformation">
              <img 
                class="container__dragIcon" 
                src="../assets/dragIcon.svg" alt="drag" 
                width="15" title="Try to drag the word"
              >
              <div
                @click="wantToShowMore(word)" 
                class="container__title"
                title="More information"
              > 
                <span>{{word.word}}</span>
              </div>     
              <div class="container__part">
                <span>{{word.partOfSpeech}}</span>
              </div>
              <div class="container__definition" :title="word.definition">
                <span>{{word.definition}}</span>
              </div>
            </div>
             <more-information 
                class="container__moreInformation "
                v-if="word.showMore" 
                :word="word" 
              />
          </div>
          <div class="word__buttonStart">
            <button title="Unstarred" @click="unStarred(word)">
              <img src="../assets/fullyBlueStarIcon.png" alt="fullyStar" width="20">
            </button>
          </div>
        </div>
      </draggable>
    </div>
    <div v-else>
      <p class="list--empty">Time to add your first word to favorite list!</p>
    </div>
  </div>
</template>

<script>
  
  import { mapGetters } from "vuex"
  import draggable from 'vuedraggable'
  import MoreInformation from './SmartDictionaryListMoreInformation'

  export default {
    name: "SmartDictionaryStarred",
    data() {
      return {}
    },
    components: {
      draggable,
      MoreInformation
    },
    computed: {
      ...mapGetters('data', ['getStarredList', 'getSearchValueStarttedList']),
      starredList: {
        get() {
          if (this.getSearchValueStarttedList !== "") {
           let filteredList = this.getStarredList.filter(item => {
              const title = item.word.toLowerCase()
              return title.includes(this.getSearchValueStarttedList ? this.getSearchValueStarttedList.toLowerCase() : '')
            })
              return filteredList
          } else {
            return this.getStarredList
          }
        },
        set(value) {
          this.$store.commit("data/updateStarredList", value)
        }
      },
      dragOptions() {
        return {
          animation: 500,
          group: "starredList",
          disabled: false,
          ghostClass: "ghost"
        }
      },
    },
    methods: {
      unStarred(item) {
        this.$store.commit('data/unSetStarredWord', item)
      },
      wantToShowMore(item) {
        item.showMore = !item.showMore
      }
    }
  }
</script>

<style lang="sass" scoped>
  .container
    &__dragIcon
      margin-right: 10px
      cursor: grab
</style>