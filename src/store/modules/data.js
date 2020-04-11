const state = {
  searchingList: [],
  starredList: [],
  partOfSpeechList: [],
  activeStarredList: false,
  searchValueStarttedList: null
}
  
const getters = {
  getAllSearchList(state) {
    return state.searchingList.sort((a,b) => (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0))
  },
  getStarredList(state) {
    return state.starredList
  },
  getPartOfSpeechList(state) {
    return state.partOfSpeechList
  },
  getActiveStarredList(state) {
    return state.activeStarredList
  },
  getSearchValueStarttedList(state) {
    return state.searchValueStarttedList
  }
};
  
const mutations = {
  setStore(state) {
    if(localStorage.getItem('store')) {
      this.replaceState(
        {...state, ...JSON.parse(localStorage.getItem('store'))}
      )
    }
  },
  setSearchingList(state, payload) {
    state.searchingList.unshift(payload)
    let newArr = state.searchingList

    // я уже хз что здесь не так ...
    state.searchingList = Array.from(new Set(newArr))
  },
  setStarredWord(state, payload) {
    state.searchingList[payload.index].starred = true
    let item = state.searchingList[payload.index]
    state.starredList.unshift(item)

    if(!state.partOfSpeechList.includes(payload.item.partOfSpeech)) {
      state.partOfSpeechList.unshift(payload.item.partOfSpeech)
    }
  },
  unSetStarredWord(state, payload) {
    // cuz we don't have id for item so I use self word (I know it's not fully correct)

    const selectedWord = state.starredList.find(i => i.word == payload.word)
    const wordIndex    = state.starredList.indexOf(selectedWord)
    
    state.starredList[wordIndex].starred = false
    state.starredList.splice(wordIndex, 1)

  },
  updateStarredList(state, payload) {
    state.starredList = payload
  },
  toggleActiveStarredList(state) {
    state.activeStarredList = !state.activeStarredList
  },
  activeSpeechFilter(state, payload) {
    state.starredList = state.starredList.filter(i => i.partOfSpeech == payload)
  },
  searchInStarredList(state, payload) {
    if(payload !== null) {
      state.searchValueStarttedList = payload
    }
  }
};
  
export default {
  namespaced: true,
  state,
  getters,
  mutations
}