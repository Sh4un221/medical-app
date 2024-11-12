import Vue from 'vue';
import Vuex from 'vuex';
import { drugService } from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drugs: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_DRUGS(state, drugs) {
      state.drugs = drugs;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async searchDrugs({ commit }, query) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const drugs = await drugService.searchDrugs(query);
        commit('SET_DRUGS', drugs);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
});