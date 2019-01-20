<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Transfer Tinycoins</v-btn>
    <v-card>
      <v-card-title>
        <h2>Transfer Tinycoins</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="receipient" label="Receipient" :rules="inputRules"></v-text-field>
          <v-text-field v-model="amount" label="Amount" :rules="inputRules"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit" class="success mx-0 mt-3">Transfer</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      receipient: "",
      amount: "",
      inputRules: [
        v => !!v || "This field is required",
        v => v.length >= 1 || "Minimum length is 1 characters"
      ],
      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.receipient, this.amount);

        const node_url = "http://localhost:3000";
        const new_url = `${node_url}/new?sender=${
          this.$store.state.loggedIn
        }&recipient=${this.receipient}&amount=${this.amount}`;
        axios.get(new_url).then(({ data }) => {
          console.log(this.receipient, this.amount, data);
          this.dialog = false;
          this.$emit("transferDone");
        });
      }
    }
  }
};
</script>