<script setup>
import ColorPicker from '@/components/ColorPicker.vue'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import Scryfall from '@/services/Scryfall'
import { tribes, plural as tribesPlural } from '@/lib/tribes'
</script>

<template>
  <header class="max-w-sm m-auto">
    <Dropdown v-model="selectedTribe" :options="tribeList" optionLabel="tribe" filter placeholder="Select a Tribe" class="w-full" />
  
    <ColorPicker v-model="selectedColors" />

    <Checkbox v-model="anthem" :binary="true"/> Anthem

    <Button label="Search" @click="performQuery" />
  </header>

  <main class="max-w-sm m-auto flex flex-wrap justify-between gap-2">
    <div v-for="card in results" :key="card.id">
      <img v-if="card?.image_uris?.small" :src="card?.image_uris?.small" :alt="card.name">
      <img v-else-if="card?.card_faces[0]?.image_uris?.small" :src="card?.card_faces[0]?.image_uris?.small" :alt="card.name">
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      selectedTribe: undefined,
      selectedColors: undefined,
      tribeList: tribes.map((t, i) => ({ tribe: t, plural: tribesPlural[i]})),
      anthem: false,
      results: [],
    }
  },
  methods: {
    async performQuery() {
      if (!this.selectedColors || !this.selectedColors) {
        return
      }

      const anthem = this.anthem ? `o:"other ${this.selectedTribe.plural}"` : ""
      const query = `f:commander ${this.selectedColors} t:${this.selectedTribe.tribe} ${anthem}`
      const result = await Scryfall.get(query)

      this.results = (result != null) ? result.data.slice(0, 10) : []
    },
  }
}
</script>
