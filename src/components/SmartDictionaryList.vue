<template>
  <div class="list">
    <div v-if="searchingList.length > 0">
      <div
          v-for="(word, index) in searchingList"
          :key="index" 
          class="list__words word"
      >
        <div 
          :class="{'word__container--open': word.showMore}"
          class="word__container container"
        >
          <div class="container__mainInformation">
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
          <button
            v-if="!word.starred" 
            @click="setStarred(word, index)" 
            title="Add to starred"
          >
            <img src="../assets/emptyBlueStarIcon.png" alt="emptyStar" width="20">
          </button>
          <button
            v-else
            title="Unstarred"
            @click="unStarred(word)" 
          >
            <img src="../assets/fullyBlueStarIcon.png" alt="fullyStar" width="20">
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="list--empty">Here it’s somehow empty .. Try to find the word!</p>
    </div>
  </div>
</template>

<script>
    
  import { mapGetters } from "vuex"
  import MoreInformation from './SmartDictionaryListMoreInformation'

  export default {
    name: "SmartDictionaryList",
    props: {
      search: {
        type: String,
        required: false,
        default: ""
      }
    },
    data() {
      return {
        showMoreDitails: false
      }
    },
    components: {
      MoreInformation
    },
    watch: {
      search() {}
    },
    computed: {
      ...mapGetters('data', ['getAllSearchList']),

      searchingList() {
        if(this.getAllSearchList) {
          return this.getAllSearchList
        } else { return [] }
      }
    },
    methods: {
      setStarred(item, index) {
        let obj = {
          index: index,
          item: item
        }
        this.$store.commit("data/setStarredWord", obj)
      },
      unStarred(item) {
        item.starred = false
        this.$store.commit("data/unSetStarredWord", item)
      },
      wantToShowMore(item) {
        item.showMore = !item.showMore
      }
    }
  }
</script>