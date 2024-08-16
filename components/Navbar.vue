<script lang="ts" setup>
const { isLoggedIn, user, logout } = useAuth();
defineProps<{
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}>();
</script>

<template>
  <header class="navbar">
    <nav class="navbar-nav">
      <client-only>
        <template v-if="isLoggedIn">
          <ul class="navbar-nav-list">
            <li class="navbar-nav-list-item">
              <client-only>
                <p class="user-email">{{ user?.email }}</p>
              </client-only>
            </li>
            <li class="navbar-nav-list-item">
              <NuxtLink to="/">All</NuxtLink>
            </li>
            <li class="navbar-nav-list-item">
              <NuxtLink to="/favs">My Favs</NuxtLink>
            </li>
            <li
              class="navbar-nav-list-item"
              v-if="user?.email === 'admin@mail.com'"
            >
              <NuxtLink to="/users">Users</NuxtLink>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="navbar-nav-list">
            <li class="navbar-nav-list-item">
              <NuxtLink to="/">All</NuxtLink>
            </li>
            <li class="navbar-nav-list-item">
              <NuxtLink to="/login">Login</NuxtLink>
            </li>
          </ul>
        </template>
      </client-only>
      <SearchBar />
      <PokemonButton @click="toggleDarkMode">
        {{ isDarkMode ? "Light" : "Dark" }}
      </PokemonButton>
      <client-only>
        <PokemonButton v-if="isLoggedIn" @click="logout">Logout</PokemonButton>
      </client-only>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.dark .navbar {
  background-color: $colorBackgroundDark;
  color: $colorTextLight;
}

.navbar {
  background-color: $colorBackgroundLight;
  color: $colorTextDark;
  border-bottom: {
    style: solid;
    width: pxToRem(2);
    color: $colorPokemonRed;
  }
  position: sticky;
  top: 0;
  z-index: 100;

  .user-email {
    margin: 0;
  }

  &-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: pxToRem(16);
    padding-left: pxToRem(16);
    padding-right: pxToRem(16);
  }

  &-nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: pxToRem(16);
    margin: 0;
  }

  &-nav-list-item {
    * {
      padding: pxToRem(8);
      height: pxToRem(50);
      display: flex;
      align-items: center;
      justify-content: center;
      color: currentColor;
    }
  }

  .searchbar {
    width: 50%;
    min-width: pxToRem(350);
  }
}
</style>
