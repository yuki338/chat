<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      app
    >
      <v-list>
        <!-- ログインアカウントのアイコン、名前、メアド -->
        <!-- Todo: ログイン/ログアウトの分岐までしてくれるコンポーネントにしたい -->
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="picture"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- ログインボタン(Google用) -->
        <v-list-item v-if="! $auth.loggedIn" @click="$auth.loginWith('google')">
          <v-list-item-icon>
            <v-img src="/btn_google_dark_pressed_ios.svg"></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-action>Sign in with Google</v-list-item-action>
          </v-list-item-content>
        </v-list-item>
        <!-- ログアウトボタン(Google用) -->
        <v-list-item v-if="$auth.loggedIn" @click="logout()">
          <v-list-item-icon>
            <v-img src="/btn_google_dark_pressed_ios.svg"></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-action>Sign out with Google</v-list-item-action>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="rightDrawer"
      :mini-variant="rightMiniVariant"
      :clipped="clipped"
      app
      right
    >
      <room-list></room-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-list-box-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import RoomList from '~/components/RoomList.vue'
export default {
  components: { RoomList },
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
      miniVariant: false,
      rightMiniVariant: false,
      right: true,
      rightDrawer: true,
      title: 'Vuetify.js',
    }
  },
  computed: {
    picture() {
      return this.$auth.loggedIn
        ? this.$auth.user.picture
        : '';
    },
    name() {
      return this.$auth.loggedIn
        ? this.$auth.user.name
        : 'guest user';
    },
    email() {
      return this.$auth.loggedIn
        ? this.$auth.user.email
        : '';
    },
  },
  methods: {
    logout: function () {
      this.$auth.logout()
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
  },
}
</script>
