const state = {
  searchingList: [],
  starredList: [],
  partOfSpeechList: [],
  activeStarredList: false,
  searchValueStarttedList: null,
  fillterBar: []
}
  
const getters = {
  getAllSearchList(state) {
    return state.searchingList.sort((a,b) => (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0))
  },
  getStarredList(state) {
    // I try to do it T_T
    /* 
      state.starredList.filter(el => { 
        let filterResults = state.fillterBar.map(value => {el.includes(value)})
        return filterResults.find(false) == undefined
      }) 
    */
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
    if(state.searchingList.length <= 9) {
      state.searchingList.unshift(payload)
    } else {
      state.searchingList.pop()
      state.searchingList.unshift(payload)
    }
  },
  setStarredWord(state, payload) {
    state.searchingList[payload.index].starred = true
    let item = state.searchingList[payload.index]
    state.starredList.unshift(item)

    if(!state.partOfSpeechList.includes(payload.item.partOfSpeech)) {
      let arr = {
        "partOfSpeech": payload.item.partOfSpeech,
        "checked": false
      }
      state.partOfSpeechList.unshift(arr)
    }
  },
  unSetStarredWord(state, payload) {
    // cuz we don't have id for item so I use self word (I know it's not fully correct)

    const selectedWord  = state.searchingList.find(i => i.word == payload.word)
    const wordIndex     = state.searchingList.indexOf(selectedWord)

    const selectedWordStarred = state.starredList.find(i => i.word == payload.word)
    const starredWordIndex    = state.starredList.indexOf(selectedWordStarred)
    
    state.searchingList[wordIndex].starred = false
    state.starredList.splice(starredWordIndex, 1)
  },
  updateStarredList(state, payload) {
    state.starredList = payload
  },
  toggleActiveStarredList(state) {
    state.activeStarredList = !state.activeStarredList
  },
  activeSpeechFilter(state, payload) {
    if(payload !== null) {
      state.fillterBar.forEach(el => {
        if(el.partOfSpeech !== payload) {
          state.fillterBar.push(payload)
        } 
      })
    }
    // state.fillterBar = payload
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