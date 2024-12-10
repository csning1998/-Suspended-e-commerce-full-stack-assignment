<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import request from "@/stores/request";
import store from "@/stores/user";

const router = useRouter();
const isEditing = ref(false);
const isModified = ref(false);

const toggleEditMode = (): void => {
   isEditing.value = !isEditing.value;
   if (!isEditing.value) {
      Object.assign(currentUser, originalUser);
   }
};

const GENDER_LIST = ["Male", "Female", "Apache", "non-Binary"];

const currentUser = reactive<UserProfileFormData>({
   id: 0,
   userId: "",
   userEmail: "",
   userFamilyName: "",
   userGivenName: "",
   userPhoneNumber: "",
   userIdentity: "",
   userGender: "",
   userBirthday: "",
   userProfilePictureUrl: "",
   userAddress: [
      {
         country: "Taiwan",
         state: "Taiwan",
         city: "Taipei",
         street: "",
         zipCode: "",
      },
   ],
   userPayments: [
      {
         cardNumber: "",
         cardHolderName: "",
         expirationDate: "",
         cvv: "",
      },
   ],
   userPermission: "",
   userCurrency: "",
   userOAuthToken: null,
   userOAuthProvider: null,
   createdAt: 0,
   updatedAt: 0,
});

const originalUser = reactive<UserProfileFormData>({ ...currentUser });

const saveProfile = async () => {
   try {
      await request.put("/users/current", {
         user: currentUser,
      });
      alert("Profile saved!");
      isModified.value = false;
   } catch (error: any) {
      console.error("Error saving profile:", error);
   }
};

const logout = () => {
   localStorage.removeItem("token");
   store.currentUser = null;

   window.dispatchEvent(new CustomEvent("userLoggedOut"));
   alert("You have been logged out.");
   router.push("/");
   window.location.reload();
};

const addAddress = () => {
   if (currentUser.userAddress && currentUser.userAddress.length < 5) {
      currentUser.userAddress.push({
         country: "",
         state: "",
         city: "",
         street: "",
         zipCode: "",
      });
   } else {
      alert("You can add up to five addresses.");
   }
};

const removeAddress = (index: number) => {
   if (currentUser.userAddress && currentUser.userAddress.length > 1) {
      currentUser.userAddress.splice(index, 1);
   } else {
      alert("You must have at least one address.");
   }
};

const addPaymentMethod = () => {
   if (currentUser.userPayments && currentUser.userPayments.length < 10) {
      currentUser.userPayments.push({
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
   if (currentUser.userPayments && currentUser.userPayments.length > 1) {
      currentUser.userPayments.splice(index, 1);
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
            isModified.value = true;
         }
      });
   } catch (err) {
      console.error("Error fetching user info:", err);
   }
}

type Country = "Taiwan" | "United States";
type StateName = "California" | "Taiwan";

const countries: Country[] = ["Taiwan", "United States"];
const states: StateName[] = ["California", "Taiwan"];
const cities: Record<StateName, { name: string; zipCode: string }[]> = {
   California: [
      { name: "Los Angeles", zipCode: "90001" },
      { name: "San Francisco", zipCode: "94101" },
      { name: "San Diego", zipCode: "92101" },
      { name: "San Jose", zipCode: "95101" },
      { name: "Sacramento", zipCode: "95814" },
      { name: "Fresno", zipCode: "93701" },
      { name: "Oakland", zipCode: "94601" },
      { name: "Bakersfield", zipCode: "93301" },
      { name: "Long Beach", zipCode: "90802" },
      { name: "Santa Ana", zipCode: "92701" },
      { name: "Anaheim", zipCode: "92801" },
      { name: "Irvine", zipCode: "92602" },
      { name: "Riverside", zipCode: "92501" },
      { name: "Stockton", zipCode: "95201" },
      { name: "Chula Vista", zipCode: "91910" },
      { name: "Santa Clara", zipCode: "95050" },
      { name: "Huntington Beach", zipCode: "92646" },
      { name: "Glendale", zipCode: "91201" },
      { name: "Fremont", zipCode: "94536" },
      { name: "Modesto", zipCode: "95350" },
   ],
   Taiwan: [
      { name: "Taipei", zipCode: "100" },
      { name: "Taichung", zipCode: "400" },
      { name: "Kaohsiung", zipCode: "800" },
      { name: "Tainan", zipCode: "700" },
      { name: "Hsinchu", zipCode: "300" },
      { name: "Taoyuan", zipCode: "330" },
      { name: "Keelung", zipCode: "200" },
      { name: "Chiayi", zipCode: "600" },
      { name: "Hualien", zipCode: "970" },
      { name: "Taitung", zipCode: "950" },
   ],
};

