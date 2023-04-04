<template>
    <div class="form-check-inline">
        <input type="checkbox" :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)" v-bind="$attrs" />
        <label>{{ label }}</label>
    </div>
</template>
    
<script>
export default {
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            required: true,
        },
    },
};
</script>
    