import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Message from '@/components/message.vue'

describe('message.vue', () => {
  describe('props', () => {
    describe(':content', () => {
      it('should display content', () => {
        const content = 'Content'
        const wrapper = mount(Message, {
          propsData: {
            content,
          },
        })

        expect(wrapper.html().includes(content)).to.eq(true)
      })
    })
  })
})
