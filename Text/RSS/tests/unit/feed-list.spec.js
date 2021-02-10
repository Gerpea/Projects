import { expect } from 'chai'
import { mount } from '@vue/test-utils'

import feedList from '../../src/components/feed-list.vue'
import feedCard from '../../src/components/feed-card.vue'

describe('feed-list', () => {
  it('should render feed cards', () => {
    const expected = 2
    const wrapper = mount(feedList, {
      propsData: {
        feed: Array(expected).fill({}),
      },
    })

    expect(wrapper.findAllComponents(feedCard).length).to.be.equal(expected)
  })
})
