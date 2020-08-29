import { User } from '../../types/data/user'

const _users: User[] = []

// test data
_users.push(
  ...[
    { id: 'id-user1', name: 'user1 name', biography: "this is user1's biography" },
    { id: 'id-user2', name: 'user2 name', biography: "this is user2's biography" },
    { id: 'id-user3', name: 'user3 name', biography: "this is user3's biography" },
  ],
)

export const addUser = async (name: string, biography: string): Promise<User> => {
  const id = `id-${name}`
  if (_users.some((e) => e.id === id)) {
    return Promise.reject(new Error(`ID: ${id} is already exist`))
  }

  const user: User = { id, name: name.trim(), biography: biography.trim() }
  _users.push(user)
  return await Promise.resolve(user)
}

export const updateUser = async (user: User) => {
  const index = _users.findIndex((e) => e.id === user.id)
  if (index < 0) {
    // ユーザーが存在しない場合
    return Promise.reject(new Error(`user not found. ID: ${user.id}`))
  }

  _users.splice(index, 1, user)
  return await Promise.resolve()
}

export const users = async () => {
  return await Promise.resolve(_users)
}

export const user = async (id: string) => {
  const index = _users.findIndex((e) => e.id === id)
  if (index < 0) {
    // ユーザーが存在しない場合
    return Promise.reject(new Error(`user not found. ID: ${id}`))
  }
  return await Promise.resolve(_users[index])
}

export const deleteUser = async (id: string) => {
  const index = _users.findIndex((e) => e.id === id)
  if (index < 0) {
    // ユーザーが存在しない場合
    return Promise.reject(new Error(`user not found. ID: ${id}`))
  }

  _users.splice(index, 1)
  return await Promise.resolve()
}
