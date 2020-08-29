import { User } from '../types/data/user'

export const addUser = async (name: string, biography: string) => {
  // TODO

  const user: User = { id: `id-of-user-${name}`, name: name.trim(), biography: biography.trim() }
  // eslint-disable-next-line no-console
  console.log('add user: ', user)
  return await Promise.resolve(user)
}
