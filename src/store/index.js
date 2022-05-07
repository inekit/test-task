import { createStore } from 'vuex'

export default createStore({
  
  state: {
    dictionary: {
      city: "Города",
      district: "Районы",
      country: "Страны",
      street: "Улицы",
      building : "Номера домов"
    },
    modes: [
      ["city", "district", "street"],
      ["country","city", "district", "street", "building"],
      ["city", "street"]
    ],
    mode: [["country","city", "district", "street", "building"]],
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
