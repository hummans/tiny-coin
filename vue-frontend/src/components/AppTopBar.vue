<template>
  <span>
    <v-toolbar app color="black darken-4" dark>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>{{appTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="handleLogout()" v-if="$store.state.loggedIn.length>0">Logout</v-btn>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "AppTopBar",
  data() {
    return {
      appTitle: "Tiny Coin Wallet"
    };
  },
  methods: {
    handleLogout: async function() {
      this.$store.commit("loginStatus", "");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>