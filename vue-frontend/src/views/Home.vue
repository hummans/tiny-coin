<template>
  <v-container>
    <v-card-title primary-title>
      <v-toolbar-title>{{balance}}</v-toolbar-title>
    </v-card-title>
    <v-flex xs12 sm6>
      <br>
      <br>
      <v-card-actions>
        <v-btn @click="handleTransfer()" primary large block>Make a Transfer</v-btn>
      </v-card-actions>
    </v-flex>
    <v-flex xs12 sm6>
      <br>
      <br>
      <h3>Transaction History</h3>
      <v-card>
        <v-data-table :headers="headers" :items="history" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.createdAt }}</td>
            <td class="text-xs-right">{{ props.item.sender }}</td>
            <td class="text-xs-right">{{ props.item.receipient }}</td>
            <td class="text-xs-right">{{ props.item.amount }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      balance: "None",
      headers: [
        {
          text: "Date",
          align: "left",
          sortable: false,
          value: "createdAt"
        },
        { text: "Sender", value: "sender" },
        { text: "Receipient", value: "receipient" },
        { text: "Amount", value: "amount" }
      ],
      history: [],
      transaction: {
        sender: "",
        receipient: "",
        amount: 0
      }
    };
  },
  methods: {
    handleTransfer: function() {
      this.$store.commit("loginStatus", this.accountName);
      this.$router.push("home");
    }
  },
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
