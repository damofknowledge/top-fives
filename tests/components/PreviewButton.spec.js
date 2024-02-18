import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PreviewButton from '@/components/PreviewButton.vue';

describe('PreviewButton.vue', () => {
  it('exists', () => {
    const wrapper = mount(PreviewButton, {
      shallow: true,
      props: {
        track: { preview_url: 'http://test.com' },
        index: 0,
      },
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    expect(wrapper.exists());
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined();
  });

  it('emits a preview event when clicked', async () => {
    const wrapper = mount(PreviewButton, {
      shallow: true,
      props: {
        track: { preview_url: 'http://test.com' },
        index: 0,
      },
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().preview).toBeTruthy();
    expect(wrapper.emitted().preview[0]).toEqual([0]); // checks that the first argument of the first emit call is 0
  });

  it('displays a message when a preview is not available', () => {
    const wrapper = mount(PreviewButton, {
      shallow: true,
      props: {
        track: { preview_url: null },
        index: 0,
      },
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.find('.sr-only').text()).toBe('A preview of this song is not available');
  });
});
