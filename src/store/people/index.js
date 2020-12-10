/* eslint-disable no-unused-vars */
import axios from "axios";
export const people = {
  state: {
    _people: [],
    _person: [],
    _loading_person: false,
  },
  mutations: {
    SET_PEOPLE(state, payload) {
      state._people = payload;
    },
    UPDATE_LOADING_PERSON(state, payload) {
      state._loading_person = payload;
    },
    ADDED_PERSON(state, person) {
      state._people.push(person);
    },
  },
  actions: {
    async actionGetPeople({ commit }) {
      await axios
        .get("http://localhost:8000/api/people")
        .then(function({ data }) {
          commit("SET_PEOPLE", data);
        })
        .catch(function(error) {
          console.debug(error);
        });
    },
    // actionGetPerson({ commit }, payload) {
    //   console.debug("get all people");
    //   axios
    //     .get(`http://localhost:8000/api/people/${payload}`)
    //     .then(function(data) {
    //       //   commit("SET_PEOPLE", data);
    //     })
    //     .catch(function(error) {
    //       console.debug(error);
    //     });
    // },
    async actionNewPerson({ commit }, payload) {
      commit("UPDATE_LOADING_PERSON", true);
      await axios
        .post(`http://localhost:8000/api/people`, payload)
        .then(function({ data }) {
          commit("UPDATE_LOADING_PERSON", false);
          commit("ADDED_PERSON", data.data);
          return data;
        })
        .catch(function(error) {
          return error;
        });
    },
    async actionUpdatePerson({ commit }, payload) {
      commit("UPDATE_LOADING_PERSON", true);
      await axios
        .put(`http://localhost:8000/api/people/${payload.id}`, payload)
        .then(function({ data }) {
          commit("UPDATE_LOADING_PERSON", false);
          commit("SET_PEOPLE", data.data);
          return data;
        })
        .catch(function(error) {
          console.debug(error);
        });
    },
    actionDeletePerson({ commit }, { id }) {
      axios
        .delete(`http://localhost:8000/api/people/${id}`)
        .then(function({ data }) {
          commit("SET_PEOPLE", data.data);
        })
        .catch(function(error) {
          console.debug(error);
        });
    },
  },
  getters: {
    getPeople(state) {
      return state._people;
    },
    getPerson(state) {
      return state._person;
    },
    getLoadingPerson(state) {
      return state._loading_person;
    },
  },
};
