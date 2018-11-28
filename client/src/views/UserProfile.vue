<template>
  <div class="container customDistance">
    <div class="row">
      <div class="col">
        <div class="d-flex flex-column align-items-center justify-content-center text-center border shadow bg-secondary p-5 mb-3">
          <img class="rounded-circle imgRounded" :src="getUser.image_url" alt="image">
          <h1 class="display-5 text-primary">{{getUser.username}}</h1>
          <p class="display text-primary">{{getUser.email}}</p>
        </div>
      </div>
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-10 mb-2" v-for=" tweet in getTweets" :key="tweet._id">
          <div class="card shadow">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <router-link :to="{name: 'userProfile', params: {username: tweet.author.username}}" tag="h3" class="card-title text-primary">
                  {{ tweet.author.username }}
                </router-link>
                <p>{{ getTweetDate(tweet.createdAt) }}</p>
              </div>
              <p class="card-text">{{ tweet.tweetMessage }}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
export default {
  name: 'UserProfile',
  mounted() {
    this.getUserTweets(this.$route.params.username);
  },
   computed: {
    ...mapGetters('tweets', ['getUser', 'getTweets']),
  },
  methods: {
    ...mapActions('tweets', ['getUserTweets']),
     getTweetDate(date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
  }
}
</script>

<style scoped>
.customDistance {
   margin-top: 5rem; 
  }

  .imgRounded {
    height: 100px;
    width: 100px;
  }
</style>
