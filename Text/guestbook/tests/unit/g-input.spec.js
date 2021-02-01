import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import GInput from '@/components/g-input.vue'

describe('g-input.vue', () => {
  describe('events', () => {
    describe('@input', () => {
      it('should be called after input', () => {
        const wrapper = mount(GInput)
        const expected = 'value'

        const input = wrapper.find('input')
        input.element.value = expected
        input.trigger('input')

        expect(wrapper.emitted().input[0]).to.deep.eq([expected])
      })
    }),
      describe('@submit', () => {
        it('should be called after enter key pressed', () => {
          const wrapper = mount(GInput)
          const expected = 'value'

          const input = wrapper.find('input')
          input.element.value = expected
          input.trigger('keydown.enter')

          expect(wrapper.emitted().submit[0]).to.deep.eq([expected])
        })
      })
  })
})
