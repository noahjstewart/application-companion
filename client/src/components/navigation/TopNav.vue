<template>
  <div class="navbar">
    <router-link :to="{ name: 'home' }">
      <div class="link">
        <i class="fa fa-home" aria-hidden="true"></i>
        <span class="home-text">Home</span>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

a {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

.link {
  color: #eeeeee;
}

.link:hover {
  cursor: pointer;
  text-decoration: underline;
}

@media (max-width: 375px) {
  .home-text {
    display: none;
  }
}
</style>