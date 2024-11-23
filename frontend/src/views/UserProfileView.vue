<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import request from "@/stores/request";

const router = useRouter();
const GENDER_LIST = ["male", "female", "apache", "non-Binary"];
const isEditing = ref(false);
const hasChanges = ref(false);

const toggleEditMode = (): void => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    Object.assign(currentUser, originalUser);
  }
};



let currentUser = reactive({
  id: 0,
  userId: "",
  userFamilyName: "",
  userGivenName: "",
  userBirthday: "",
  userGender: "",
  userEmail: "",
  userPhoneNumber: "",
  userAddress: [],
  createdAt: 0,
});

let newAddress = ''

const originalUser = reactive({ ...currentUser });

const saveProfile = async () => {
  try {
    await request.put("/users/current", { user: currentUser, address: newAddress})
    alert("Profile saved!");
  } catch (error: any) {
    alert(error.response.data.message);
  }
};

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  localStorage.removeItem("UserID");

  window.dispatchEvent(new CustomEvent("userLoggedOut")); // Dispatch the event
  alert("You have been logged out.");
  router.push("/"); // Redirect to home or login after logout
};

async function fetchUserInfo() {
  try {
    const res = await request.get("/users/current")

    Object.assign(currentUser, res);
    Object.assign(originalUser, res);

    console.log("currentUser.userAddress", currentUser.userAddress);

    watch(currentUser, function(n){
      if(n.id != 0) {
        hasChanges.value = true;
      }
    })
  } catch (err) {}
}

onMounted(() => {
  fetchUserInfo();
  // toggleEditMode();
});
</script>


<template>
  <div class="form-container">
    <div class="form-header">
      <h1>Your Profile</h1>
      <img
        class="profile-picture"
        src="https://via.placeholder.com/150"
        alt="Profile Picture"
      />
    </div>

    <section class="form-section">
      <div class="form-card">
        <h2 class="form-title">Basic Info</h2>
        <div class="form-field">
          <label class="form-field label">User ID:</label>
          <span class="form-item span">{{ currentUser.userId }}</span>
        </div>
        <div class="form-field">
          <label class="form-field label">Family Name:</label>
          <span class="span" v-if="!isEditing">{{
            currentUser.userFamilyName
          }}</span>
          <input
            v-if="isEditing"
            v-model="currentUser.userFamilyName"
          />
          <!-- <span>{{ currentUser.name }}</span> -->
        </div>
        <div class="form-field">
          <label class="form-field label">Given Name:</label>
          <span class="form-item span" v-if="!isEditing">{{
            currentUser.userGivenName
          }}</span>
          <input
            class="form-field input"
            v-if="isEditing"
            v-model="currentUser.userGivenName"
          />
        </div>
        <div class="form-field">
          <label class="form-field label">Birthday:</label>
          <span class="form-item span" v-if="!isEditing">{{
            currentUser.userBirthday
          }}</span>
          <input
            type="date"
            class="form-field input"
            v-if="isEditing"
            v-model="currentUser.userBirthday"
          />
        </div>
        <div class="form-field radiogroup">
          <label class="form-field label">Gender:</label>
          <span class="form-item span" v-if="!isEditing">{{
            currentUser.userGender
          }}</span>
          <div v-if="isEditing">
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
        </div>
        <div class="form-field">
          <label>Registered At:</label>
          <span class="form-item span">{{ currentUser.createdAt }}</span>
        </div>
      </div>
    </section>

    <section class="form-card">
      <h2>Contact Info</h2>
      <div class="form-field">
        <label class="form-field label">Email:</label>
        <span class="form-item span">{{ currentUser.userEmail }}</span>
      </div>
      <div class="form-field">
        <label class="form-field label">Phone:</label>
        <span class="form-item span" v-if="!isEditing">{{
          currentUser.userPhoneNumber
        }}</span>
        <input
          type="text"
          class="form-field"
          v-if="isEditing"
          v-model="currentUser.userPhoneNumber"
        />
        <!-- <span>{{ currentUser.userPhoneNumber }}</span> -->
      </div>
    </section>

    <section class="form-card">
      <h2>Addresses</h2>

      <label class="form-field label">Add new address :</label>
      <input type="text" v-model="newAddress" />

      <div
        v-for="(address, index) in currentUser.userAddress"
        class="form-item address-item"
        :key="index"
      >
        <!--        <label>Address {{ index + 1 }}:</label>-->
        <label class="form-field label">Address :</label>
        <span>{{ address['address'] }}</span>

        <!-- <input type="text" v-model="address[index][address]" /> -->
      </div>
    </section>

    <div class="form-button-container">
      <button class="form-button" @click="toggleEditMode">
        {{ isEditing ? "Cancel" : "Edit" }}
      </button>
      <button
        class="form-button"
        v-if="isEditing"
        @click="saveProfile"
        :disabled="!hasChanges"
      >
        Save Profile
      </button>
      <button class="form-button" v-if="!isEditing" @click.prevent="logout">
        Logout
      </button>
    </div>
  </div>
</template>

<style scoped>
.form-title {
  text-align: left;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
}

.address-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}



h1,
h2 {
  color: var(--color-heading); /* Use theme color */
}
</style>
