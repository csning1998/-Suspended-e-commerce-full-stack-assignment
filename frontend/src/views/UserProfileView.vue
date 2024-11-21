<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import request from "@/stores/request";

const router = useRouter();

// const userId = localStorage.getItem("userId");
// const userName = localStorage.getItem("userName");

// const user = reactive({
//   name: "C.S. Ning",
//   birthday: "January 6, 1998",
//   gender: "Male",
//   email: "HelloWorld@noreply.gmail.com",
//   phone: "(+886) 0987 654 321",
//   addresses: ["Somewhere in Taiwan"],
// });

const GENDER_LIST = [
  'male', 'female', 'apache'
]

let currentUser = reactive({
  id: 0,
  userId: "",
  userName: "",
  birthday: "",
  userGender: "",
  userEmail: "",
  userPhoneNumber: "",
  addresses: [""],
  createdAt: 0,
});

const saveProfile = async () => {
  // Add your logic to handle profile editing here.  This could involve:
  // 1. Showing editable fields.
  // 2. Making API calls to update the user data.
  // 3. Updating the `user` reactive data object.

  try {
    await request.put("/users/current", {
        user: currentUser
      }, {
      headers: {
        token: localStorage.getItem("token")
      }
    });

    alert("Profile saved!");
  } catch (error: any) {
    alert(error.response.data.message);
  }

};

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  window.dispatchEvent(new CustomEvent("userLoggedOut")); // Dispatch the event
  alert("You have been logged out.");
  router.push("/"); // Redirect to home or login after logout
};

async function fetchUserInfo() {
  try {

    const res = (await request.get("/users/current", {
      headers: {
        token: localStorage.getItem("token")
      }
    })).data.payload;

    currentUser = Object.assign(currentUser, res)

    console.log("currentUser.value", currentUser)
  } catch (err) {}
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1>Your Profile</h1>
      <img
        class="profile-picture"
        src="https://via.placeholder.com/150"
        alt="Profile Picture"
      />
    </div>

    <section class="profile-section">
      <h2>Basic Info</h2>
      <div class="profile-item">
        <label>User ID:</label>
        <span>{{ currentUser.userId }}</span>
      </div>
      <div class="profile-item">
        <label>Name:</label>
        <input v-model="currentUser.userName" />
        <!-- <span>{{ currentUser.name }}</span> -->
      </div>
      <div class="profile-item">
        <label>Birthday:</label>
        <span>{{ currentUser.birthday }}</span>
      </div>
      <div class="profile-item">
        <label>Gender:</label>

        <label v-for="(g, key) in GENDER_LIST" :key="key" :for="g">
          <input
            :id="g"
            type="radio"
            v-model="currentUser.userGender"
            :value="g"
          />
          {{ g }}
        </label>
      </div>
      <div class="profile-item">
        <label>Registered At:</label>
        <span>{{ currentUser.createdAt }}</span>
      </div>
    </section>

    <section class="profile-section">
      <h2>Contact Info</h2>
      <div class="profile-item">
        <label>Email:</label>
        <span>{{ currentUser.userEmail }}</span>
      </div>
      <div class="profile-item">
        <label>Phone:</label>
        <input type="text" v-model="currentUser.userPhoneNumber" />
        <!-- <span>{{ currentUser.userPhoneNumber }}</span> -->
      </div>
    </section>

    <section class="profile-section">
      <h2>Addresses</h2>
      <div
        v-for="(address, index) in currentUser.addresses"
        :key="index"
        class="profile-item address-item"
      >
        <label>Address {{ index + 1 }}:</label>
        <span>{{ address }}</span>
      </div>
    </section>

    <div class="form-button-container">
      <button class="form-button" @click="saveProfile">Save Profile</button>
      <button class="form-button" @click.prevent="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--color-background); /* Use theme color */
  color: var(--color-text); /* Use theme color */
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 20px;
}

.profile-section {
  margin-bottom: 20px;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.profile-item label {
  font-weight: bold;
  width: 120px; /* Increased width for better readability */
}

.address-item span {
  word-break: break-word;
}

h1,
h2 {
  color: var(--color-heading); /* Use theme color */
}
</style>
