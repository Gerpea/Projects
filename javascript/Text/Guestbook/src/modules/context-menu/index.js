import contextMenu from './context-menu.vue'

export default {
  install(Vue) {
    const menuComponent = Vue.extend({
      data: () => ({
        items: [],
        position: {
          x: 0,
          y: 0,
        },
        offset: {
          x: 0,
          y: 0,
        },
        display: false,
      }),
      methods: {
        show(params) {
          this.items = params?.items || []
          this.position = {
            ...{
              x: 0,
              y: 0,
            },
            ...(params?.position || {}),
          }
          this.offset = {
            ...{
              x: 0,
              y: 0,
            },
            ...(params?.offset || {}),
          }
          this.display = true
          this.$nextTick(() => {
            this.$el.focus()
          })
        },
        hide() {
          this.display = false
          this.items = []
          this.position = {
            x: 0,
            y: 0,
          }
          this.offset = {
            x: 0,
            y: 0,
          }
        },
      },
      render: function(h) {
        return h(contextMenu, {
          props: {
            items: this.items,
            left: this.position.x + this.offset.x,
            top: this.position.y + this.offset.y,
            display: this.display,
          },
          on: {
            blur: () => {
              this.hide()
            },
          },
        })
      },
    })

    const menuNode = document.createElement('div')
    menuNode.id = 'context-menu'
    document.body.appendChild(menuNode)
    const menu = new menuComponent().$mount('#' + menuNode.id)

    Vue.prototype.$contextMenu = {
      show: menu.show,
      hide: menu.hide,
    }
  },
}
