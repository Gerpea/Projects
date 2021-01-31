import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import GButton from '@/components/g-button.vue'

describe('g-button.vue', () => {
  describe(':squared', () => {
    it('should set width same as height when == TRUE', () => {
      const wrapper = mount(GButton, {
        propsData: {
          squared: true,
        },
      })

      expect(wrapper.find('button').element.offsetWidth).to.eq(
        wrapper.find('button').element.offsetHeight
      )
    })
  }),
    describe('@click', () => {
      it('should be called after click on button', () => {
        const wrapper = mount(GButton)

        wrapper.find('button').trigger('click')

        expect(wrapper.emitted().click[0]).to.deep.eq([])
      })
    })
})
