import { mount } from '@vue/test-utils';
import IdentityProvidersTab from '../../../../../components/settings/identity_providers/IdentityProvidersTab.vue';
import IdentityProviderListing from '../../../../../components/settings/identity_providers/IdentityProviderListing.vue';
import ConfigureIdentityProvider from '../../../../../components/settings/identity_providers/ConfigureIdentityProvider.vue';
import EnableIdentityProvider from '../../../../../components/settings/identity_providers/EnableIdentityProvider.vue';
import EditIdentityProvider from '../../../../../components/settings/identity_providers/EditIdentityProvider.vue';

describe('IdentityProvidersTab', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(IdentityProvidersTab, {
      components: {
        IdentityProviderListing,
        ConfigureIdentityProvider,
        EnableIdentityProvider,
        EditIdentityProvider,
      },
      data() {
        return {
          identityProviders: [],
          editProviderMode: false,
          identityProvider: {
            providerName: undefined,
            providerType: '',
            providerDetails: {
              metadataFile: undefined,
              metadataURL: undefined,
            },
          },
          userpoolClient: {
            configureddIdentityProviders: [],
            enabledIdentityProviders: [],
          },
        };
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('shows the ConfigureIdentityProvider component', () => {
    const configureIdentityProvider = wrapper.findComponent(ConfigureIdentityProvider);
    expect(configureIdentityProvider.isVisible()).toBe(true);
  });

  it('shows the EnableIdentityProvider component', () => {
    const enableIdentityProvider = wrapper.findComponent(EnableIdentityProvider);
    expect(enableIdentityProvider.isVisible()).toBe(true);
  });

  it('shows the IdentityProviderListing component', () => {
    const identityProviderListing = wrapper.findComponent(IdentityProviderListing);
    expect(identityProviderListing.isVisible()).toBe(true);
  });

  it('does not show the EditIdentityProvider component', () => {
    const editIdentityProvider = wrapper.findComponent(EditIdentityProvider);
    expect(editIdentityProvider.isVisible()).toBe(false);
  });

  it('toggles the editProviderMode when handleToggleEditMode is called', async () => {
    const toggleButton = wrapper.find('.edit-button');
    toggleButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.editProviderMode).toBe(true);
  });

  it('updates the identityProvider when handleToggleEditMode is called with providerName', async () => {
    const toggleButton = wrapper.find('.edit-button');
    toggleButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.identityProvider.providerName).toBe('Okta');
  });

  it('shows the EditIdentityProvider component when editProviderMode is true', async () => {
    wrapper.setData({ editProviderMode: true });
    await wrapper.vm.$nextTick();

    const editIdentityProvider = wrapper.findComponent(EditIdentityProvider);
    expect(editIdentityProvider.isVisible()).toBe(true);
  });

  it('hides the IdentityProviderListing component when editProviderMode is true', async () => {
    wrapper.setData({ editProviderMode: true });
    await wrapper.vm.$nextTick();

    const identityProviderListing = wrapper.findComponent(IdentityProviderListing);
    expect(identityProviderListing.isVisible()).toBe(false);
  });
});
