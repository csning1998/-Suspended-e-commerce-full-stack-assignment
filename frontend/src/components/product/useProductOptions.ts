import { ref } from "vue";

export function useProductOptions() {
    const selectedOptions = ref<
        Record<number, Record<string, string | number>>
    >({});

    // Calculate the price in the product obj
    const calculateTotalPrice = (
        product: Products,
    ): { _bestPrice: number; _discountPrice: number } => {
        let _bestPrice: number = product.basePrice;
        let _discountPrice: number = product.discountPrice || product.basePrice;
        const options: Record<string, number | string> =
            selectedOptions.value[product.id] || {};

        product.options.forEach((option: ProductOption): void => {
            const selectedValue: string | number = options[option.name];
            const matchedValue = option.values.find(
                (value): boolean => value.value === selectedValue,
            );
            if (matchedValue?.priceAdj) {
                _bestPrice += matchedValue.priceAdj;
                _discountPrice += matchedValue.priceAdj;
            }
        });

        return { _bestPrice, _discountPrice };
    };

    //
    const areAllOptionsSelected = (product: Products): boolean => {
        const options: Record<string, number | string> =
            selectedOptions.value[product.id];

        if (!options) return false;
        return product.options.every(
            (option: ProductOption): boolean =>
                options[option.name] !== undefined,
        );
    };

    const updateSelectedOption = (
        productId: number,
        optionName: string,
        optionValue: string | number,
    ): void => {
        if (!selectedOptions.value[productId]) {
            selectedOptions.value[productId] = {};
        }
        selectedOptions.value[productId][optionName] = optionValue;
    };

    return {
        selectedOptions,
        updateSelectedOption,
        calculateTotalPrice,
        areAllOptionsSelected,
    };
}
