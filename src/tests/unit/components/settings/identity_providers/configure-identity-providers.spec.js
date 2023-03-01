import { shallowMount } from '@vue/test-utils';
import ConfigureIdentityProvider from '../../../../../components/settings/identity_providers/ConfigureIdentityProvider.vue';

describe('HomeSConfigureIdentityProvidercreen', () => {
  it('renders a form with input fields for provider name, type, and metadata', () => {
    const wrapper = shallowMount(ConfigureIdentityProvider);
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('[label="Provider Name"]').exists()).toBe(true);
    expect(wrapper.find('[label="Select Provider Type"]').exists()).toBe(true);
    expect(wrapper.find('[label="Metadata document"]').exists()).toBe(true);
    expect(wrapper.find('[label="Metadata URL"]').exists()).toBe(true);
  });

//   it('submits the form with the entered data', async () => {
//     const wrapper = shallowMount(ConfigureIdentityProvider);
//     const providerNameInput = wrapper.find('.provider-name');
//     const providerTypeInput = wrapper.find('.provider-type')
//     const metadataURLInput = wrapper.find('.metadata-url')
//     const submitButton = wrapper.find('v-btn[type="submit"]')

//     console.log(providerNameInput.html())

//     providerNameInput.setValue('Test Provider')
//     providerTypeInput.setValue('SAML')
//     metadataURLInput.setValue('https://testprovider.com/metadata.xml')
//     await submitButton.trigger('submit')

//     await wrapper.vm.$nextTick();

//     expect(wrapper.emitted('createProvider')).toBeTruthy()
//     expect(wrapper.emitted('createProvider')[0][0]).toEqual({
//       providerName: 'Test Provider',
//       providerType: 'SAML',
//       providerDetails: {
//         metadataFile: undefined,
//         metadataURL: 'https://testprovider.com/metadata.xml'
//       }
//     })
//   });
  
});
