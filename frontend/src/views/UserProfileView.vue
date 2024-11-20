<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  name: "C.S. Ning",
  birthday: "January 6, 1998",
  gender: "Male",
  email: "HelloWorld@noreply.gmail.com",
  phone: "(+886) 0987 654 321",
  addresses: ["Somewhere in Taiwan"],
});

const editProfile = () => {
  // Add your logic to handle profile editing here.  This could involve:
  // 1. Showing editable fields.
  // 2. Making API calls to update the user data.
  // 3. Updating the `user` reactive data object.
  alert("Edit Profile functionality not yet implemented");
};

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  window.dispatchEvent(new CustomEvent("userLoggedOut")); // Dispatch the event
  alert("You have been logged out.");
  router.push("/"); // Redirect to home or login after logout
};
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
        <label>Name:</label>
        <span>{{ user.name }}</span>
      </div>
      <div class="profile-item">
        <label>Birthday:</label>
        <span>{{ user.birthday }}</span>
      </div>
      <div class="profile-item">
        <label>Gender:</label>
        <span>{{ user.gender }}</span>
      </div>
    </section>

    <section class="profile-section">
      <h2>Contact Info</h2>
      <div class="profile-item">
        <label>Email:</label>
        <span>{{ user.email }}</span>
      </div>
      <div class="profile-item">
        <label>Phone:</label>
        <span>{{ user.phone }}</span>
      </div>
    </section>

    <section class="profile-section">
      <h2>Addresses</h2>
      <div
        v-for="(address, index) in user.addresses"
        :key="index"
        class="profile-item address-item"
      >
        <label>Address {{ index + 1 }}:</label>
        <span>{{ address }}</span>
      </div>
    </section>

    <div class="form-button-container">
      <button class="form-button" @click="editProfile">Edit Profile</button>
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
