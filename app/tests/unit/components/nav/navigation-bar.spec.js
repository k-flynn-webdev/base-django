import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import navigationBar from '@/components/nav/navigation-bar'


describe('components - navigation', () => {
  it('should render a level', () => {
    const wrapper = shallowMount(navigationBar, {
      stubs: ['router-link', 'router-view']
    })

    const navDiv = wrapper.find('.level.is-mobile.mb-3')

    expect(navDiv.exists()).to.be.true
  })

  it('should return a title', () => {

    const noRoute = navigationBar.computed.pageTitle.call({
      $route : null
    })

    expect(noRoute).to.equal('')

    const noMeta = navigationBar.computed.pageTitle.call({
      $route : {}
    })

    expect(noMeta).to.equal('')

    const noTitle = navigationBar.computed.pageTitle.call({
      $route : { meta: { title: null }}
    })

    expect(noTitle).to.equal('')

    const hasTitle = navigationBar.computed.pageTitle.call({
      $route : { meta: { title: 'hasTitleHere' }}
    })

    expect(hasTitle).to.equal('hasTitleHere')
  })
  it('renders a div')
  it('renders a navigation')
  it('clicking home goes to home url')
  it('changing route.meta.title should change the title')
})
