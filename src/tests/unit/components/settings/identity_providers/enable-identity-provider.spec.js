import { mount } from '@vue/test-utils'
import EnableIdentityProvider from '../../../../../components/settings/identity_providers/EnableIdentityProvider.vue'
  
describe('EnableIdentityProvider.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(EnableIdentityProvider, {
            propsData: {
                userpoolClient: {
                    configuredIdentityProviders: ['Okta', 'Azure AD', 'Ping', 'COGNITO'],
                    enabledIdentityProviders: ['Okta', 'Ping', 'COGNITO'],
                }
            }
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the configured identity providers', () => {
        const checkboxes = wrapper.findAll('.enable-provider-checkbox');

        expect(checkboxes.at(0).attributes('label')).toBe('Select All');
        expect(checkboxes.at(1).attributes('value')).toBe('Okta');
        expect(checkboxes.at(2).attributes('value')).toBe('Azure AD');
        expect(checkboxes.at(3).attributes('value')).toBe('Ping');
        expect(checkboxes.at(4).attributes('value')).toBe('COGNITO');
        expect(checkboxes.at(4).attributes('label')).toBe('Email and Password');
        
    });

    it('displays the enabled identity providers as checked', () => {
        const checkboxes = wrapper.findAll('.enable-provider-checkbox');

        expect(checkboxes.at(0).attributes('checked')).toBeFalsy();
        expect(checkboxes.at(1).attributes('checked')).toBeTruthy();
        expect(checkboxes.at(2).attributes('checked')).toBe('false');
        expect(checkboxes.at(3).attributes('checked')).toBeTruthy();
        expect(checkboxes.at(4).attributes('checked')).toBeTruthy();
    });

    it('emits an "updateClient" event with the selected providers', async () => {
        const form = wrapper.find('form');
        await form.trigger('submit');

        expect(wrapper.emitted('updateClient')[0][0]).toEqual({
        SupportedIdentityProviders: ['Okta', 'Ping', 'COGNITO']
        });
    });

    // it('checks "Select All" when all providers are selected', async () => {
    //     const checkboxes = wrapper.findAll('.enable-provider-checkbox');
    //     // const azureCheckbox = wrapper.find('.Azure')
    //     const azureCheckbox = wrapper.find('[data-test="Azure AD"]')
    //     const selectAllCheckbox = checkboxes.at(0)

    //     // console.log(selectAllCheckbox.html());
    //     console.log(azureCheckbox.html());
        
    //     expect(selectAllCheckbox.attributes('checked')).toBeFalsy();
    //     expect(azureCheckbox.attributes('checked')).toBe('false');

    //     azureCheckbox.setChecked();

    //     console.log('second check');
    //     console.log(selectAllCheckbox.html());
    //     console.log(azureCheckbox.html());

    //     expect(azureCheckbox.attributes('checked')).toBe('true');
    //     // expect(selectAllCheckbox.attributes('checked')).toBeTruthy();
    // });

    // it('unchecks "Select All" when a provider is deselected', async () => {
    //     wrapper = shallowMount(EnableIdentityProvider, {
    //         propsData: {
    //             userpoolClient: {
    //                 configuredIdentityProviders: ['Okta', 'Azure AD', 'Ping', 'COGNITO'],
    //                 enabledIdentityProviders: ['Okta', 'Ping', 'COGNITO', 'Azure AD'],
    //             }
    //         }
    //     });
    //     const checkboxes = wrapper.findAll('.enable-provider-checkbox');
    //     const oktaCheckbox = wrapper.find('.Okta')
    //     const selectAllCheckbox = checkboxes.at(0)

    //     expect(selectAllCheckbox.attributes('checked')).toBe('true');
    //     expect(oktaCheckbox.attributes('checked')).toBe('true');

    //     await oktaCheckbox.setValue(false);

    //     // await wrapper.vm.toggleSelectAll({ target: { checked: true } });
    //     expect(oktaCheckbox.attributes('checked')).toBe('false');
    //     expect(selectAllCheckbox.attributes('checked')).toBe('false');
    // });

    // it('adds an identity provider to the selectedProviders array when its checkbox is checked', async () => {
    //     const checkboxes = wrapper.findAll('.enable-provider-checkbox');
    //     const azureCheckbox = checkboxes.at(2)
    //     expect(wrapper.vm.selectedProviders).not.toContain('Azure AD')

    //     await azureCheckbox.setValue(true);
    //     expect(wrapper.vm.selectedProviders).toContain('Azure AD')
    // })

    // it('removes an identity provider from the selectedProviders array when its checkbox is unchecked', async () => {
    //     const checkboxes = wrapper.findAll('.enable-provider-checkbox');
    //     const oktaCheckbox = checkboxes.at(1)
    //     expect(wrapper.vm.selectedProviders).toContain('Okta')

    //     await oktaCheckbox.setValue(false);
    //     // await wrapper.vm.$nextTick();

    //     expect(wrapper.vm.selectedProviders).not.toContain('Okta')
    // })
});