<template>
  <div v-if="authState !== null">
    <div v-if="authState">
      <slot />
    </div>
    <div v-else>
      <p>Please wait while we check your Authentication Status</p>
    </div>
  </div>
  <div v-else>
    <p>Please wait while we check your Authentication Status</p>
  </div>
</template>

<script>
export default {
	name: 'HexaEightAuth',
	props: {
		clientId: {
			type: String,
			required: true
		},
		tokenServerUrl: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			appName: '',
			userName: '',
			authState: false,
			hexaeightSession: null,
			checkAuthentication() {	
				if (this.hexaeightSession.UserLoggedIn === undefined || this.hexaeightSession === null) {
					this.authState = false;
					setTimeout(() => {
						this.checkAuthentication();
					}, 10000);
				} else {
					if (this.hexaeightSession.UserLoggedIn === false) {
						this.authState = false;
						const userstatus = this.hexaeightSession.isauthenticated();
						userstatus.then(status => {
								if (JSON.parse(status).data.toString() === "True") {
									this.authState = true;
									this.$emit('authenticated', true);
								} 
						});
						setTimeout(() => {
							if (!this.authState) {
								this.checkAuthentication();
							} 
						}, 5000);

					} else {
						this.authState = true;
						this.$emit('authenticated', true);
					}
				}
			},

		};
	},
	mounted() {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/gh/hexaeightteam/session-js-spa-https/hexaeightsession.js';

		const axiosscript = document.createElement('script');
		axiosscript.src = 'https://cdn.jsdelivr.net/gh/hexaeightteam/session-js-spa-https/hexaeightaxios.js';

		script.onload = () => {
			this.hexaeightSession = new window.HexaEight();
			this.hexaeightSession.init(
				this.clientId,
				this.tokenServerUrl,
				(err,) => {
					if (err) {
						console.log('Error:', err);
				} 				}
			);
			this.checkAuthentication();
		};
		document.head.appendChild(script);
		document.head.appendChild(axiosscript);
	},
};

</script>
