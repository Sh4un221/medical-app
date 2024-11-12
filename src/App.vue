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
      <router-view></router-view> <!-- El enrutador maneja qué componente se muestra -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
