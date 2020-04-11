<template>
  <div class="header">
    <div class="header__tabs tab">
      <div 
        class="tab__keeper" 
        @click="toggleList"
      >
        <span>Word Keeper</span>
      </div>
      <div 
        @click="toggleList"
        class="tab__starred"
      >
        <img src="../assets/iconStarred.png" alt="starred">
        <span>Starred Words</span>
      </div>
    </div>
    <div class="header__activeTitle">
      <h1 v-if="!getActiveStarredList">Word Keeper</h1>
      <h1 v-else>Starred Words</h1>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: "SmartDictionaryHeader",
    data() {
      return {
        choosedStarredList: false
      }
    },
    computed: {
      ...mapGetters('data', ['getActiveStarredList'])
    },
    methods: {
      toggleList() {
        this.$store.commit("data/toggleActiveStarredList")
      }
    }
  }
</script>

<style lang="sass" scoped>
  .header
    width: 100%
    &__tabs
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
      height: 50px
      background: #6ec0fb
      border-radius: 3px
    &__activeTitle
      text-align: left
      color: #363636
      font-size: 1.5rem
  .tab
    &__starred, 
    &__keeper
      color: white
      font-size: 18px
      cursor: pointer
      padding-left: 30px
      padding-right: 30px
    &__starred > img
      width: 20px
      margin-right: 10px
    &__starred
      display: flex
      align-items: center
</style>