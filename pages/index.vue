<template>
  <div class="container">
    <el-table :data="users">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="名前" />
      <el-table-column prop="biography" label="説明" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { User } from '../types/data/user'
import { userList } from '../api/user-list'

export default defineComponent({
  setup() {
    const users = ref<User[]>([])

    userList().then((res) => {
      users.value = res
    })

    return { users }
  },
})
</script>
