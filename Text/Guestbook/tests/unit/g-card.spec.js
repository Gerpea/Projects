import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import gCard from '@/components/g-card.vue'

describe('g-button.vue', () => {
  describe(':size', () => {
    const sizes = ['n', 's']
    sizes.forEach((size) => {
      it(`should set class == 'g-card--${size}'`, () => {
        const wrapper = mount(gCard, {
          propsData: {
            size,
          },
        })

        expect(wrapper.classes()).to.contain(`g-card--${size}`)
      })
    })
  })
})
