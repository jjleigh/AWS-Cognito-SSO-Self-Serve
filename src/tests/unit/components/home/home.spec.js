import { mount } from '@vue/test-utils';
import Home from '../../../../components/Home.vue';

describe('Home', () => {
  // Mount the component
  const wrapper = mount(Home);

  // Test that the component renders a paragraph element with the correct text
  it('displays the correct text', () => {
    const text = wrapper.find('p').text();
    expect(text).toBe('This is Home');
  });

  // ...
});
