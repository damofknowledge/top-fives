import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ButtonShare from '../../components/ButtonShare.vue';

describe('ButtonShare.vue', () => {
  let wrapper;
  let mockShare;
  let mockCopy;

  beforeEach(() => {
    mockShare = vi.fn();
    mockCopy = vi.fn();

    wrapper = mount(ButtonShare, {
      global: {
        mocks: {
          useClipboard: () => ({ copy: mockCopy }),
          useShare: () => ({ share: mockShare, isSupported: true }),
          useGameStore: () => ({}),
        },
      },
    });
  });

  it('renders a button', () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('renders "Share" text if not copied', () => {
    expect(wrapper.find('button').text()).toBe('Share');
  });

  it.skip('calls share function on click if sharing is supported', async () => {
    await wrapper.find('button').trigger('click');
    expect(mockShare).toHaveBeenCalled();
  });

  it.skip('calls copy function on click if sharing is not supported', async () => {
    wrapper.vm.isSupported = false;
    await wrapper.find('button').trigger('click');
    expect(mockCopy).toHaveBeenCalled();
  });
});
