
<template>
  <v-container class="mt-0">


  <v-data-table

    :headers="headers"
    :items="users"
    :sort-by="[{ key: 'calories', order: 'asc' }]"

  >
    <template v-slot:top>
      <v-toolbar
        flat
        class="bg-primary"
        rounded
      >
        <v-toolbar-title >LIST OF USERS</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >

          <v-card>
            <v-card-title class="mt-5">
              <span class="text-h5 mt-5 text-primary">{{formTitle}}</span>
            </v-card-title>
            <v-card-item>
              <div>
                <div class="text-overline mb-1 text-secondary">
                  First Name :
                </div>
                <v-divider></v-divider>
                <div class="text-h6 mb-1 mt-1 text-grey-darken-1">
                  {{editedItem.firstName}}
                </div>
              </div>
              <div>
                <div class="text-overline mb-1 text-secondary">
                  Last Name :
                </div>
                <v-divider></v-divider>
                <div class="text-h6 mb-1 mt-1  text-grey-darken-1">
                  {{editedItem.lastName}}
                </div>
              </div>
              <div>
                <div class="text-overline mb-1  text-secondary">
                  Age :
                </div>
                <v-divider></v-divider>
                <div class="text-h6 mb-1 mt-1  text-grey-darken-1">
                  {{editedItem.age}}
                </div>
              </div>
              <div>
                <div class="text-overline mb-1 text-secondary">
                 Birth Day :
                </div>
                <v-divider></v-divider>
                <div class="text-h6 mb-1 mt-1  text-grey-darken-1">
                  {{editedItem.birthDay}}
                </div>
              </div>
              <div>
                <div class="text-overline mb-1 text-secondary">
                  User Name :
                </div>
                <v-divider></v-divider>
                <div class="text-h6 mb-1 mt-1  text-grey-darken-1">
                  {{editedItem.username}}
                </div>
              </div>
              <div>
                <div class="text-overline mb-1 text-secondary">
                  Gmail :
                </div>
                <v-divider></v-divider>
                <div class="text-h6 mb-1 mt-1  text-grey-darken-1">
                  {{editedItem.email}}
                </div>
              </div>

            </v-card-item>


            <v-card-actions
            class="mb-5 ml-3"
            >
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="elevated"
                @click="close"
                class="mt-5 ml-3"
              >
                CLOSE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px" >
          <v-card class="mt-5 mb-5">
            <v-card-title class="text-h5 text-primary mt-5 ml-3">Are you sure you want to delete this user?</v-card-title>
            <v-card-actions class="mt-5 mb-5">
              <v-spacer></v-spacer>
              <v-btn variant="elevated" @click="closeDelete">Cancel</v-btn>
              <v-btn  color="primary"  variant="elevated" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <router-link :to="{path:'user/'+ item.id+'/edit'}">
        <v-icon
          size="small"
          class="me-2"
          color="secondary"
          @click="editItem(item.id)"

        >
          mdi-pencil
        </v-icon>
      </router-link>

      <v-icon
        size="small"
        color="secondary"
        class="ml-4"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>

    </template>
    <template v-slot:item.see="{ item }">
      <v-btn
        size="small"
        color="secondary"
        @click="editItem(item)"
      >
        See Detail
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>

    <router-link to="/user/create">
      <v-btn
        density="compact"
        icon="mdi-plus"
        color="primary"
        class="mb-1 float-end"
        size="50px"
      ></v-btn>
    </router-link>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      // {
      //   title: 'Nro',
      //   align: 'start',
      //   sortable: false,
      //   key: 'name',
      // },
      { title: 'FIRST NAME', key: 'firstName' },
      { title: 'LAST NAME', key: 'lastName' },
      { title: 'USER NAME', key: 'username' },
      { title: 'E-MAIL', key: 'email' },
      { title: 'Actions', key: 'actions', sortable: false },
      { title: ' ', key: 'see', sortable: false },
    ],
    users: [],

  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'User Detail'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
     getUsers(){
      axios.get('http://localhost:8081/v1/users?detailed=true').then(res => {
       this.users = res.data;
       console.log(res.data);
     }).catch(function (error){
      console.log("Error"+error);
    })
   },
    initialize () {

    },


    deleteItem (item) {
       console.log("delete")
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {

      this.users.splice(this.editedIndex, 1)
      console.log(this.editedItem.id);
      this.deleteUserById(this.editedItem.id);

      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    },
    deleteUserById(userId){
      // if(confirm('Do you sure, you want to delete this user?'));
      axios.delete(`http://localhost:8081/v1/users/${userId}`).then(res => {
        this.getUsers();

      }).catch(function (error){
        console.log("Error"+error);
      })
    }
  },
  mounted() {
    this.getUsers();
  }
}
</script>
<style>
.max-width-table {
  max-width: 800px; /* Establece el ancho máximo según tus necesidades */
  margin: auto; /* Centra la tabla en el contenedor */
}
</style>
