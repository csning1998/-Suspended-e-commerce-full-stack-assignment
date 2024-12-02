import { type Reactive, reactive } from "vue";

export const products: Reactive<Products[]> = reactive<Products[]>([
    {
        id: 1,
        name: "Google LLC.",
        link2Pic:
            "https://m.media-amazon.com/images/I/61vp97LSYFL._AC_SL1500_.jpg",
        price: 1005.0,
        discountPrice: 995.0,
        collection: "Mobile Phone",
        category: "Pixel 9 Pro XL",
        sizes: [128, 256, 512, 1024],
        colors: ["Porcelain", "Hazel", "Obsidian", "Rose Quartz"],
    },
    {
        id: 2,
        name: "Google LLC.",
        link2Pic:
            "https://m.media-amazon.com/images/I/81JV1TrIGlL._AC_SL1500_.jpg",
        price: 574,
        discountPrice: 459,
        collection: "Tablets",
        category: "Pixel Tablet with Speaker Dock",
        sizes: [128, 256],
        colors: ["Porcelain", "Hazel", "Rose"],
    },
    {
        id: 3,
        name: "Google LLC.",
        link2Pic:
            "https://m.media-amazon.com/images/I/61iVGS1pGIL._AC_SL1500_.jpg",
        price: 349,
        discountPrice: 299,
        collection: "Wearables",
        category: "Pixel Watch 2",
        sizes: [1, 2],
        colors: ["Matte Black", "Polished Silver", "Champagne Gold"],
    },
    {
        id: 4,
        name: "Google LLC.",
        link2Pic:
            "https://m.media-amazon.com/images/I/610C3ekZPTL._AC_SL1500_.jpg",
        price: 199,
        discountPrice: 179,
        collection: "Home Devices",
        category: "Nest Hub Max",
        sizes: [],
        colors: ["Chalk", "Charcoal"],
    },
    {
        id: 5,
        name: "Google LLC.",
        link2Pic:
            "https://m.media-amazon.com/images/I/71YtvwJl+2L._AC_SL1500_.jpg",
        price: 129,
        discountPrice: 109,
        collection: "Audio",
        category: "Nest Audio",
        sizes: [],
        colors: ["Sand", "Sky", "Charcoal", "Chalk"],
    },
    {
        id: 6,
        name: "Microsoft Corporation",
        link2Pic:
            "https://m.media-amazon.com/images/I/51h5pB5k3LL._AC_SL1280_.jpg",
        price: 1399,
        discountPrice: 627,
        collection: "Laptops",
        category: "Surface Laptop 5",
        sizes: [256, 512],
        colors: ["Platinum", "Matte Black", "Sandstone"],
    },
    {
        id: 7,
        name: "Microsoft Corporation",
        link2Pic:
            "https://m.media-amazon.com/images/I/51BN5o0rkwL._AC_SL1000_.jpg",
        price: 1599,
        discountPrice: 1499,
        collection: "Tablets",
        category: "Surface Pro 9",
        sizes: [128, 256, 512, 1024],
        colors: ["Platinum", "Sapphire", "Forest", "Graphite"],
    },
    {
        id: 8,
        name: "Microsoft Corporation",
        link2Pic:
            "https://m.media-amazon.com/images/I/61e71pD8y6L._AC_SL1500_.jpg",
        price: 129,
        discountPrice: 117,
        collection: "Accessories",
        category: "Surface Slim Pen 2",
        sizes: [],
        colors: ["Black", "Silver"],
    },
    {
        id: 9,
        name: "Google LLC.",
        link2Pic:
            "https://m.media-amazon.com/images/I/71NwcH4sdYL._AC_SL1500_.jpg",
        price: 59,
        discountPrice: 49,
        collection: "Audio",
        category: "Chromecast with Google TV",
        sizes: [],
        colors: ["Snow", "Sunrise", "Sky"],
    },
    {
        id: 10,
        name: "Microsoft Corporation",
        link2Pic:
            "https://m.media-amazon.com/images/I/41tdV+LJ4uL._AC_SL1000_.jpg",
        price: 49,
        discountPrice: 39,
        collection: "Accessories",
        category: "Modern Mobile Mouse",
        sizes: [],
        colors: ["Black", "White", "Blue", "Peach"],
    },
]);
