import { User } from '../types/data/user'

export const userList = async () => {
  const list = await Promise.resolve<User[]>([
    { id: 'user1', name: 'user1 name', biography: "this is user1's biography" },
    { id: 'user2', name: 'user2 name', biography: "this is user2's biography" },
    { id: 'user3', name: 'user3 name', biography: "this is user3's biography" },
    { id: 'user4', name: 'user4 name', biography: "this is user4's biography" },
    { id: 'user5', name: 'user5 name', biography: "this is user5's biography" },
    { id: 'user6', name: 'user6 name', biography: "this is user6's biography" },
    { id: 'user7', name: 'user7 name', biography: "this is user7's biography" },
    { id: 'user8', name: 'user8 name', biography: "this is user8's biography" },
    { id: 'user9', name: 'user9 name', biography: "this is user9's biography" },
    { id: 'user10', name: 'user10 name', biography: "this is user10's biography" },
  ])
  return list
}
