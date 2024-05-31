<script setup>
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
</script>

<template>
    <div class="color-picker">
        <div>
            <i class="ms ms-w"></i>
            <Checkbox v-model="white" :binary="true" />
        </div>

        <div>
            <i class="ms ms-u"></i>
            <Checkbox v-model="blue" :binary="true" />
        </div>

        <div>
            <i class="ms ms-b"></i>
            <Checkbox v-model="black" :binary="true" />
        </div>

        <div>
            <i class="ms ms-r"></i>
            <Checkbox v-model="red" :binary="true" />
        </div>

        <div>
            <i class="ms ms-g"></i>
            <Checkbox v-model="green" :binary="true" />
        </div>

        <div>
            <i class="ms ms-c"></i>
            <Checkbox v-model="colorless" :binary="true" />
        </div>

        <div class="ml-4">
            <RadioButton v-model="variant" name="variant" value="id" /> Identity
            <RadioButton v-model="variant" name="varaint" value="eq" /> Equality
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
            (vm) => (vm.white, vm.blue, vm.black, vm.red, vm.green, vm.colorless, vm.variant, Date.now()),
            function () {
                const values = [this.white, this.blue, this.black, this.red, this.green, this.colorless ]
                const text = ["w", "u", "b", "r", "g", "c"]
                const colors = values.map((v, i) => [v, text[i]]).filter(([v, ]) => v).map(([, c]) => c)
                const colorString = colors.join('')
                

                const query = (this.variant === "id") ? "id:" + colorString : "c=" + colorString
                this.$emit('update:modelValue', query)
            }
        )
    }
}
</script>

<style scoped>
.color-picker {
    display: flex;
    justify-content: space-between;

    div {
        display: flex;
        gap: 0.25rem;
        align-items: center;
    }

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
}
</style>