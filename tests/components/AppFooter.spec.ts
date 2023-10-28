import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AppFooter from '../../components/AppFooter.vue';

describe('AppFooter', () => {
  it('exists', () => {
    const wrapper = mount(AppFooter);
    expect(wrapper.html()).toBeTruthy();
  });
});
