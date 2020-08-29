import Vue, { VueConstructor } from 'vue'

type FlashMessage = {
  type: 'success' | 'warning' | 'info' | 'error'
  text: string
}

const VueFlash = {
  install(Vue: VueConstructor) {
    let flashList: FlashMessage[] = []
    let flashNowPage: FlashMessage[] = []

    Vue.prototype.$setFlash = (arg: FlashMessage) => {
      flashList.push(arg)
    }

    Vue.prototype.$getFlash = () => {
      return flashNowPage
    }

    Vue.mixin({
      beforeCreate() {
        flashNowPage = flashList
        flashList = []
      },
    })
  },
}

Vue.use(VueFlash)

declare module 'vue/types/vue' {
  interface Vue {
    $setFlash: (arg: FlashMessage) => void
    $getFlash: () => FlashMessage[]
  }
}