function getCityNames(state: StateName): string[] {
   if (!state || !cities[state]) return [];
   return cities[state].map((city) => city.name);
}

watch(
   () => currentUser.userAddress,
   (newVal) => {
      if (!newVal) return;
      newVal.forEach((address) => {
         if (address.state && address.city) {
            // @ts-ignore
            const cityObj = cities[address.state]?.find(
               (c: { name: string; zipCode: string }) =>
                  c.name === address.city,
            );
            if (cityObj) {
               address.zipCode = cityObj.zipCode;
            }
         }
      });
   },
   { deep: true },
);

// To-fix: Render the page immediately after "Save Profile" is clicked.
onMounted(() => {
   fetchUserInfo();
});
</script>

<template>
   <div class="form-container">
      <v-card class="vuerify-card" max-width="1000">
         <v-form>
            <div class="form-card">
               <h1 class="form-title">User Profile</h1>
               <h2 class="form-title">Basic Info</h2>
               <v-card-text>
                  <v-row align="center" justify="space-between">
                     <v-col cols="12" md="8">
                        <v-text-field
                           disabled
                           :readonly="!isEditing"
                           variant="outlined"
                           v-model="currentUser.userId"
                           label="User ID"
                        ></v-text-field>
                        <v-text-field
                           :clearable="isEditing"
                           :readonly="!isEditing"
                           variant="outlined"
                           v-model="currentUser.userFamilyName"
                           label="First Name"
                        ></v-text-field>
                        <v-text-field
                           :clearable="isEditing"
                           :readonly="!isEditing"
                           variant="outlined"
                           v-model="currentUser.userGivenName"
                           label="Last Name"
                        ></v-text-field>
                     </v-col>

                     <v-col cols="12" md="4" class="d-flex justify-center">
                        <v-img
                           class="profile-picture"
                           :src="
                              currentUser.userProfilePictureUrl ||
                              'https://via.placeholder.com/150'
                           "
                           alt="Profile Picture"
                           max-width="200"
                           max-height="200"
                        ></v-img>
                     </v-col>
                  </v-row>
               </v-card-text>

               <v-card-text>
                  <v-row>
                     <v-col cols="12" v-if="!isEditing">
                        <v-text-field
                           readonly
                           variant="outlined"
                           v-model="currentUser.userGender"
                           label="Gender"
                        ></v-text-field>
                     </v-col>

                     <v-col cols="12" v-else>
                        <v-radio-group
                           v-model="currentUser.userGender"
                           label="Gender"
                        >
                           <v-radio
                              v-for="(g, i) in GENDER_LIST"
                              :key="i"
                              :label="g"
                              :value="g"
                           ></v-radio>
                        </v-radio-group>
                     </v-col>

                     <v-col cols="12">
                        <v-text-field
                           disabled
                           variant="outlined"
                           v-model="currentUser.userIdentity"
                           label="Identity"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-text-field
                           :disabled="isEditing"
                           :readonly="!isEditing"
                           variant="outlined"
                           v-model="currentUser.createdAt"
                           label="Created At"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-text-field
                           type="date"
                           :readonly="!isEditing"
                           variant="outlined"
                           v-model="currentUser.userBirthday"
                           label="Birth Date"
                        ></v-text-field>
                     </v-col>
                  </v-row>
               </v-card-text>
            </div>

            <div class="form-card">
               <h2 class="form-title">Contact Info</h2>
               <v-card-text>
                  <v-row dense>
                     <v-col cols="12">
                        <v-text-field
                           :clearable="isEditing"
                           :readonly="!isEditing"
                           variant="outlined"
                           v-model="currentUser.userPhoneNumber"
                           label="Phone Number"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-text-field
                           :clearable="isEditing"
                           :readonly="!isEditing"
                           variant="outlined"
                           v-model="currentUser.userEmail"
                           label="Email"
                        ></v-text-field>
                     </v-col>
                  </v-row>
               </v-card-text>
            </div>

            <div class="form-card">
               <h2 class="form-title">Address</h2>
               <v-card-text>
                  <div
                     v-for="(address, index) in currentUser.userAddress"
                     :key="index"
                     class="mb-4"
                  >
                     <v-row dense>
                        <!-- Country -->
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">{{ address.country }}</div>
                           <v-autocomplete
                              v-else
                              autocomplete="off"
                              :items="countries"
                              v-model="address.country"
                              label="Country"
                              variant="outlined"
                           ></v-autocomplete>
                        </v-col>

                        <!-- State -->
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">{{ address.state }}</div>
                           <v-autocomplete
                              v-else
                              :items="states"
                              v-model="address.state"
                              label="State"
                              variant="outlined"
                              clearable
                           ></v-autocomplete>
                        </v-col>

                        <!-- City -->
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">{{ address.city }}</div>
                           <v-autocomplete
                              v-else
                              :items="getCityNames(address.state)"
                              v-model="address.city"
                              label="City"
                              variant="outlined"
                              clearable
                           ></v-autocomplete>
                        </v-col>

                        <!-- Street -->
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">{{ address.street }}</div>
                           <v-text-field
                              v-else
                              variant="outlined"
                              clearable
                              v-model="address.street"
                              label="Street"
                           ></v-text-field>
                        </v-col>

                        <!-- Zip Code -->
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">{{ address.zipCode }}</div>
                           <v-text-field
                              v-else
                              variant="outlined"
                              clearable
                              v-model="address.zipCode"
                              label="Zip Code"
                           ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" v-if="isEditing">
                           <button
                              class="form-button"
                              @click.prevent="removeAddress(index)"
                           >
                              Remove Address
                           </button>
                        </v-col>
                     </v-row>
                  </div>
                  <div class="form-button-container" v-if="isEditing">
                     <button class="form-button" @click.prevent="addAddress">
                        Add Address
                     </button>
                  </div>
               </v-card-text>
            </div>

            <div class="form-card">
               <h2 class="form-title">Payment Methods</h2>
               <v-card-text>
                  <div
                     v-for="(payment, index) in currentUser.userPayments"
                     :key="index"
                     class="mb-4"
                  >
                     <v-row dense>
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">{{ payment.cardNumber }}</div>
                           <v-text-field
                              v-else
                              clearable
                              :readonly="!isEditing"
                              variant="outlined"
                              v-model="payment.cardNumber"
                              hide-details="auto"
                              label="Card Number"
                           ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">
                              {{ payment.cardHolderName }}
                           </div>
                           <v-text-field
                              v-else
                              clearable
                              :readonly="!isEditing"
                              variant="outlined"
                              v-model="payment.cardHolderName"
                              hide-details="auto"
                              label="Holder Name"
                           ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">
                              {{ payment.expirationDate }}
                           </div>
                           <v-text-field
                              v-else
                              clearable
                              :readonly="!isEditing"
                              variant="outlined"
                              v-model="payment.expirationDate"
                              hide-details="auto"
                              label="Expiration"
                              type="month"
                           ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                           <div v-if="!isEditing">{{ payment.cvv }}</div>
                           <v-text-field
                              v-else
                              clearable
                              :readonly="!isEditing"
                              variant="outlined"
                              v-model="payment.cvv"
                              hide-details="auto"
                              label="CVV"
                              type="text"
                           ></v-text-field>
                        </v-col>

                        <div class="form-button-container" v-if="isEditing">
                           <button
                              class="form-button"
                              @click.prevent="removePaymentMethod(index)"
                           >
                              Remove
                           </button>
                           <button
                              class="form-button"
                              @click.prevent="addPaymentMethod"
                           >
                              Add Payment Method
                           </button>
                        </div>
                     </v-row>
                  </div>
               </v-card-text>

               <!-- Buttons -->
               <v-card-actions>
                  <div class="form-button-container d-flex flex-row mt-2">
                     <button
                        class="form-button"
                        @click.prevent="toggleEditMode"
                     >
                        {{ isEditing ? "Cancel" : "Edit" }}
                     </button>
                     <button
                        class="form-button"
                        v-if="isEditing"
                        :disabled="!isModified"
                        @click.prevent="saveProfile"
                     >
                        Save Profile
                     </button>
                     <button class="form-button" @click.prevent="logout">
                        Logout
                     </button>
                  </div>
               </v-card-actions>
            </div>
         </v-form>
      </v-card>
   </div>
</template>

<style scoped>
.form-title {
   text-align: center;
}

.form-container {
   width: 48rem;
}

h1,
h2 {
   color: var(--color-heading); /* Use theme color */
}

.profile-picture {
   border-radius: 100%;
   border: 1px solid var(--vt-c-divider-dark-2);
   margin-left: 1rem;
   margin-bottom: 1rem;
}
</style>
