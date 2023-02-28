import { mount } from '@vue/test-utils';
import ServiceProviderDetails from '../../../components/settings/Main.vue';

describe('ServiceProviderDetails', () => {
  it('renders entity ID and ACS URL', () => {
    const entityId = 'entityId123';
    const acsURL = 'https://example.com/acs';
    const wrapper = mount(ServiceProviderDetails, {
      propsData: { entityId, acsURL },
    });
    expect(wrapper.text()).toContain(entityId);
    expect(wrapper.text()).toContain(acsURL);
  });

  it('emits copyText event when copy icon is clicked', async () => {
    const entityId = 'entityId123';
    const acsURL = 'https://example.com/acs';
    const wrapper = mount(ServiceProviderDetails, {
      propsData: { entityId, acsURL },
    });
    const copyIcon = wrapper.find('.content-copy');
    await copyIcon.trigger('click');
    expect(wrapper.emitted().copyText).toBeTruthy();
    expect(wrapper.emitted().copyText[0][0]).toBe(entityId);
  });
});

