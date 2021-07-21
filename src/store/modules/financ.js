import axios from 'axios'
export default {
  actions: {
    axiosFinanc(ctx) {
      axios
        .get('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(res => {
          return res.data.Valute
        })
        .then(data => {
          let dataSorted = {}
          Object.keys(data)
            .sort()
            .forEach(function(val) {
              dataSorted[val] = data[val]
            })
          console.log(dataSorted)
          ctx.commit('updateFinanc', dataSorted)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mutations: {
    updateFinanc(state, financ) {
      state.financ = financ
    }
  },
  state: {
    financ: []
  },
  getters: {
    allFinanc(state) {
      return state.financ
    }
  }
}
