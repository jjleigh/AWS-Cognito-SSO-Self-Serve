import { mount } from '@vue/test-utils'
import UserDetails from '../../../../../components/settings/users/UserDetails.vue'

describe('UserDetails.vue', () => {
  const user = {
    Username: 'testuser',
    Email: 'testuser@test.com',
    Enabled: true,
    UserStatus: 'CONFIRMED',
    UserLastModifiedDate: '2022-01-01T00:00:00Z',
    UserCreateDate: '2021-01-01T00:00:00Z',
  }

  it('renders the user details correctly', () => {
    const wrapper = mount(UserDetails, {
      propsData: { user }
    })

    expect(wrapper.find('.user-details-username').text()).toEqual(user.Username)
    expect(wrapper.find('.user-details-email').text()).toEqual(user.Email)
    expect(wrapper.find('.user-details-enabled').text()).toEqual(user.Enabled.toString())
    expect(wrapper.find('.user-details-account-status').text()).toEqual(user.UserStatus)
    expect(wrapper.find('.user-details-updated').text()).toEqual(user.UserLastModifiedDate)
    expect(wrapper.find('.user-details-created').text()).toEqual(user.UserCreateDate)
  })

  it('emits "disableCognitoUser" when the "Disable user" button is clicked', () => {
    const wrapper = mount(UserDetails, {
      propsData: { user }
    })

    const button = wrapper.find('.disable-user')
    button.trigger('click')
    expect(wrapper.emitted('disableCognitoUser')).toBeTruthy()
  })

  it('emits "enableCognitoUser" when the "Enable user" button is clicked', () => {
    user.Enabled = false
    const wrapper = mount(UserDetails, {
      propsData: { user }
    })

    const button = wrapper.find('.enable-user')
    button.trigger('click')
    expect(wrapper.emitted('enableCognitoUser')).toBeTruthy()
  })

  it('emits "toggleUserDisplay" when the close icon is clicked', () => {
    const wrapper = mount(UserDetails, {
      propsData: { user }
    })

    const icon = wrapper.find('.close')
    icon.trigger('click')
    expect(wrapper.emitted('toggleUserDisplay')).toBeTruthy()
    expect(wrapper.emitted('toggleUserDisplay')[0]).toEqual([user.Username])
  })
})
