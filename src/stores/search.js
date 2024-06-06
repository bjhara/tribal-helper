import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            selectedTribe: undefined,
            selectedColors: undefined,
            anthem: false,
            price: "Any",
            results: [],
        }
    },
})
