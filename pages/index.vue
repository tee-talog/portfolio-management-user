<template>
  <div class="container">
    <el-alert v-for="(flash, i) in flashList" :key="i" closable="false" :type="flash.type">{{
      flash.text
    }}</el-alert>

    <div>
      <el-button class="user-add" size="small" @click="moveToAddUser"><i class="el-icon-user-solid"></i>追加</el-button>
    </div>

    <div>
      <el-table :data="users">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="名前" />
        <el-table-column prop="biography" label="説明" />
        <el-table-column label="">
          <template v-slot="slotProps">
            <el-button size="small" @click="moveToUpdateUser(slotProps.row.id)">編集</el-button>
            <el-popconfirm
              title="本当に削除しますか？"
              confirm-button-text="はい"
              cancel-button-text="いいえ"
              hide-icon
              @onConfirm="deleteUser(slotProps.row.id)"
            >
              <el-button slot="reference" size="small">削除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { User } from '../types/data/user'
import { userList } from '../api/user-list'
import * as api from '../api/user'

export default defineComponent({
  setup(_props, context) {
    const users = ref<User[]>([])

    userList().then((res) => {
      users.value = res
    })

    const moveToAddUser = () => {
      context.root.$router.push('/user/add')
    }

    const moveToUpdateUser = (id: string) => {
      context.root.$router.push(`/user/${id}/update`)
    }

    const deleteUser = (id: string) => {
      api.deleteUser(id)
    }

    const flashList = context.root.$getFlash()

    return { users, moveToUpdateUser, deleteUser, flashList, moveToAddUser }
  },
})
</script>

<style scoped>
.user-add {
  margin-top: 20px;
}
</style>
