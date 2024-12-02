<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import request from "@/stores/request";

const router = useRouter();
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
  userPhoneNumber: "",
  identity: "",
  hireDate: "",
  userBirthday: "",
  phoneNumber: "",
  userEmail: "",
  userAddress: [
    {
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
    },
  ],
  supervisor: "",
  createdAt: 0,
});

const originalUser = reactive({ ...currentUser });

const saveProfile = async () => {
  try {
    await request.put("/users/current", {
      user: currentUser,
    });
    alert("Profile saved!");
    hasChanges.value = false;
  } catch (error: any) {
    console.error("Error saving profile:", error);
  }
};

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("token");
  localStorage.removeItem("UserID");

  window.dispatchEvent(new CustomEvent("userLoggedOut"));
  alert("You have been logged out.");
  router.push("/");
};

const addAddress = () => {
  if (currentUser.userAddress.length > 5) {
    alert("You can add to five address at most.");
  } else {
    currentUser.userAddress.push({
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
    });
  }
};

const removeAddress = (index: number) => {
  if (currentUser.userAddress.length > 1) {
    currentUser.userAddress.splice(index, 1);
  } else {
    alert("You must have at least one address.");
  }
};

async function fetchUserInfo() {
  try {
    const res = await request.get("/users/current");

    Object.assign(currentUser, res.data);
    Object.assign(originalUser, res.data);

    watch(currentUser, function (n) {
      if (n.id != 0) {
        hasChanges.value = true;
      }
    });
  } catch (err) {
    console.error("Error fetching user info:", err);
  }
}

onMounted(() => {
  fetchUserInfo();
});
</script>

<template>
  <div class="form-container">
    <div class="form-header">
      <h1>User Profile</h1>
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
          <label>User ID:</label>
          <span>{{ currentUser.userId }}</span>
        </div>

        <div class="form-field">
          <label>First Name:</label>
          <span v-if="!isEditing">{{ currentUser.userFamilyName }}</span>
          <input v-if="isEditing" v-model="currentUser.userFamilyName" />
        </div>

        <div class="form-field">
          <label>Last Name:</label>
          <span v-if="!isEditing">{{ currentUser.userGivenName }}</span>
          <input v-if="isEditing" v-model="currentUser.userGivenName" />
        </div>

        <div class="form-field">
          <label>Phone Number:</label>
          <span v-if="!isEditing">{{ currentUser.userPhoneNumber }}</span>
          <input v-if="isEditing" v-model="currentUser.userPhoneNumber" />
        </div>

        <div class="form-field">
          <label>Identity:</label>
          <span v-if="!isEditing">{{ currentUser.identity }}</span>
          <input v-if="isEditing" v-model="currentUser.identity" />
        </div>

        <div class="form-field">
          <label>Created Date:</label>
          <span v-if="!isEditing">{{ currentUser.createdAt }}</span>
          <input type="date" v-if="isEditing" v-model="currentUser.createdAt" />
        </div>

        <div class="form-field">
          <label>Birth Date:</label>
          <span v-if="!isEditing">{{ currentUser.userBirthday }}</span>
          <input
            type="date"
            v-if="isEditing"
            v-model="currentUser.userBirthday"
          />
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="form-card">
        <h2>Contact Info</h2>
        <div class="form-field">
          <label>Phone Number:</label>
          <span v-if="!isEditing">{{ currentUser.phoneNumber }}</span>
          <input v-if="isEditing" v-model="currentUser.phoneNumber" />
        </div>

        <div class="form-field">
          <label>userEmail:</label>
          <span v-if="!isEditing">{{ currentUser.userEmail }}</span>
          <input v-if="isEditing" v-model="currentUser.userEmail" />
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="form-card">
        <h2>Addresses</h2>
        <div
          v-for="(address, index) in currentUser.userAddress"
          :key="index"
          class="form-field address-item"
        >
          <h3>Address {{ index + 1 }}</h3>
          <div class="form-field">
            <label>Street:</label>
            <span v-if="!isEditing">{{ address.street }}</span>
            <input v-if="isEditing" v-model="address.street" />
          </div>

          <div class="form-field">
            <label>City:</label>
            <span v-if="!isEditing">{{ address.city }}</span>
            <input v-if="isEditing" v-model="address.city" />
          </div>

          <div class="form-field">
            <label>State:</label>
            <span v-if="!isEditing">{{ address.state }}</span>
            <input v-if="isEditing" v-model="address.state" />
          </div>

          <div class="form-field">
            <label>Country:</label>
            <span v-if="!isEditing">{{ address.country }}</span>
            <input v-if="isEditing" v-model="address.country" />
          </div>

          <div class="form-field">
            <label>Zip Code:</label>
            <span v-if="!isEditing">{{ address.zipCode }}</span>
            <input v-if="isEditing" v-model="address.zipCode" />
          </div>

          <button
            v-if="isEditing"
            class="form-button remove-address-button"
            @click="removeAddress(index)"
          >
            Remove Address
          </button>
        </div>

        <button
          v-if="isEditing"
          class="form-button add-address-button"
          @click="addAddress"
        >
          Add Address
        </button>
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
      <button class="form-button" @click.prevent="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped></style>
