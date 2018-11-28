import router from '../../router.js';

const state = {
  user: {},
  isLoggedIn: false,
  errorMessage: ''
}

const getters = {
  getUser(state) {
    return state.user;
  },
  getIsLoggedIn(state) {
    return state.isLoggedIn;
  },
  getErrorMessage(state) {
    return state.errorMessage;
  }
}

const  mutations ={
  setUser(state, user) {
    state.user = user;
    state.isLoggedIn = true
  },
  setErrorMessage(state, message) {
    state.errorMessage = message
  },
  setIsLoggedOut(state) {
    state.isLoggedIn = false;
    state.user = {};
  }
}

const actions ={
  async signup({ commit, dispatch}, user) {
    const result = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    const userLogged = await result.json();
    if (userLogged.hasOwnProperty('message')) {
      dispatch('changeErrorMessage', userLogged.message);
    } else {
      localStorage.token = userLogged.token;
      commit('setUser', userLogged.user);
      router.push({name: 'dashboard'});
    }
  },
  async login({ commit, dispatch }, user) {
    const result = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    const userLogged = await result.json();
    if (userLogged.hasOwnProperty('message')) {
      dispatch('changeErrorMessage', userLogged.message);
    } else {
      localStorage.token = userLogged.token;
      commit('setUser', userLogged.user);
      router.push({name: 'dashboard'});
    }
  },
  async getUserFromToken({ commit,  dispatch}) {
    const result = await fetch('http://localhost:5000/api/v1', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.token}`,
      }
    });
    const response = await result.json();
    if (response.user) {
      commit('setUser', response.user);
      return true;
    } else {
      dispatch('logout');
      return false;
    }
  },
  changeErrorMessage({ commit }, message) {
    commit('setErrorMessage', message);
    setTimeout(() => {
      commit('setErrorMessage', '');
    }, 3500);
  },
  logout({ commit }) {
      localStorage.removeItem('token');
      commit('setIsLoggedOut');
      router.push({name: 'home'});
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}