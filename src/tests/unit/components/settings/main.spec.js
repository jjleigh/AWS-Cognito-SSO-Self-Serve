import { shallowMount } from '@vue/test-utils';
import Main from '../../../../components/settings/Main.vue';

describe('Main.vue', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(Main);
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the correct tabs', async () => {
        const wrapper = shallowMount(Main);

        await wrapper.vm.$nextTick();


        const tabs = wrapper.findAll('.page-tabs');
        expect(tabs).toHaveLength(2);
        expect(tabs.at(0).text()).toBe('Identity Providers');
        expect(tabs.at(1).text()).toBe('Users');
    });

    it('loads userpool info on mount', async () => {
        const wrapper = shallowMount(Main);
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.entityId).toBe('urn:amazon:cognito:sp:userPoolId');
        expect(wrapper.vm.acsURL).toBe('https://example.auth.us-east-1.amazoncognito.com/saml2/idpresponse');
    });
});
