
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
        { title: 'View List of Users', path: '/user' },

        // Add more menu items as needed
      ],
    };
  },
};
</script>
<template>


    <v-app>
<!--      <v-navigation-drawer app>-->
<!--        &lt;!&ndash; Your navigation drawer content goes here &ndash;&gt;-->
<!--        <v-list>-->
<!--          <v-list-item v-for="item in menuItems" :key="item.path" :to="item.path" link>-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--            </v-list-item-content>-->
<!--          </v-list-item>-->
<!--        </v-list>-->
<!--      </v-navigation-drawer>-->

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






