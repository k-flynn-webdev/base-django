import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import CsrfStore from '@/store/csrf.js'

// todo more tests
describe('CsrfStore.vue', () => {
  it('updating the token also updates the requested_at time')
  it('makes a api call to the csrf endpoint')
  it('if a token was recently requested it should NOT make another call to the csrf endpoint')
})
