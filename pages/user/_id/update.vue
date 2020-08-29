<template>
  <div class="add-container">
    <h2 class="subtitle">ユーザー編集</h2>
    <form class="form" @submit.prevent>
      <el-alert v-for="(message, i) in errorMessages" :key="i" closable="false" type="error">{{ message }}</el-alert>

      <div class="form_name">
        <label for="name">名前</label>
        <el-input id="name" v-model="name" clearable />
      </div>

      <div class="form_biography">
        <label for="biography">説明</label>
        <el-input id="biography" v-model="biography" type="textarea" autosize clearable />
      </div>

      <div class="form_actions">
        <el-button :disabled="processing" type="primary" @click="updateUser">更新</el-button>
        <el-button :disabled="processing" type="info" @click="historyBack">キャンセル</el-button>
        <el-button :disabled="processing" @click="clearValues">クリア</el-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import * as api from '../../../api/user'

export default defineComponent({
  setup(_props, context) {
    const id = context.root.$route.params.id
    const name = ref('')
    const biography = ref('')
    const processing = ref(false)
    const errorMessages = ref<string[]>([])

    processing.value = true
    api
      .user(id)
      .then((e) => {
        name.value = e.name
        biography.value = e.biography
        processing.value = false
      })
      .catch((e) => {
        errorMessages.value = ['ユーザー情報の取得に失敗しました']
      })

    const updateUser = async () => {
      processing.value = true
      const user = { id, name: name.value, biography: biography.value }
      try {
        await api.updateUser(user)
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

    const clearValues = () => {
      name.value = ''
      biography.value = ''
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

.form {
  width: 100%;
}

.form_name,
.form_bioraphy {
  margin: 20px 0;
}

.form_actions {
  margin-top: 30px;
}
</style>
