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

const GENDER_LIST = ["Male", "Female", "Apache", "non-Binary"];

let currentUser = reactive({
  id: 0,
  userId: "",
  userEmail: "",
  userFamilyName: "",
  userGivenName: "",
  userPhoneNumber: "",
  userIdentity: "",
  userGender: "",
  userBirthday: "",
  userProfilePictureURL: "",
  phoneNumber: "",
  userAddress: [
    {
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
    },
  ],
  paymentMethods: [
    {
      cardNumber: "",
      cardHolderName: "",
      expirationDate: "",
      cvv: "",
    },
  ],
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

import store from "@/stores/user";

const logout = () => {
  localStorage.removeItem("token");
  store.currentUser = null;

  window.dispatchEvent(new CustomEvent("userLoggedOut"));
  alert("You have been logged out.");
  router.push("/");
  window.location.reload();
};

const addAddress = () => {
  if (currentUser.userAddress.length < 5) {
    currentUser.userAddress.push({
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
    });
  } else {
    alert("You can add to five address at most.");
  }
};

const removeAddress = (index: number) => {
  if (currentUser.userAddress.length > 1) {
    currentUser.userAddress.splice(index, 1);
  } else {
    alert("You must have at least one address.");
  }
};

const addPaymentMethod = () => {
  if (currentUser.paymentMethods.length < 10) {
    currentUser.paymentMethods.push({
      cardNumber: "",
      cardHolderName: "",
      expirationDate: "",
      cvv: "",
    });
  } else {
    alert("You can add up to ten payment methods.");
  }
};

const removePaymentMethod = (index: number) => {
  if (currentUser.paymentMethods.length > 1) {
    currentUser.paymentMethods.splice(index, 1);
  } else {
    alert("You must have at least one payment method.");
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
        :src="
          currentUser.userProfilePictureUrl || 'https://via.placeholder.com/150'
        "
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
          <label class="form-field label">Gender:</label>
          <span class="form-item span" v-if="!isEditing">{{
            currentUser.userGender
          }}</span>
          <div class="form-field radiogroup" v-if="isEditing">
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
          <label>Identity:</label>
          <span>{{ currentUser.userIdentity }}</span>
        </div>

        <div class="form-field">
          <label>Created Date:</label>
          <span>{{ currentUser.createdAt }}</span>
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
          <span v-if="!isEditing">{{ currentUser.userPhoneNumber }}</span>
          <input v-if="isEditing" v-model="currentUser.userPhoneNumber" />
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
          <div class="form-button-container" v-if="isEditing">
            <button class="form-button" @click="removeAddress(index)">
              Remove Address
            </button>
            <button class="form-button" @click="addAddress">Add Address</button>
          </div>
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="form-card">
        <h2>Payment Methods</h2>
        <div
          v-for="(payment, index) in currentUser.paymentMethods"
          :key="index"
          class="form-field payment-method-item"
        >
          <h3>Payment Method {{ index + 1 }}</h3>
          <div class="form-field">
            <label>Card Number:</label>
            <span v-if="!isEditing">{{ payment.cardNumber }}</span>
            <input v-if="isEditing" v-model="payment.cardNumber" />
          </div>
          <div class="form-field">
            <label>Card Holder Name:</label>
            <span v-if="!isEditing">{{ payment.cardHolderName }}</span>
            <input v-if="isEditing" v-model="payment.cardHolderName" />
          </div>
          <div class="form-field">
            <label>Expiration Date:</label>
            <span v-if="!isEditing">{{ payment.expirationDate }}</span>
            <input
              type="month"
              v-if="isEditing"
              v-model="payment.expirationDate"
            />
          </div>
          <div class="form-field">
            <label>CVV:</label>
            <span v-if="!isEditing">{{ payment.cvv }}</span>
            <input type="text" v-if="isEditing" v-model="payment.cvv" />
          </div>
          <div class="form-button-container" v-if="isEditing">
            <button class="form-button" @click="removePaymentMethod(index)">
              Remove Payment Method
            </button>
            <button class="form-button" @click="addPaymentMethod">
              Add Payment Method
            </button>
          </div>
        </div>
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

h1,
h2 {
  color: var(--color-heading); /* Use theme color */
}

span {
}
</style>
