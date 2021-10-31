import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import feedCard from '../../src/components/feed-card.vue'
import dateTime from '../../src/components/date-time.vue'

describe('feed-card', () => {
  describe(':title', () => {
    it('should render title', () => {
      const expected = 'String'
      const wrapper = mount(feedCard, {
        propsData: {
          title: expected,
        },
      })

      expect(wrapper.text()).to.include(expected)
    })
  })
  describe(':description', () => {
    it('should render description', () => {
      const expected = 'String'
      const wrapper = mount(feedCard, {
        propsData: {
          description: expected,
        },
      })

      expect(wrapper.text()).to.include(expected)
    })
  })
  describe(':author', () => {
    it('should render author', () => {
      const expected = 'String'
      const wrapper = mount(feedCard, {
        propsData: {
          author: expected,
        },
      })

      expect(wrapper.text()).to.include(expected)
    })
  })
  describe(':time', () => {
    it('should render time when time is correct', () => {
      const time = 'Mon, 25 Dec 1995 13:30:00 GMT'
      const wrapper = mount(feedCard, {
        propsData: {
          time,
        },
      })

      expect(wrapper.findComponent(dateTime).exists()).to.be.true
    })

    it('should not render time when time is incorrect', () => {
      const time = "I'm The Time"
      const wrapper = mount(feedCard, {
        propsData: {
          time,
        },
      })

      expect(wrapper.findComponent(dateTime).exists()).to.be.false
    })
  })
})
