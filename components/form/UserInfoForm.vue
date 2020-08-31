<template>
  <form class="form" @submit.prevent>
    <el-alert v-for="(message, i) in innerErrorMessages" :key="i" closable="false" type="error">{{ message }}</el-alert>

    <FormItem v-model="innerName" class="form-item" text="名前" input-id="name" />
    <FormItem v-model="innerBiography" class="form-item" text="説明" input-id="biography" />

    <div class="form_actions">
      <el-button :disabled="disabled" type="primary" @click="clickPrimary">{{ primaryText }}</el-button>
      <el-button :disabled="disabled" type="info" @click="clickCancel">キャンセル</el-button>
      <el-button :disabled="disabled" @click="clickClear">クリア</el-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import FormItem from './UserInfoFormItem.vue'

export default defineComponent({
  components: {
    FormItem,
  },
  props: {
    name: {
      type: String,
      require: true,
    },
    biography: {
      type: String,
      require: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: Array,
      require: true,
    },
    primaryText: {
      type: String,
      require: true,
    },
  },

  setup(props, context) {
    const innerName = ref(props.name)
    const innerBiography = ref(props.biography)

    const clickPrimary = () => {
      context.emit('click-primary', { name: innerName.value, biography: innerBiography.value })
    }

    const clickCancel = () => {
      context.emit('click-cancel')
    }

    const clickClear = () => {
      context.emit('click-clear')
    }

    return {
      clickPrimary,
      clickCancel,
      clickClear,
      innerName,
      innerBiography,
      innerErrorMessages: props.errorMessages as string[],
    }
  },
})
</script>

<style scoped>
.form {
  width: 100%;
}

.form_item {
  margin: 20px 0;
}

.form_actions {
  margin-top: 30px;
}
</style>
