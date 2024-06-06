import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useBookmarksStore = defineStore('bookmarks', {
    state: () => {
        return {
            bookmarks: useLocalStorage("bookmarks", new Map())
        }
    },
    actions: {
        isBookmarked(id) {
            return this.bookmarks.has(id)
        },
        addBookmark(id, url) {
            this.bookmarks.set(id,  url)
        },
        removeBookmark(id) {
            this.bookmarks.delete(id)
        },
        toggleBookmark(id, url) {
            if (this.isBookmarked(id)) {
                this.removeBookmark(id)
            }
            else {
                this.addBookmark(id, url)
            }
        }
    }
})
