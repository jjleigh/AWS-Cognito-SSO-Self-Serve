import { mount, shallowMount } from '@vue/test-utils'
import ServiceProviderDetails from '../../../../components/settings/ServiceProviderDetails.vue'

describe('ServiceProviderDetails', () => {
  it('renders the entityId prop correctly', () => {
    const entityId = 'entityId123'
    const acsURL = 'https://example.com/acs'

    const wrapper = shallowMount(ServiceProviderDetails, {
      propsData: {
        entityId: entityId,
        acsURL: acsURL
      }
    })
    expect(wrapper.find('.page-title').text()).toBe('Service Provider Details')
    expect(wrapper.find('.entity-id').text()).toBe(`Entity ID: ${entityId}`)
    expect(wrapper.find('.acs-url').text()).toBe(`ACS URL: ${acsURL}`)
  })

  it('emits the copyText event when the copy icon is clicked', () => {
    const entityId = 'entityId123'
    const acsURL = 'https://example.com/acs'

    const wrapper = mount(ServiceProviderDetails, {
      propsData: {
        entityId,
        acsURL
      }
    })

    const copyIcon = wrapper.find('.content-copy:first-of-type')
    copyIcon.trigger('click')

    expect(wrapper.emitted().copyText).toBeTruthy()
    expect(wrapper.emitted().copyText[0]).toEqual([entityId])
  })
})
