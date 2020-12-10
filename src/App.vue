<template>
  <v-app class="jirehpr-app">
    <!-- appbar -->
    <!-- <v-app-bar app color="primary" dark height="90px">
      <img src="@/assets/images/deeply.png" class="brand-logo" alt="" />
      <v-spacer></v-spacer>

      <v-btn href="https://freddev.netlify.com/" target="_blank" text>
        <span class="mr-2">Resumen Curricular</span>
      </v-btn>
    </v-app-bar> -->
    <v-appbar app color="white" min-height="370px" class="jireh-appbar">
      <img src="@/assets/images/bg-desktop-dark.jpg" class="bg-appbar" alt="" />
      <v-container class="appbar-container">
        <v-row>
          <v-col cols="auto">
            <h2>Citizen Inc.</h2>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn outlined href="https://freddev.netlify.com/" target="_blank"
              >Sobre mi</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-appbar>

    <v-main class="main-content primary">
      <v-container class="main-container">
        <!-- title -->
        <v-row align="center" justify="center">
          <v-col cols="3" offset="3">
            <h1>Personas</h1>
          </v-col>
          <v-col cols="3" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="secondary" v-bind="attrs" v-on="on">
                  Añadir
                  <v-icon right dark> mdi-account </v-icon>
                </v-btn>
              </template>
              <v-card color="primary">
                <v-card-title>
                  <h2 class="font-weigth-black pt-4">
                    {{ formTitle }}
                  </h2>
                </v-card-title>

                <!-- form -->
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.id_code"
                          label="Cédula"
                          solo
                          background-color="secondary"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          background-color="secondary"
                          v-model="editedItem.name"
                          label="Nombre"
                          solo
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          background-color="secondary"
                          v-model="editedItem.lastname"
                          label="Apellido"
                          solo
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <!-- <v-text-field
                        background-color="secondary"
                          v-model="editedItem.birthday"
                          label="Fecha de nacimiento"
                          solo
                        ></v-text-field> -->
                        <v-menu
                          v-model="dialogDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              background-color="secondary"
                              v-model="editedItem.birthday"
                              label="Fecha de nacimiento"
                              solo
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              locale="es"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            landscape
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            v-model="editedItem.birthday"
                            @input="dialogDate = false"
                            locale="es-MX"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          background-color="secondary"
                          :value="
                            editedItem.birthday
                              ? `${getAge(editedItem.birthday)} años`
                              : 'edad'
                          "
                          label="Edad"
                          solo
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions class="pb-6">
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="close"> Cancelar </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    :loading="getLoadingPerson"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- delete a person -->
            <v-dialog v-model="dialogDelete" max-width="max-content">
              <v-card>
                <v-card-title class="text-center pt-6">
                  <h3>¿Seguro desea borrar a esta persona?</h3>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="closeDelete">No</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Si</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <!-- content -->
        <v-row justify="center">
          <v-col cols="6">
            <v-data-table
              :loading="!getPeople"
              :headers="headers"
              :items="getPeople"
              sort-by="lastname"
              class="elevation-1 secondary"
              width="991px"
            >
              <!-- actions icons -->
              <template v-slot:item.actions="{ item }">
                <v-btn color="blue darken-1" icon small fab class="elevation-0">
                  <v-icon class="" @click="editItem(item)"> mdi-pencil </v-icon>
                </v-btn>
                <v-btn color="error" icon small fab class="elevation-0">
                  <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
                </v-btn>
              </template>

              <!-- age field -->
              <template v-slot:item.age="{ item }">
                <span> {{ getAge(item.birthday) }} </span>
              </template>

              <!-- no data -->
              <template v-slot:no-data>
                <v-progress-circular
                  :value="20"
                  indeterminate
                ></v-progress-circular>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer fixed padless class="jireh-footer">
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <small class="footer-text"
              >Developed by
              <a
                href="https://freddev.netlify.com/"
                target="_blank"
                class="text-decoration-none white--text font-weight-bold"
                >Frederick A. Gonzalez 👺</a
              >
              powered by vuetify
            </small>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogDate: false,
    headers: [
      {
        text: "Cédula",
        value: "id_code",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Apellido",
        value: "lastname",
      },
      {
        text: "Edad",
        value: "age",
      },

      {
        text: "Fecha de nacimiento",
        value: "birthday",
      },
      {
        text: "",
        width: "120px",
        value: "actions",
        sortable: false,
      },
    ],
    persons: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      lastname: "",
      age: "",
      id_code: "",
      birthday: "",
    },
    defaultItem: {
      name: "",
      lastname: "",
      age: "",
      id_code: "",
      birthday: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Añadir persona" : "Editar persona";
    },
    ...mapGetters({
      getPeople: "getPeople",
      getLoadingPerson: "getLoadingPerson",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.actionGetPeople();
    this.$vuetify.theme.dark = true;
  },

  methods: {
    ...mapActions({
      actionGetPeople: "actionGetPeople",
      actionNewPerson: "actionNewPerson",
      actionDeletePerson: "actionDeletePerson",
      actionUpdatePerson: "actionUpdatePerson",
    }),
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },

    editItem(item) {
      this.editedIndex = this.getPeople.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.info(item);
    },

    deleteItem(item) {
      this.editedIndex = this.persons.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.actionDeletePerson(this.editedItem);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        this.actionUpdatePerson(this.editedItem).then(() => {
          this.dialog = false;
        });
      } else {
        this.actionNewPerson(this.editedItem).then(() => {
          this.dialog = false;
        });
      }
      // this.close();
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&display=swap");
html {
  overflow: auto !important;
  font-family: "Josefin Sans", sans-serif !important;
}
* {
  font-family: "Josefin Sans", sans-serif !important;
}
.jireh-appbar {
  min-height: 37.5%;
  position: relative;
  overflow: hidden;
  .bg-appbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
  .appbar-container {
    position: relative;
    z-index: 100;
  }
}
.brand-logo {
  height: 80%;
  width: auto;
  // display: none;
}
.main-content {
  // margin-top: -50px;
  .main-container {
    margin-top: -150px;
  }
  th {
    span {
      font-size: 15px;
    }
  }
  tr {
    td {
      font-size: 16px !important;
      color: rgba(white, 0.5);
    }
  }
}
.jireh-footer {
  background: rgb(192, 88, 243);
  background: linear-gradient(
    90deg,
    rgba(192, 88, 243, 1) 0%,
    rgba(87, 221, 255, 1) 100%
  );
  .footer-text {
    font-size: 15px;
  }
}
</style>
