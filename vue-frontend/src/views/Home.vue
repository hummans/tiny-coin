<template>
  <v-card-title primary-title>
    <v-toolbar-title>{{balance}}</v-toolbar-title>
    <v-toolbar-title>{{history}}</v-toolbar-title>
  </v-card-title>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      balance: "None",
      history: [],
      transaction: {
        sender: "",
        receipient: "",
        amount: 0
      }
    };
  },
  methods: {},
  created() {
    const node_url = "http://localhost:3000";
    const balance_url = `${node_url}/balance?address=${
      this.$store.state.loggedIn
    }`;
    const history_url = `${node_url}/history?address=${
      this.$store.state.loggedIn
    }`;

    axios.get(balance_url).then(({ data }) => {
      this.balance = data;
    });

    axios.get(history_url).then(({ data }) => {
      this.history = data;
      console.log(this.history);
    });
  }
};
</script>
