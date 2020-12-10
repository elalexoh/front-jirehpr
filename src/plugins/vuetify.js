import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);
var theme = {
  themes: {
    dark: {
      primary: "#181824",
      primary_2: "#303030",
      primary_3: "#35495e",
      primary_4: "#36495d",
      accent: "#48b884",
      accent_2: "#3f7f70",
      accent_3: "#41b883",
      accent_4: "#49ce93",
      secondary: "#25273c",
    },
  },
};

export default new Vuetify({ theme });
