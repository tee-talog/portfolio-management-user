<template>
  <div>
    <label :for="inputId">{{ text }}</label>
    <el-input :id="inputId" :value="value" clearable @input="input" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    inputId: {
      type: String,
      default: null,
    },
  },

  setup(_props, context) {
    const input = (val: string) => {
      context.emit('input', val)
    }
    return { input }
  },
})
</script>
