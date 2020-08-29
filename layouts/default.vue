<template>
  <el-container>
    <el-header class="header">
      <nuxt-link to="/" class="title">User Management</nuxt-link>
    </el-header>
    <el-main>
      <Nuxt />
    </el-main>
    <el-footer>
      <div class="footer-content">
        <nuxt-link to="/about" class="about-link">about</nuxt-link>
      </div>
    </el-footer>
  </el-container>
</template>

<style>
html,
input,
textarea {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
.header {
  display: flex;
  align-items: center;
}

.title {
  color: #000;
  font-size: 26px;
  text-decoration: none;
  border: none;
}

.footer-content {
  display: flex;
  justify-content: flex-end;
}

.about-link {
  margin: 10px 20px;
}
</style>
