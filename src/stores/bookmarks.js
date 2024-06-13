import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useBookmarksStore = defineStore('bookmarks', {
    state: () => ({
        // TODO: I'm not really sure if we should set listenToStorage changes but it removes a warning
        // in the console for now...
        bookmarks: useLocalStorage("bookmarks", new Map(), { listenToStorageChanges: false })
    }),
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
