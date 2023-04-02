<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
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
