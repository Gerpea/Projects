import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Message from '@/components/message.vue'

describe('message.vue', () => {
  describe('props', () => {
    describe(':dateTime', () => {
      it('should set to initialValue when undefined', () => {
        const wrapper = mount(Message, {
          propsData: {
            content: '',
          },
        })

        expect(wrapper.vm.$props.dateTime).to.be.an.instanceOf(Date)
      })
    }),
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
