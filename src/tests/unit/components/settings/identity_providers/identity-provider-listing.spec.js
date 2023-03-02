import { shallowMount } from '@vue/test-utils';
import IdentityProviderListing from '../../../../../components/settings/identity_providers/IdentityProviderListing'

describe('IdentityProviderListing', () => {
  let wrapper;

  const identityProviders = [
    { providerType: 'Type1', providerName: 'Provider1' },
    { providerType: 'Type2', providerName: 'Provider2' },
  ];

  beforeEach(() => {
    wrapper = shallowMount(IdentityProviderListing, {
      propsData: {
        identityProviders,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('displays a list of identity providers', () => {
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toEqual(identityProviders.length);
    identityProviders.forEach((identityProvider, index) => {
      const row = rows.at(index);
      expect(row.text()).toContain(`${identityProvider.providerType}:${identityProvider.providerName}`);
    });
  });

//   it('emits a delete event when delete button is clicked', async() => {
//     wrapper.setData({ dialog: false });
//     const openDeleteModalButton = wrapper.find('.open-delete-modal-button');
  
//     expect(wrapper.find('.delete-dialog').exists()).toBeFalsy();
  
//     openDeleteModalButton.trigger('click');
//     await wrapper.vm.$nextTick();
  
//     const deleteModal = wrapper.find('.delete-dialog');
//     expect(deleteModal.exists()).toBeTruthy();
//     // expect(deleteModal.attributes('aria-hidden')).toBe('true');
  
//     const deleteButton = deleteModal.find('.delete-button');
//     deleteButton.trigger('click');
  
//     expect(wrapper.emitted().deleteProvider).toBeTruthy();
//     expect(wrapper.emitted().deleteProvider[0]).toEqual([identityProviders[0].providerName]);
//   });

//   it('emits a delete event when delete button is clicked', async() => {
//     const openDeleteModalButton = wrapper.find('.open-delete-modal-button');
//     const deleteModal = wrapper.find('.delete-dialog');

//     expect(wrapper.find('.delete-dialog').exists()).toBeFalsy();

//     // expect(deleteModal.attributes('aria-hidden')).toBe('true');

//     openDeleteModalButton.trigger('click');
//     await wrapper.vm.$nextTick();

//     console.log('delete modal', deleteModal.html());

//     expect(deleteModal.attributes('aria-hidden')).toBe('false')
    
//     // const deleteButton = deleteModal.find('.delete-button');
//     // deleteButton.trigger('click');

//     // expect(wrapper.emitted().deleteProvider).toBeTruthy();
//     // expect(wrapper.emitted().deleteProvider[0]).toEqual([identityProviders[0].providerName]);
//   });

  it('emits a toggleEditMode event when edit button is clicked', () => {
    const editButtons = wrapper.findAll('.edit-button');
    const firstEditButton = editButtons.at(0);

    firstEditButton.trigger('click');

    expect(wrapper.emitted().toggleEditMode).toBeTruthy();
    expect(wrapper.emitted().toggleEditMode[0]).toEqual([identityProviders[0].providerName]);
  });
});
