<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <div>
            <base-radio :name="name" v-for="option in options" :key="`radio-${option.value}`" :label="option.text"
                :value="option.value" :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"></base-radio>
        </div>
        <slot name="error"></slot>
    </div>
</template>
    
<script>
export default {
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Number],
            default: null,
        },
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
};
</script>
<style scoped>
label {
     text-align: left;
     display: block;
     font-weight: bold;
     margin-bottom: 5px;
 }

.form-group {
    display: inline-block;
    margin-right: 10px;
}

</style>

    