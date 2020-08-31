<template>
  <div class="add-container">
    <h2 class="subtitle">ユーザー追加</h2>
    <UserInfoForm
      :name="name"
      :biography="biography"
      :disabled="processing"
      :error-messages="errorMessages"
      primary-text="追加"
      @click-primary="addUser"
      @click-cancel="historyBack"
      @click-clear="clearValues"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import useUser from '../../compositions/users'
import UserInfoForm from '../../components/form/UserInfoForm.vue'

export default defineComponent({
  components: {
    UserInfoForm,
  },
  setup(_props, context) {
    const processing = ref(false)
    const errorMessages = ref<string[]>([])

    const { name, biography, add, clearValues } = useUser()

    const addUser = async (user: { name: string; biography: string }) => {
      processing.value = true

      name.value = user.name
      biography.value = user.biography

      try {
        await add()
        context.root.$setFlash({ type: 'success', text: 'ユーザーを追加しました' })
        context.root.$router.push('/')
      } catch (e) {
        errorMessages.value = ['ユーザーの追加に失敗しました']
        processing.value = false
      }
    }

    const historyBack = () => {
      context.root.$router.back()
      processing.value = true
    }

    return { name, biography, addUser, historyBack, clearValues, processing, errorMessages }
  },
})
</script>

<style scoped>
.add-container {
  margin: 0 10vw;
}

.subtitle {
  margin-bottom: 30px;
}
</style>
