<template>
    <div class="form-check-inline">
        <input type="radio" :value="value" :checked="modelValue == value"
            @change="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
        <label>{{ label }}</label>
    </div>
</template>
    
<script>
export default {
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            default: null,
        },
        value: {
            type: [String, Number],
            required: true,
        },
    },
};
</script>
<style scoped>
.form-check-inline {
     display: inline-flex;
     align-items: center;
     padding-left: 0;
 }
</style>