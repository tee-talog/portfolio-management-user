import { User } from '../types/data/user'
import * as store from './store/store'

export const addUser = async (name: string, biography: string) => {
  // mock
  return await store.addUser(name, biography)
}

export const updateUser = async (user: User) => {
  // mock
  return await store.updateUser(user)
}

export const deleteUser = async (id: string) => {
  // mock
  return await store.deleteUser(id)
}
