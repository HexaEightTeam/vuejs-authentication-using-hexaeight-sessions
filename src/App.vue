<template>
		<div class="app">
			<img alt="Vue logo" src="./assets/logo.png">
			<HexaEightAuth :clientId="clientid" :tokenServerUrl="token_server_url" @authenticated="updateAuthenticationStatus" ref="hexaeightauth"> 
			<router-view :hexaEightAuth="hexaEightAuth">
			</router-view>
			</HexaEightAuth>
		</div>
</template>

<script>
import HexaEightAuth from './components/HexaEight.vue'
import { useRouter } from 'vue-router'

const app = {
  data() {
    return {
      clientid: "74F1A042EFFE87D8C7429F49DFCD5C417C5C07AB",
      token_server_url: "https://login.anyemail.chat:8443",
      isAuthenticated: false,
      hexaEightAuth: undefined,
    };
  },
  created() {
    const self = this; // Store a reference to the Vue instance
    const router = useRouter()

    router.beforeEach((to, from, next) => {
      if (to.meta.requiresAuth) {
        if (self.$refs.hexaeightauth.authState === true) {
          next()
        } else {
          next('/')
        }
      } else {
        next()
      }
    });
  },
  methods: {
	updateAuthenticationStatus(status) {
		this.isAuthenticated = status;
		if (status === true) {
			this.hexaEightAuth = this.$refs.hexaeightauth.hexaeightSession;
			this.$router.push('/profile');
		}
	}
  }
}

export default {
	name: 'App',
	components: { HexaEightAuth },
	data() {
		return {
			...app.data()
		}
	},
	...app
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
