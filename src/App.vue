<script setup>
import ColorPicker from '@/components/ColorPicker.vue'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import SelectButton from 'primevue/selectbutton'
import Scryfall from '@/services/Scryfall'
import { tribes, plural as tribesPlural } from '@/lib/tribes'
</script>

<template>
  <header class="max-w-sm m-auto flex flex-col gap-2">
    <Dropdown v-model="selectedTribe" :options="tribeList" optionLabel="tribe" filter placeholder="Select a Tribe" class="w-full" />
  
    <ColorPicker v-model="selectedColors" />

    <div class="flex items-center gap-2">
      <Checkbox v-model="anthem" :binary="true"/> 
      <div>Anthem</div>
    </div>

    <div class="flex items-center gap-2">
      <div>Price</div> 
      <SelectButton v-model="price" :options="priceOptions" aria-labelledby="basic" />
    </div>

    <Button label="Search" @click="performQuery" :disabled="!searchEnabled"/>
  </header>

  <main class="max-w-sm m-auto flex flex-wrap justify-between gap-2">
    <div v-for="card in results" :key="card.id">
      <img v-if="card?.image_uris?.small" :src="card?.image_uris?.small" :alt="card.name">
      <img v-else-if="card?.card_faces[0]?.image_uris?.small" :src="card?.card_faces[0]?.image_uris?.small" :alt="card.name">
    </div>
  </main>
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
      selectedTribe: undefined,
      selectedColors: undefined,
      tribeList: tribes.map((t, i) => ({ tribe: t, plural: tribesPlural[i]})),
      anthem: false,
      price: "Any",
      priceOptions: ["Bulk", "Cheap", "Any"],
      results: [],
    }
  },
  computed: {
    searchEnabled() {
      return this.selectedColors?.length > 0 && this.selectedTribe
    },
  },
  methods: {
    async performQuery() {
      if (!this.searchEnabled) {
        return
      }

      const anthem1 = `o:"other ${this.selectedTribe?.plural}"`
      const anthem2 = `o:"each other ${this.selectedTribe?.tribe}"`
      const anthem = this.anthem ? `(${anthem1} or ${anthem2})` : ""
      
      const price = priceToQuery(this.price)

      const query = `f:commander ${this.selectedColors} t:${this.selectedTribe.tribe} ${anthem} ${price}`
      const result = await Scryfall.get(query)


      this.results = (result != null) ? result.data.slice(0, 10) : []
    },
  }
}
</script>
