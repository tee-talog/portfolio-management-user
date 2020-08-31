<template>
  <div class="add-container">
    <h2 class="subtitle">ユーザー編集</h2>
    <UserInfoForm
      :name="name"
      :biography="biography"
      :disabled="processing"
      :error-messages="errorMessages"
      primary-text="更新"
      @click-primary="updateUser"
      @click-cancel="historyBack"
      @click-clear="clearValues"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import useUser from '../../../compositions/users'
import UserInfoForm from '../../../components/form/UserInfoForm.vue'

export default defineComponent({
  components: {
    UserInfoForm,
  },
  setup(_props, context) {
    const id = context.root.$route.params.id

    const processing = ref(false)
    const errorMessages = ref<string[]>([])

    const { name, biography, load, update, clearValues } = useUser()

    processing.value = true
    load(id)
      .then((_e) => {
        processing.value = false
      })
      .catch((_e) => {
        errorMessages.value = ['ユーザー情報の取得に失敗しました']
      })

    const updateUser = async (user: { name: string; biography: string }) => {
      processing.value = true

      name.value = user.name
      biography.value = user.biography

      try {
        await update()
        context.root.$setFlash({ type: 'success', text: 'ユーザー情報を更新しました' })
        context.root.$router.push('/')
      } catch (e) {
        errorMessages.value = ['ユーザーの変更に失敗しました']
        processing.value = false
      }
    }

    const historyBack = () => {
      context.root.$router.back()
      processing.value = true
    }

    return { name, biography, updateUser, historyBack, clearValues, processing, errorMessages }
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
