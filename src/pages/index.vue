<script setup>
import ColorPicker from '@/components/ColorPicker.vue'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import SelectButton from 'primevue/selectbutton'
import Scryfall from '@/services/Scryfall'
import { tribes, plural as tribesPlural } from '@/lib/tribes'
import { mapStores } from 'pinia'
import { useSearchStore } from '@/stores/search'
</script>

<template>
  <header class="flex flex-col gap-2">
    <Dropdown
      v-model="searchStore.selectedTribe"
      :options="tribeList"
      option-label="tribe"
      filter
      placeholder="Select a Tribe"
      class="w-full"
    />

    <ColorPicker v-model="searchStore.selectedColors" />

    <div class="flex items-center gap-2">
      <Checkbox
        :id="$id('anthem')"
        v-model="searchStore.anthem"
        :binary="true"
      />
      <label :for="$id('anthem')">Anthem</label>
    </div>

    <div class="flex items-center gap-2">
      <div>Price:</div>
      <SelectButton
        v-model="searchStore.price"
        :options="priceOptions"
        aria-labelledby="basic"
      />
    </div>

    <Button
      label="Search"
      :disabled="!searchEnabled"
      @click="performQuery"
    />
  </header>

  <main class="m-auto grid w-full grid-cols-[repeat(auto-fill,minmax(146px,_1fr))] gap-2">
    <div
      v-for="card in searchStore.results"
      :key="card.id"
      class="justify-self-center"
      :data-image="card?.image_uris?.normal ?? card?.card_faces?.[0]?.image_uris?.normal"
      @click="displayLarge"
    >
      <img
        loading="lazy"
        width="146"
        height="204"
        :src="card?.image_uris?.small ?? card?.card_faces?.[0]?.image_uris?.small"
        :alt="card.name"
      >
    </div>
  </main>

  <dialog
    ref="largeImageDialog"
    @click="$refs.largeImageDialog.close()"
  >
    <div class="flex flex-col gap-2 p-4">
      <div class="flex flex-row-reverse gap-2">
        <Button
          icon="pi pi-bookmark"
          class="mr-2"
          severity="secondary"
        />
      </div>
      <img
        :src="largeImage"
        alt=""
      >
    </div>
  </dialog>
</template>

<script>
function priceToQuery(price) {
  switch (price) {
    case "Cheap":
      return "eur<7"
    case "Bulk":
      return "eur<2"
    default:
      return ""
  }
}

export default {
  data() {
    return {
      tribeList: tribes.map((t, i) => ({ tribe: t, plural: tribesPlural[i] })),
      priceOptions: ["Bulk", "Cheap", "Any"],
      largeImage: "",
    }
  },
  computed: {
    ...mapStores(useSearchStore),
    searchEnabled() {
      return this.searchStore.selectedColors?.length > 0 && this.searchStore.selectedTribe
    },
  },
  methods: {
    async displayLarge(event) {
      this.largeImage = event.currentTarget.dataset.image
      this.$refs.largeImageDialog.showModal()

    },
    async performQuery() {
      if (!this.searchEnabled) {
        return
      }

      const anthem1 = `o:"other ${this.searchStore.selectedTribe?.plural}"`
      const anthem2 = `o:"each other ${this.searchStore.selectedTribe?.tribe}"`
      const anthem = this.searchStore.anthem ? `(${anthem1} or ${anthem2})` : ""

      const price = priceToQuery(this.searchStore.price)

      const query = `f:commander ${this.searchStore.selectedColors} t:${this.searchStore.selectedTribe.tribe} ${anthem} ${price}`
      const result = await Scryfall.get(query)


      this.searchStore.results = (result != null) ? result /* result.slice(0, 10) */ : []
    },
  }
}
</script>
