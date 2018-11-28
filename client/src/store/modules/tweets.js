import store from '../store.js';
import router from '../../router.js';
const state = {
  user: {},
  tweets: []
}

const getters = {
  getUser(state) {
    return state.user;
  },
  getTweets(state) {
    return state.tweets.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });
  }
}

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setTweets(state, tweets) {
    state.tweets = tweets;
  },
  setTweet(state, tweet) {
    state.tweets.push(tweet);
  }
}

const actions = {
  async getAllTweets({ commit }) {
    const answer = store.dispatch('auth/getUserFromToken');
    if (answer) {
      const result = await fetch('http://localhost:5000/api/v1/tweets', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        }
      });
      const response = await result.json();
      if (response.hasOwnProperty('message')) {
        store.dispatch('auth/logout');
      } else {
        commit('setTweets', response);
      }
    }
  },
  async createTweet({ commit }, tweetMessage) {
    const result = await fetch('http://localhost:5000/api/v1/tweets', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify(tweetMessage)
    });
    const response = await result.json();
    if (response.hasOwnProperty('message')) {
      store.dispatch('auth/logout');
    } else {
      commit('setTweet', response);
    }
  },
  async getUserTweets({ commit }, username) {
    const answer = store.dispatch('auth/getUserFromToken');
    if (answer) {
    const result = await fetch(`http://localhost:5000/api/v1/tweets/${username}`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        }
    });
    const response = await result.json();
    if (response.hasOwnProperty('message')) {
      if (response.message === 'No username.') {
        router.push({name: 'dashboard'});
      } else {
        store.dispatch('auth/logout');
      }
    } else {
      commit('setTweets', response.userTweets);
      commit('setUser', response.user);
    }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
