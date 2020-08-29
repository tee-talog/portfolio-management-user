import * as store from './store/store'

export const userList = async () => {
  return await store.users()
}
