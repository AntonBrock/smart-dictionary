import axios from 'axios'

let Api = axios.create({
  baseURL: 'https://wordsapiv1.p.mashape.com/words/',
  headers: {
    "x-rapidapi-key": "7a931a888fmsh3247488a437845ep1f63cdjsnc886f18dd8e3"
  }
})

export default Api
