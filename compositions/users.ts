import { ref } from '@vue/composition-api'
import * as api from '..//api/user'

export default () => {
  const _id = ref('')
  const name = ref('')
  const biography = ref('')

  const load = async (id: string) => {
    _id.value = id
    const user = await api.user(id)
    name.value = user.name
    biography.value = user.biography
  }

  const add = async () => {
    await api.addUser(name.value, biography.value)
  }

  const update = async () => {
    const user = { id: _id.value, name: name.value, biography: biography.value }
    await api.updateUser(user)
  }

  const clearValues = () => {
    name.value = ''
    biography.value = ''
  }

  return { name, biography, load, add, update, clearValues }
}
