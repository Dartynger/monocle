import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    statements: {},
    currency: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    setStatement(state, { account, statement }) {
      Vue.set(state.statements, account, statement)
    },
    setCurrency(state, currency) {
      state.currency = currency
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user
    }
  },
  actions: {
    async getToken({ commit }) {
      const token = await browser.runtime.sendMessage({
        type: 'getToken'
      })

      commit('setToken', token)
    },
    async getUser({ commit }, token) {
      const { data: user, error } = await browser.runtime.sendMessage({
        type: 'getUser',
        token
      })

      if (error) throw Error(error.errorDescription)

      commit('setUser', user)
    },
    async getStatement({ commit }, account) {
      const { data: statement } = await browser.runtime.sendMessage({
        type: 'getStatement',
        account
      })

      commit('setStatement', { account, statement })
    },
    async getCurrency({ commit }) {
      const { data: currency, error } = await browser.runtime.sendMessage({
        type: 'getCurrency'
      })

      if (error) throw Error(error.errorDescription)

      commit('setCurrency', currency)
    },
    async removeUser({ commit }) {
      const { data: removed } = await browser.runtime.sendMessage({
        type: 'removeUser'
      })

      if (removed) commit('setUser', null)
    }
  },
  modules: {}
})
