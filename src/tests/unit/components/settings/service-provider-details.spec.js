import { mount } from '@vue/test-utils';
import ServiceProviderDetails from '../../../../components/settings/ServiceProviderDetails.vue'

describe('ServiceProviderDetails', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ServiceProviderDetails, {
      propsData: {
        entityId: '12345',
        acsURL: 'http://example.com/acs',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('displays the entity ID and ACS URL', () => {
    expect(wrapper.find('.entity-id').text()).toContain('12345');
    expect(wrapper.find('.acs-url').text()).toContain('http://example.com/acs');
  });

  it('calls copyText method when copy entity ID button is clicked', async () => {
    const copyTextSpy = jest.spyOn(wrapper.vm, 'copyText');
    const copyEntityIdBtn = wrapper.find('.copy-entity-id');

    await copyEntityIdBtn.trigger('click');
    expect(copyTextSpy).toHaveBeenCalledWith('12345');
  });

  it('calls copyText method when copy ACS URL button is clicked', async () => {
    const copyTextSpy = jest.spyOn(wrapper.vm, 'copyText');
    const copyAcsUrlBtn = wrapper.find('.copy-acs-url');

    await copyAcsUrlBtn.trigger('click');
    expect(copyTextSpy).toHaveBeenCalledWith('http://example.com/acs');
  });
});

