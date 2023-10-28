import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AppHeader from '../../components/AppHeader.vue';

describe('AppHeader', () => {
  it('exists', () => {
    const wrapper = mount(AppHeader, {
      shallow: true,
      global: {
        stubs: {
          FontAwesomeIcon: true,
        }
      }
    });
    console.log(wrapper.html());
    expect(wrapper.html()).toBeTruthy();
  });
});
