<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <div>
        <label for="username">Username:</label>
        <input
          id="username"
          v-model="username"
          type="text"
          required
        >
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
        >
      </div>
      <button type="submit">
        Login
      </button>
      <p v-if="error">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script>
import credentials from '../assets/credentials.json';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    login() {
      const { username, password } = credentials;

      if (this.username === username && this.password === password) {
        localStorage.setItem('isAuthenticated', 'true');
        this.$emit('login-success');
      } else {
        this.error = 'Invalid username or password';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

div {
  margin-bottom: 10px;
}

button {
  align-self: center;
}

p {
  color: red;
}
</style>
