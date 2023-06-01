<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input v-bind="$attrs" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" />
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
        }, modelValue: {
            type: [String, Number],
            default: null,
        },
    },
    created() {
        console.log(this.$attrs);
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

 input[type="text"],
 input[type="number"],
 input[type="password"] {
     display: block;
     width: 80%;
     padding: 10px;
     border: 1px solid #ccc;
     border-radius: 5px;
     font-size: 16px;
     margin-top: 5px;
 }
</style>
    