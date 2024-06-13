import { defineStore } from 'pinia'

export const MIN_MANA_VALUE = 0
export const MAX_MANA_VALUE = 16

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            selectedTribe: undefined,
            selectedColors: undefined,
            anthem: false,
            price: "Any",
            manaValue: [MIN_MANA_VALUE, MAX_MANA_VALUE],
            results: [],
        }
    },
})
