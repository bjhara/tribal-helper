<script setup>
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Scryfall from '@/services/Scryfall'
</script>

<template>
  <form class="flex flex-col gap-2">
    <Textarea
      v-model="listText"
      rows="5"
    />
    <Button
      label="Search"
      @click="performQuery"
    />
  </form>

  <main class="m-auto grid w-full grid-cols-[repeat(auto-fill,minmax(146px,_1fr))] gap-2">
    <div
      v-for="card in results"
      :key="card.id"
      class="justify-self-center"
      :data-id="card?.id"
      :data-image-normal="card?.image_uris?.normal ?? card?.card_faces?.[0]?.image_uris?.normal"
      :data-image-small="card?.image_uris?.small ?? card?.card_faces?.[0]?.image_uris?.small"
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
</template>

<script>
function buildQuery(names) {
  if (names.length === 0) {
    return ""
  }

  let query = `!"${names.pop()}"`
  while (names.length > 0) {
    const nextName = names.pop()
    if (nextName.length + query.length > 950) {
      names.push(nextName)
      break
    }

    query += encodeURIComponent(` or !"${nextName}"`)
  }

  return query
}

export default {
  data() {
    return {
      listText: "",
      results: [],
    }
  },
  methods: {
    async performQuery() {
      const names = this.listText.split(/[\r\n]/).map(n => n.trim()).filter(n => n.length > 0)
      do {
        const query = buildQuery(names)
        const results = await Scryfall.get(query, true)
        this.results.push(...results)
      } while (names.length > 0)
    }
  }
}
</script>