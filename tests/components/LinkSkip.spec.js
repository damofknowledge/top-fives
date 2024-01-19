import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import LinkSkip from '../../components/LinkSkip.vue';

describe('LinkSkip', () => {
  it('is an accessible link to the page content', () => {
    const wrapper = mount(LinkSkip);
    expect(wrapper.attributes('href')).toEqual('#main-content');
  });
});
