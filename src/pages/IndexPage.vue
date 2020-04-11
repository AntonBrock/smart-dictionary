<template>
  <div class="container">
    <div class="container__wrapper">
      <div class="container__header">
        <smart-dictionary-header />
      </div>
      <div class="container__mainSection mainSection">
        <div class="mainSection__search">
          <smart-dictionary-search @search="searching" />
        </div>
        <div class="mainSection__list">
          <smart-dictionary-list v-if="!getActiveStarredList" :search="search" />
          <smart-dictionary-starred-list v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import SmartDictionaryHeader from '@/components/SmartDictionaryHeader.vue'
  import SmartDictionarySearch from '@/components/SmartDictionarySearch.vue'
  import SmartDictionaryList from '@/components/SmartDictionaryList.vue'
  import SmartDictionaryStarredList from '@/components/SmartDictionaryStarred'

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: "SmartDictionary",
    components: {
      SmartDictionaryHeader,
      SmartDictionarySearch,
      SmartDictionaryList,
      SmartDictionaryStarredList
    },
    computed: {
      ...mapState('data', ['searchingList', 'starredList']),
      ...mapGetters('data', ['getActiveStarredList'])
    },
    data() {
      return {
        search: null,
        choosedStarredList: false
      }
    },
    methods: {
      searching(value) {
        this.search = value
      }
    }
  }
</script>

<style lang="sass">
  .container
    width: 100%
    &__header
      display: flex
  .mainSection
    display: flex
    &__search
      width: 30%
      min-width: 200px
    &__list
      width: 70%
  
  @media screen and (max-width: 768px)
    .mainSection
      flex-direction: column
      &__search
        width: 100%
      &__list
        width: 100%
</style>