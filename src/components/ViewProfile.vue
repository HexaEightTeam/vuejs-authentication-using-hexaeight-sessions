<template>
		<div class="profile-container">
			<div class="profile-header">
				<img class="profile-avatar" :src="avatarUrl" alt="Profile avatar">
				<h1 class="profile-name">{{ userName }}</h1>
			</div>
			<div class="profile-content">
				<div class="profile-section">
					<h2 class="profile-section-header">Application</h2>
					<p class="profile-section-content">{{ appName }}</p>
				</div>
			</div>
		</div>
</template>

<script>
export default {
	name: 'ViewProfile',
	props: ['hexaEightAuth'],
	data() {
		return {
			avatarUrl: "",
			userName: "",
			appName: "",
		}

	},
	mounted() {
		const app = this.hexaEightAuth.Login('FETCH-APPNAME', "");
			app.then(name => {
			try {
				this.appName = JSON.parse(name).data.toString();
			} catch { this.appName = ""; }
		});
		const user = this.hexaEightAuth.Login('FETCH-LOGGED-IN-USER-EMAIL', "");
			user.then(name => {
			const email = JSON.parse(name).data.toString().split("@");
			try {
				this.userName = "Welcome " + capitalizeFirstLetter(email[0].toString());
				this.avatarUrl = "https://ui-avatars.com/api/?background=007bff&color=FFFFFF&name=" + this.userName;
			} catch { this.userName = ""; }
		});

	},
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

</script>

<style>
.profile-container {
  margin: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-name {
  font-size: 24px;
  margin: 0;
}

.profile-content {
  display: flex;
  flex-direction: column;
}

.profile-section {
  margin-bottom: 20px;
}

.profile-section-header {
  font-size: 20px;
  margin: 0 0 10px 0;
}

.profile-section-content {
  margin: 0;
}
</style>
