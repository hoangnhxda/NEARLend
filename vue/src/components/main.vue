<template>
  <div class="layout">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <header class="d-flex align-items-center">
            <!-- <img src="assets/images/nl.png" alt="" class="logo"> -->
            <button v-if="!accountId" class="px-3 py-2" @click="connectWallet">
              Connect To Wallet
            </button>
            <span
              class="text-white"
              v-if="accountId"
              style="margin-left: auto"
              >{{ accountId }}</span
            >
          </header>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-9 mx-auto row">
          <div class="col-4 d-flex align-items-center">
            <div class="w-100 deposit nz-card p-3">
              <h5>Total Market Deposited</h5>
              <b class="text-white">123.123.123.112$</b>
            </div>
          </div>
          <div class="col-4 d-flex align-items-center">
            <div
              class="net-apy mx-auto d-flex align-items-center justify-content-center text-white flex-column"
            >
              <h5 class="text-white">NET APY</h5>
              <small class="d-block">50%</small>
            </div>
          </div>
          <div class="col-4 d-flex align-items-center">
            <div class="w-100 borrow nz-card p-3">
              <h5>Total Market Borrowed</h5>
              <b class="text-white">123.123.123.112$</b>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <a-card title="Stake near">

        </a-card>
      </div>
    </div>
  </div>
  <button @click="login">login</button>
  <button @click="supply">supply</button>
  <button @click="increment">test1</button>
  <button @click="get_total_pool_balance">get_total_pool_balance</button>
  <button @click="withdraw_supply">withdraw_supply</button>
  <button @click="get_account_supplied_balance">get_account_supplied_balance</button>
</template>

<script>
import * as nearAPI from "near-api-js";
export default {
  name: "Main",
  data() {
    return {
      nearConfig: {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: "sub.duyhoag.testnet",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
      },
      contract: null,
      near: null,
      accountId: "",
    };
  },
  methods: {
    increment() {
      this.contract.test1().then(console.log);
    },

    supply() {
      this.contract.supply({}, 100000000000000, 2).then(console.log);
    },

    connectWallet() {
      this.walletConnection.requestSignIn(
        "sub.duyhoag.testnet",
        "Rust Counter Example"
      );
    },
    
    get_total_pool_balance() {
      this.contract.get_total_pool_balance().then(console.log);
    },

    get_account_supplied_balance() {
      this.contract.get_account_supplied_balance().then(console.log);
    },

    withdraw_supply() {
      this.contract
        .withdraw_supply({}, 100000000000000, 2)
        .then(console.log);
    },

    async connect(nearConfig) {
      // Connects to NEAR and provides `near`, `walletAccount` and `contract` objects in `this` scope
      // Initializing connection to the NEAR node.
      this.near = await nearAPI.connect({
        deps: {
          keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        },
        ...nearConfig,
      });

      // Needed to access wallet login
      this.walletConnection = new nearAPI.WalletConnection(this.near);

      // Initializing our contract APIs by contract name and configuration.
      this.contract = new nearAPI.Contract(
        this.walletConnection.account(),
        nearConfig.contractName,
        {
          // View methods are read-only – they don't modify the state, but usually return some value
          viewMethods: ["get_num", "get_total_pool_balance", "get_account", "get_account_supplied_balance"],
          // Change methods can modify the state, but you don't receive the returned value when called
          changeMethods: [
            "increment",
            "decrement",
            "reset",
            "supply",
            "withdraw_supply"
          ],
          // Sender is the account ID to initialize transactions.
          // getAccountId() will return empty string if user is still unauthorized
          // sender: this.walletConnection.getAccountId()
        }
      );
    },
  },
  async mounted() {
    await this.connect(this.nearConfig);
    if (this.walletConnection?.isSignedIn()) {
      this.accountId = this.walletConnection.getAccountId();
    }
  },
};
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background-image: url("~@/assets/images/bg.jpg");
  header {
    height: 80px;
    img {
      height: 100%;
    }
    button {
      margin-left: auto;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #42f0db;
      border: 2px solid #2e857a;
      background: transparent;
    }
  }

  .nz-card {
    border: 1px solid #2e857a;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(31, 24, 37, 0.5);
    &.deposit h5 {
      color: #42f0db;
      font-size: 20px;
    }
    &.borrow h5 {
      background: linear-gradient(
        66.62deg,
        #c65cff -11.4%,
        #ba6bff -0.23%,
        #9991ff 21.09%,
        #6cf 49.22%,
        #42f0db 89.89%,
        #3fc 113.21%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .net-apy {
    height: 150px;
    width: 150px;
    border: 2px solid #9991ff;
    border-radius: 50%;
  }
}
</style>
