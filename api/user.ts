import * as store from './store/store'

export const addUser = async (name: string, biography: string) => {
  // mock
  return await store.addUser(name, biography)
}
