<script setup>
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
</script>

<template>
    <div class="flex flex-wrap items-center gap-2.5">
        <div class="flex gap-1">
            <i class="ms ms-w"></i>
            <Checkbox v-model="white" :binary="true" />
        </div>

        <div class="flex gap-1">
            <i class="ms ms-u"></i>
            <Checkbox v-model="blue" :binary="true" />
        </div>

        <div class="flex gap-1">
            <i class="ms ms-b"></i>
            <Checkbox v-model="black" :binary="true" />
        </div>

        <div class="flex gap-1">
            <i class="ms ms-r"></i>
            <Checkbox v-model="red" :binary="true" />
        </div>

        <div class="flex gap-1">
            <i class="ms ms-g"></i>
            <Checkbox v-model="green" :binary="true" />
        </div>

        <div class="flex gap-1">
            <i class="ms ms-c"></i>
            <Checkbox v-model="colorless" :binary="true" />
        </div>

        <div class="flex items-center gap-1">
            <RadioButton v-model="variant" name="variant" value="id" />
            <div>Id</div>
        </div>

        <div class="flex items-center gap-1">
            <RadioButton v-model="variant" name="varaint" value="eq" />
            <div>Eq</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            variant: "id",
            red: false,
            green: false,
            blue: false,
            black: false,
            white: false,
            colorless: false,
        }
    },
    created() {
        this.$watch(
            (vm) => [vm.white, vm.blue, vm.black, vm.red, vm.green, vm.colorless, vm.variant, Date.now()],
            function () {
                const values = [this.white, this.blue, this.black, this.red, this.green, this.colorless]
                const text = ["w", "u", "b", "r", "g", "c"]
                const colors = values.map((v, i) => [v, text[i]]).filter(([v,]) => v).map(([, c]) => c)
                const colorString = colors.join('')

                if (colorString.length === 0) {
                    this.$emit('update:modelValue', "")
                    return
                }

                const query = (this.variant === "id") ? "id:" + colorString : "c=" + colorString
                this.$emit('update:modelValue', query)
            }
        )
    }
}
</script>

<style scoped>
.ms-r {
    color: red;
}

.ms-g {
    color: darkseagreen;
}

.ms-u {
    color: blue;
}

.ms-w {
    color: wheat;
}

.ms-c {
    color: darkgrey;
}
</style>