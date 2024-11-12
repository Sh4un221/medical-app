<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Medical App</v-toolbar-title>
      <v-spacer></v-spacer>
      <nav>
        <v-btn text to="/">
          Home
        </v-btn>
      </nav>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import DrugSearch from './components/DrugSearch.vue';

export default {
  name: 'App',
  components: {
    DrugSearch
  }
}
</script>