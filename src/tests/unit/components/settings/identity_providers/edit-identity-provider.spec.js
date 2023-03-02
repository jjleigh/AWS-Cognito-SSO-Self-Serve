import { mount } from '@vue/test-utils';
import EditIdentityProvider from '../../../../../components/settings/identity_providers/EditIdentityProvider.vue';

describe('EditIdentityProvider', () => {
  const identityProvider = {
    providerName: 'Test Provider',
    providerType: 'SAML',
  };

  it('renders correctly with provider information', () => {
    const wrapper = mount(EditIdentityProvider, {
      propsData: {
        identityProvider,
      },
    });

    expect(wrapper.find('.provider-name').attributes('modelvalue'))
      .toBe(identityProvider.providerName);
    expect(wrapper.find('.provider-type').attributes('modelvalue'))
      .toBe(identityProvider.providerType);
  });

  it('emits an event to update provider when the form is submitted', async () => {
    const wrapper = mount(EditIdentityProvider, {
      propsData: {
        identityProvider,
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('updateProvider')).toBeTruthy();
    expect(wrapper.emitted('updateProvider')[0]).toEqual([identityProvider]);
  });

  it('emits an event to toggle edit mode when the cancel button is clicked', async () => {
    const wrapper = mount(EditIdentityProvider, {
      propsData: {
        identityProvider,
      },
    });

    await wrapper.find('.cancel-button').trigger('click');
    expect(wrapper.emitted('toggleEditMode')).toBeTruthy();
  });

  // it('emits an event to toggle edit mode and update provider when the update button is clicked', async () => {
  //   const wrapper = mount(EditIdentityProvider, {
  //     propsData: {
  //       identityProvider,
  //     },
  //   });

  //   wrapper.find('.metadata-url input').setValue('https://example.com');

  //   console.log(wrapper.html());

  //   await wrapper.find('form').trigger('submit.prevent');

  //   expect(wrapper.emitted('toggleEditMode')).toBeTruthy();
  //   expect(wrapper.emitted('updateProvider')).toBeTruthy();
  //   expect(wrapper.emitted('updateProvider')[0]).toEqual([newProvider]);
  // });
});
