import { ref } from "vue";

export function productCardButtonActions(userId?: string) {
    const cart = ref<Products[]>([]);
    const favorites = ref<Products[]>([]);

    const getLocalStorageKey = (key: string): string => {
        return userId ? `${userId}-${key}` : key;
    };

    const addToCart = (product: Products): void => {
        const exists = cart.value.find((item) => item.id === product.id);
        if (!exists) {
            cart.value.push(product);
            console.log("Added to cart", cart.value);
            localStorage.setItem(
                getLocalStorageKey("cart"),
                JSON.stringify(cart.value),
            );
        } else {
            console.log("Already in the cart:", product.id);
        }
    };

    const addToFavorites = (product: Products): void => {
        const exists = favorites.value.find((item) => item.id === product.id);
        if (!exists) {
            favorites.value.push(product);
            console.log("Added to favorites", favorites.value);
            localStorage.setItem(
                getLocalStorageKey("favorites"),
                JSON.stringify(favorites.value),
            );
        } else {
            console.log("Already in favorites:", product.id);
        }
    };

    return {
        cart,
        favorites,
        addToCart,
        addToFavorites,
    };
}
