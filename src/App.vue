
<script setup>
// import { RouterLink, RouterView } from 'vue-router';



</script>
<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: 'Home', path: '/' },
        { title: 'About Us', path: '/' },
        { title: 'Rols', path: '/' },
        { title: 'Users', path: '/user' },

        // Add more menu items as needed
      ],
    };
  },
};
</script>
<template>


    <v-app>
      <v-navigation-drawer app
                           class="bg-primary"
      >
        <!-- Your navigation drawer content goes here -->
        <v-list >
          <h1 class="ml-3 mb-5" >Menu</h1>
          <v-list-item class="mt-1 mr-1 ml-1" rounded  v-for="item in menuItems" :key="item.path" :to="item.path" link>
            <v-list-item-content>
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app
       class="bg-primary"
      >

        <v-toolbar-title   class="text-white ml-15">COURSE VUE JS</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
</template>






