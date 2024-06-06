<script setup>
import Button from 'primevue/button'
import { mapStores } from 'pinia'
import { useBookmarksStore } from '@/stores/bookmarks'
</script>

<template>
  <dialog
    ref="cardDialog"
    @click="$refs.cardDialog.close()"
  >
    <div class="flex flex-col gap-2 p-4">
      <div class="flex flex-row-reverse gap-2">
        <Button
          :icon="bookmarkIcon"
          class="mr-2"
          severity="secondary"
          @click.stop="bookmark"
        />
      </div>
      <img
        :src="cardUrls.normal"
        alt=""
      >
    </div>
  </dialog>
</template>

<script>
export default {
    expose: ["showModal"],
    props: {
        cardUrls: {
            type: Object,
            required: true
        },
        cardId: {
            type: String,
            required: true
        }
    },
    computed: {
      ...mapStores(useBookmarksStore),
      bookmarkIcon() {
        if (this.bookmarksStore.isBookmarked(this.cardId)) {
          return "pi pi-bookmark-fill"
        }
        
        return "pi pi-bookmark"
      }
    },
    methods: {
        showModal() {
            this.$refs.cardDialog.showModal()
        },
        bookmark() {
          this.bookmarksStore.toggleBookmark(this.cardId, this.cardUrls)
        }
    }
}
</script>