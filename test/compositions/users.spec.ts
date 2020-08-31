import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import useUser from '../../compositions/users'
// eslint-disable-next-line
import * as api from '../../api/user'
// const { name, biography, load, update, clearValues } = useUser()

Vue.use(VueCompositionApi)
jest.mock('../../api/user')

describe('users', () => {
  describe('load', () => {
    test('実行すると api.user が呼び出される', async () => {
      const mockedUser = api.user as jest.Mock<ReturnType<typeof api.user>>
      mockedUser.mockClear()
      mockedUser.mockResolvedValue({ id: 'mock-id', name: 'mock-name', biography: 'mock-biography' })

      const { load } = useUser()
      await load('id')

      expect(mockedUser).toHaveBeenCalled()
    })

    describe('実行すると値が設定される', () => {
      test('name', async () => {
        const mockedUser = api.user as jest.Mock<ReturnType<typeof api.user>>
        mockedUser.mockClear()
        mockedUser.mockResolvedValue({ id: 'mock-id', name: 'mock-name', biography: 'mock-biography' })

        const { name, load } = useUser()
        await load('id')

        expect(name.value).toBe('mock-name')
      })

      test('biography', async () => {
        const mockedUser = api.user as jest.Mock<ReturnType<typeof api.user>>
        mockedUser.mockClear()
        mockedUser.mockResolvedValue({ id: 'mock-id', name: 'mock-name', biography: 'mock-biography' })

        const { biography, load } = useUser()
        await load('id')

        expect(biography.value).toBe('mock-biography')
      })
    })
  })

  describe('add', () => {
    test('実行すると api.addUser が呼び出される', async () => {
      const mockedAddUser = api.addUser as jest.Mock<ReturnType<typeof api.addUser>>
      mockedAddUser.mockClear()

      const { add } = useUser()
      await add()

      expect(mockedAddUser).toHaveBeenCalled()
    })

    describe('正しい値で api.addUser が呼び出される', () => {
      test('name', async () => {
        const mockedAddUser = api.addUser as jest.Mock<ReturnType<typeof api.addUser>>
        mockedAddUser.mockClear()
        const { name, add } = useUser()
        name.value = 'mock-name'

        await add()

        expect(mockedAddUser.mock.calls[0][0]).toBe('mock-name')
      })

      test('biography', async () => {
        const mockedAddUser = api.addUser as jest.Mock<ReturnType<typeof api.addUser>>
        mockedAddUser.mockClear()
        const { biography, add } = useUser()
        biography.value = 'mock-biography'

        await add()

        expect(mockedAddUser.mock.calls[0][1]).toBe('mock-biography')
      })
    })
  })

  describe('update', () => {
    test('実行すると api.updateUser が呼び出される', async () => {
      const mockedUpdateUser = api.updateUser as jest.Mock<ReturnType<typeof api.updateUser>>
      mockedUpdateUser.mockClear()

      const { update } = useUser()
      await update()

      expect(mockedUpdateUser).toHaveBeenCalled()
    })

    describe('正しい値で api.updateUser が呼び出される', () => {
      test('id', async () => {
        // ID は load を呼ぶことで設定できる
        const mockedUser = api.user as jest.Mock<ReturnType<typeof api.user>>
        mockedUser.mockClear()
        mockedUser.mockResolvedValue({ id: 'id', name: 'mock-name', biography: 'mock-biography' })

        const mockedUpdateUser = api.updateUser as jest.Mock<ReturnType<typeof api.updateUser>>
        mockedUpdateUser.mockClear()

        const { load, update } = useUser()
        await load('mock-id')

        await update()

        expect(mockedUpdateUser.mock.calls[0][0].id).toBe('mock-id')
      })

      test('name', async () => {
        const mockedUpdateUser = api.updateUser as jest.Mock<ReturnType<typeof api.updateUser>>
        mockedUpdateUser.mockClear()
        const { name, update } = useUser()
        name.value = 'mock-name'

        await update()

        expect(mockedUpdateUser.mock.calls[0][0].name).toBe('mock-name')
      })

      test('biography', async () => {
        const mockedUpdateUser = api.updateUser as jest.Mock<ReturnType<typeof api.updateUser>>
        mockedUpdateUser.mockClear()
        const { biography, update } = useUser()
        biography.value = 'mock-biography'

        await update()

        expect(mockedUpdateUser.mock.calls[0][0].biography).toBe('mock-biography')
      })
    })
  })

  describe('clearValues', () => {
    describe('実行するとデータが空になる', () => {
      test('name', () => {
        const { name, clearValues } = useUser()
        name.value = 'mock-name'

        clearValues()

        expect(name.value).toBe('')
      })

      test('biography', () => {
        const { biography, clearValues } = useUser()
        biography.value = 'mock-biography'

        clearValues()

        expect(biography.value).toBe('')
      })
    })
  })
})
