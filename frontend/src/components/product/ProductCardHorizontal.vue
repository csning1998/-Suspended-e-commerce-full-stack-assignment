<script setup lang="ts">
import { defineProps } from "vue";
import { products } from "./mockProducts";
import { productCardButtonActions } from "@/components/product/productCardButtonActions";
import { useProductOptions } from "./useProductOptions";

defineProps<{
  readonly products: Products[];
}>();

const userId = undefined; // if (!isLoggedIn) then make it undefined

const { cart, favorites, addToCart, addToFavorites } =
  productCardButtonActions(userId);

const {
  selectedOptions,
  updateSelectedOption,
  calculateTotalPrice,
  areAllOptionsSelected,
} = useProductOptions();

// const selectedOptions = ref<Record<number, Record<string, string | number>>>(
//   {},
// );

const emit = defineEmits<{
  (e: "addToCart", product: CartItem): void;
  (e: "addToFavorites", product: CartItem): void;
}>();

// const calculateTotalPrice = (product: Products) => {
//   let _bestPrice: number = product.basePrice;
//   let _discountPrice: number = product.discountPrice;
//   const options = selectedOptions.value[product.id] || {};
//
//   product.options.forEach((option) => {
//     const selectedValue = options[option.name];
//     const matchedValue = option.values.find(
//       (value) => value.value === selectedValue,
//     );
//     if (matchedValue?.priceAdj) {
//       _bestPrice += matchedValue.priceAdj;
//       _discountPrice += matchedValue.priceAdj;
//     }
//   });
//
//   return { _bestPrice, _discountPrice };
// };
//
// const areAllOptionsSelected = (product: Products): boolean => {
//   const options = selectedOptions.value[product.id];
//   if (!options) return false;
//   return product.options.every((option) => options[option.name] !== undefined);
// };
</script>

<template>
  <div class="form-container">
    <!--    <form class="form-body" @submit.prevent="onSubmit">-->
    <form class="form-body">
      <div class="form-field">
        <input type="text" placeholder="Search" />
      </div>
    </form>
  </div>
  <div class="product-container">
    <div v-for="item in products" :key="item.id" class="card">
      <div class="left">
        <img :src="item.link2Pic" alt="Product Image" />
      </div>
      <div class="right">
        <div class="product-info">
          <div class="product-brand">
            {{ item.brand }}
            <div class="price-container">
              <span class="discount">
                <fa icon="dollar-sign" />
                {{ calculateTotalPrice(item)._bestPrice }}
              </span>
              <span class="original-price">
                <fa icon="dollar-sign" />
                {{ calculateTotalPrice(item)._discountPrice }}
              </span>
            </div>
          </div>
        </div>
        <div class="details">
          <h3>{{ item.collection }}</h3>
          <h2>{{ item.title }}</h2>

          <div v-for="option in item.options" :key="option.name">
            <p class="label">
              {{ option.name.toUpperCase() }}
            </p>
            <div class="options-container">
              <span
                v-for="value in option.values"
                :key="value.value"
                class="option-button"
                :class="{
                  selected:
                    selectedOptions[item.id]?.[option.name] === value.value,
                }"
                @click="
                  () => {
                    if (!selectedOptions[item.id]) {
                      selectedOptions[item.id] = {};
                    }
                    selectedOptions[item.id][option.name] = value.value;
                  }
                "
              >
                {{ value.value }}
              </span>
            </div>
          </div>
        </div>
        <div class="actions">
          <span
            class="foot"
            :class="{ disabled: !areAllOptionsSelected(item) }"
            @click="
              () => {
                if (areAllOptionsSelected(item)) {
                  emit('addToCart', {
                    ...item,
                    selectedOptions: selectedOptions[item.id],
                  });
                }
              }
            "
          >
            <span class="icon">
              <fa icon="cart-arrow-down" id="addToCart" />
            </span>
            Add to Cart
          </span>
          <span
            class="foot"
            @click="
              emit('addToFavorites', {
                ...item,
                selectedOptions: selectedOptions[item.id],
              })
            "
          >
            <span class="icon" id="addToFavorites">
              <fa icon="heart" />
            </span>
            Add to Favorites
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 800px;
}
.card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px var(--color-border-hover);
}

.left {
  flex: 1 1 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.left img {
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
  border-radius: 12px;
}

.right {
  flex: 1 1 60%;
  display: inline-grid;
  height: 100%;
  padding: 20px;
  background-color: var(--color-background-soft);
  overflow: hidden;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 18px;
  font-family: "Muli", Ubuntu, sans-serif;
  color: var(--color-heading);
}

.icon {
  margin-left: 2px;
  margin-right: 6px;
  color: var(--color-text);
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.icon:hover {
  color: var(--vt-c-indigo);
  transform: scale(1.15);
}

.details {
  font-size: 14px;
  margin: 5px 0;
  color: var(--color-text);
  font-family: "Muli", Ubuntu, sans-serif;
}

.label {
  margin-top: 8px;
}

h1 {
  font-size: 20px;
  font-family: "Muli", Ubuntu, sans-serif;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  font-family: "Muli", Ubuntu, sans-serif;
}

h3 {
  font-size: 14px;
  font-family: "Muli", Ubuntu, sans-serif;
}

.details {
  margin-top: 6px;
  margin-bottom: 6px;
  font-weight: normal;
  font-family: "Muli", Ubuntu, sans-serif;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.original-price {
  font-size: 16px;
  font-weight: normal;
  text-decoration: line-through;
  color: var(--vt-c-divider-dark-1);
}

.discount {
  font-size: 24px;
  font-weight: bold;
  color: var(--vt-c-indigo);
  gap: 4px;
}

ul {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 8px 0;
  padding: 0;
}

ul li {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  background-color: var(--color-border);
  color: var(--color-text);
  transition: all 0.3s ease;
}

ul li.bg:hover {
  background-color: var(--vt-c-indigo);
  color: var(--color-background);
}

.options-container {
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}

.option-button {
  display: inline-flex;
  justify-content: center;
  padding: 6px 12px;
  min-width: 90px;
  margin: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
}

.option-button.selected {
  background-color: var(--vt-c-indigo);
  border-color: var(--color-background);
}

.foot.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.actions {
  display: flex;
  flex-direction: row;
  margin: 8px;
  height: 48px;
  gap: 24px;
}

.actions .foot {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  font-weight: bold;
  font-family: "Muli", Ubuntu, sans-serif;
  padding: 6px 10px;
  border-radius: 6px;
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border);
  color: var(--vt-c-indigo);
  transition:
    background-color 0.3s ease,
    transform 0.3s ease,
    color 0.3s ease;
}

.actions .foot:hover {
  background-color: var(--vt-c-indigo);
  color: var(--color-background);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .form-container {
    width: 90%;
    margin: 0 auto;
  }

  .card {
    flex-direction: column;
    padding: 16px;
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 16px auto;
  }

  .left {
    width: 100%;
    height: 200px;
    border-radius: 12px 12px 0 0;
    justify-content: center;
    align-items: center;
  }

  .left img {
    max-width: 90%;
    max-height: 100%;
    border-radius: 12px;
  }

  .right {
    width: 100%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .product-brand {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    font-size: 16px;
  }

  .details {
    text-align: center;
    font-size: 14px;
  }

  .price-container {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  .actions {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 16px 0;
    gap: 12px;
  }

  .option-button {
    min-width: 70px;
    margin: 4px;
  }
}
</style>
