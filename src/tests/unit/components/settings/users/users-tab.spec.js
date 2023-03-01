import { shallowMount } from '@vue/test-utils'
import UsersTab from '../../../../../components/settings/users/UsersTab'

describe('UsersTab', () => {

    it('renders UserListing component when user.Username is falsy', async () => {
        const wrapper = shallowMount(UsersTab);

        await wrapper.vm.$nextTick();

        const userListing = wrapper.findComponent({ name: 'UserListing' });
        const userDetails = wrapper.findComponent({ name: 'UserDetails' });

        expect(userListing.isVisible()).toBe(true);
        expect(userDetails.isVisible()).toBe(false);
    });

    it('renders UserDetails component when user.Username is truthy', async () => {
        const wrapper = shallowMount(UsersTab);
        await wrapper.setData({ user: { Username: 'Jane_Doe' }});

        await wrapper.vm.$nextTick();

        const userListing = wrapper.findComponent({ name: 'UserListing' });
        const userDetails = wrapper.findComponent({ name: 'UserDetails' });

        expect(userListing.isVisible()).toBe(false);
        expect(userDetails.isVisible()).toBe(true);
    });

    it('fetches users on mounted', async () => {
        const fetchUsersSpy = jest.spyOn(UsersTab.methods, 'fetchUsers')
        shallowMount(UsersTab)
    
        expect(fetchUsersSpy).toHaveBeenCalled()
    });
});