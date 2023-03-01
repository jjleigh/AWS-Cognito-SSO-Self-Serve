import { shallowMount } from '@vue/test-utils'
import UserListing from '../../../../../components/settings/users/UserListing'

describe('UserListing', () => {
  const users = [
    {
      Username: 'user1',
      Enabled: true,
      UserStatus: 'ACTIVE',
      UserLastModifiedDate: '2022-02-28',
      UserCreateDate: '2022-01-01'
    },
    {
      Username: 'user2',
      Enabled: false,
      UserStatus: 'INACTIVE',
      UserLastModifiedDate: '2022-02-27',
      UserCreateDate: '2022-01-02'
    }
  ]
  
  it('renders the correct number of rows', () => {
    const wrapper = shallowMount(UserListing, { propsData: { users } })
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
  })

  it('emits the toggleUserDisplay event when a username is clicked', () => {
    const wrapper = shallowMount(UserListing, { propsData: { users } })
    const usernameCell = wrapper.find('.user-listing-username')
    usernameCell.trigger('click')
    expect(wrapper.emitted().toggleUserDisplay).toBeTruthy()
    expect(wrapper.emitted().toggleUserDisplay[0][0]).toBe('user1')
  })
})
