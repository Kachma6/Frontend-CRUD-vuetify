<script>
import axios from "axios";

export default {
  data(){
    return{
      model:{
        user:{
          username:'',
          password:'',
          email:'',
          userDetail: null,
          firstName:'',
          lastName:'',
          age:'',
          birthDay:'',
          user:{ id: null}


        }

      },
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 2) || 'Min 3 characters',
      ],
      emailRules: [
        value => {
          if (value) return true

          return 'E-mail is requred.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ],
    }
  },
  methods:{
    saveUser(){
      axios.post('http://localhost:8081/v1/users',this.model.user).then(res => {
        alert("User was saving successful" );

      }).catch(function (error){
        alert("User don't create, because dates of form isn't well")
      })
    }
  }
}
</script>

<template>
  <v-responsive
    class="mx-auto"
    max-width="644"
  >

      <h1 class="text-primary mb-3">Register new User</h1>
    <v-container>

      <v-row>
        <v-col
         cols="12"
         sm="6"
        >
          <v-text-field
            variant="outlined"
            clearable
            label="First Name"
            v-model="model.user.firstName"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>


        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            variant="outlined"
            clearable
            label="Last name"
            v-model="model.user.lastName"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            variant="outlined"
            clearable
            label="Age"
            v-model="model.user.age"
            :rules="rules"
            hide-details="auto"
            type="number"
          ></v-text-field>
        </v-col>


        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            variant="outlined"
            clearable
            label="Birth day"
            v-model="model.user.birthDay"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            variant="outlined"
            clearable
            label="User Name"
            v-model="model.user.username"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>


        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            variant="outlined"
            clearable
            label="Email"
            v-model="model.user.email"
            :rules="emailRules"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"

            placeholder="Your Password"

            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="model.user.password"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
        </v-col>

      </v-row>




    </v-container>







<!--    <v-text-field-->

<!--      clearable-->
<!--      label="Password"-->
<!--      v-model="model.user.password"-->
<!--    ></v-text-field>-->



  </v-responsive>

  <v-container>
    <v-col align-self="center"  class="d-flex justify-center">
      <v-sheet class="pa-2 ma-2 ">

        <router-link to="/user">
          <v-btn
            class="ml-3"
          >
            BACK
          </v-btn>
        </router-link>
        <v-btn
          @click="saveUser()"
          color="primary"
          class="ml-3"
        >
          SAVE
        </v-btn>

      </v-sheet>

    </v-col>

  </v-container>



</template>

<style scoped>

</style>
