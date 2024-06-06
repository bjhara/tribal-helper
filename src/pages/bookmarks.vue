<script setup>
import CardDialog from  '@/components/CardDialog.vue'
import { mapStores } from 'pinia'
import { useBookmarksStore } from '@/stores/bookmarks'
</script>

<template>
  <main class="m-auto grid w-full grid-cols-[repeat(auto-fill,minmax(146px,_1fr))] gap-2">
    <div
      v-for="[id, url] of bookmarksStore.bookmarks"
      :key="id"
      class="justify-self-center"
      :data-id="id"
      :data-image-small="url.small"
      :data-image-normal="url.normal"
      @click="displayLarge"
    >
      <img
        loading="lazy"
        width="146"
        height="204"
        :src="url.small"
        alt=""
      >
    </div>

    <CardDialog
      ref="largeImageDialog"
      :card-urls="largeImageUrls"
      :card-id="largeImageId"
    />
  </main>
</template>

<script>
export default {
  data() {
    return {
      largeImageUrls: {},
      largeImageId: "",
    }
  },
  computed: {
    ...mapStores(useBookmarksStore)
  },
  methods: {
    async displayLarge(event) {
      this.largeImageUrls = { small: event.currentTarget.dataset.imageSmall, normal: event.currentTarget.dataset.imageNormal }
      this.largeImageId = event.currentTarget.dataset.id
      this.$refs.largeImageDialog.showModal()
    },
  }
}
</script>