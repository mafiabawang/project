<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <select name="sks" :value="modelValue" @change="$emit('update:modelValue', Number($event.target.value))"
            v-bind="$attrs">
            <option value="" v-if="placeholder">{{ placeholder }}</option>
            <option v-for="option in options" :value="option.value">
                {{ option.label }}
            </option>
        </select>
        <slot name="error"></slot>
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
        options: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
};
</script>
<style scoped>
.form-group {
    display: inline-block;
    margin-right: 10px;
}

label {
    text-align: left;
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

select {
     display: block;
     width: 100%;
     padding: 10px;
     border: 1px solid #ccc;
     border-radius: 5px;
     font-size: 16px;
     margin-top: 5px;
 }
</style>