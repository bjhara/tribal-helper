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
    <div class="container m-auto flex flex-col gap-2 p-2">
        <header class="flex flex-col gap-2">

            <nav class="flex flex-row-reverse">
                <Button icon="pi pi-search" class="mr-2" severity="secondary" />
                <Button icon="pi pi-list" class="mr-2" severity="secondary" />
                <Button icon="pi pi-bookmark" class="mr-2" severity="secondary" />
            </nav>

            <Dropdown v-model="selectedTribe" :options="tribeList" optionLabel="tribe" filter
                placeholder="Select a Tribe" class="w-full" />

            <ColorPicker v-model="selectedColors" />

            <div class="flex items-center gap-2">
                <Checkbox v-model="anthem" :binary="true" />
                <div>Anthem</div>
            </div>

            <div class="flex items-center gap-2">
                <div>Price:</div>
                <SelectButton v-model="price" :options="priceOptions" aria-labelledby="basic" />
            </div>

            <Button label="Search" @click="performQuery" :disabled="!searchEnabled" />
        </header>

        <main class="m-auto grid w-full grid-cols-[repeat(auto-fill,minmax(146px,_1fr))] gap-2">
            <div v-for="card in results" :key="card.id" class="justify-self-center"
                :data-image="card?.image_uris?.normal ?? card?.card_faces?.[0]?.image_uris?.normal"
                @click="displayLarge">
                <img :src="card?.image_uris?.small ?? card?.card_faces?.[0]?.image_uris?.small" :alt="card.name">
            </div>
        </main>

        <dialog ref="largeImageDialog" @click="$refs.largeImageDialog.close()">
            <div class="flex flex-col gap-2 p-4">
                <div class="flex flex-row-reverse gap-2">
                    <Button icon="pi pi-bookmark" class="mr-2" severity="secondary" />
                </div>
                <img :src="largeImage" alt="">
            </div>
        </dialog>
    </div>
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
            tribeList: tribes.map((t, i) => ({ tribe: t, plural: tribesPlural[i] })),
            anthem: false,
            price: "Any",
            priceOptions: ["Bulk", "Cheap", "Any"],
            results: [],
            largeImage: "",
        }
    },
    computed: {
        searchEnabled() {
            return this.selectedColors?.length > 0 && this.selectedTribe
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

            const anthem1 = `o:"other ${this.selectedTribe?.plural}"`
            const anthem2 = `o:"each other ${this.selectedTribe?.tribe}"`
            const anthem = this.anthem ? `(${anthem1} or ${anthem2})` : ""

            const price = priceToQuery(this.price)

            const query = `f:commander ${this.selectedColors} t:${this.selectedTribe.tribe} ${anthem} ${price}`
            const result = await Scryfall.get(query)


            this.results = (result != null) ? result /* result.slice(0, 10) */ : []
        },
    }
}
</script>
