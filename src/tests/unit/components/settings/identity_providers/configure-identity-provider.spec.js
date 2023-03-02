import { mount } from '@vue/test-utils';
import ConfigureIdentityProvider from '../../../../../components/settings/identity_providers/ConfigureIdentityProvider.vue';

describe('ConfigureIdentityProvider', () => {
  it('renders a form with input fields for provider name, type, and metadata', () => {
    const wrapper = mount(ConfigureIdentityProvider);

    expect(wrapper.find('form').isVisible()).toBe(true);
    expect(wrapper.find('.provider-name').isVisible()).toBe(true);
    expect(wrapper.find('.provider-type').isVisible()).toBe(true);
    expect(wrapper.find('.metadata-file').isVisible()).toBe(true);
    expect(wrapper.find('.metadata-url').isVisible()).toBe(true);
  });

  // it('submits the form with the entered data', async () => {
  //   const wrapper = mount(ConfigureIdentityProvider);
  //   const providerName = wrapper.find('.provider-name');
  //   const providerNameInput = wrapper.find('.provider-name input');

  //   const providerTypeInput = wrapper.find('.provider-type input')
  //   const metadataURLInput = wrapper.find('.metadata-url input')
  //   const submitButton = wrapper.find('.submit-buttons')

  //   // console.log(providerName.html())
  //   // console.log(providerNameInput.html())

  //   providerNameInput.setValue('Test Provider')
  //   providerTypeInput.setValue('SAML')
  //   metadataURLInput.setValue('https://testprovider.com/metadata.xml')
  //   await submitButton.trigger('submit')

  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.emitted('createProvider')).toBeTruthy()
  //   expect(wrapper.emitted('createProvider')[0][0]).toEqual({
  //     providerName: 'Test Provider',
  //     providerType: 'SAML',
  //     providerDetails: {
  //       metadataFile: undefined,
  //       metadataURL: 'https://testprovider.com/metadata.xml'
  //     }
  //   })
  // });
});
