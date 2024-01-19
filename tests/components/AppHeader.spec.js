import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { reactive } from 'vue';

import AppHeader from '../../components/AppHeader.vue';

describe('AppHeader', () => {
  let wrapper;
  let state;

  beforeEach(() => {
    state = reactive({
      modalIsOpen: false,
      modalName: '',
    });

    wrapper = mount(AppHeader, {
      shallow: true,
      global: {
        provide: {
          state,
        },
        mocks: {
          $route: {
            params: {
              game: 'game1',
            },
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  });

  it('renders a header', () => {
    expect(wrapper.find('header').exists()).toBe(true);
  });

  it('renders three buttons', () => {
    expect(wrapper.find('header').findAll('button').length).toBe(3);
  });

  it('initial state is correct', () => {
    expect(wrapper.vm.state.modalIsOpen).toBe(false);
    expect(wrapper.vm.state.modalName).toBe('');
  });

  it('help button opens modal and changes state correctly', async () => {
    let button = wrapper.find('button[data-testid="help-button"]');
    await button.trigger('click');
    expect(wrapper.vm.state.modalIsOpen).toBe(true);
    expect(wrapper.vm.state.modalName).toBe('help');
  });

  it('stats button opens modal and changes state correctly', async () => {
    let button = wrapper.find('button[data-testid="stats-button"]');
    await button.trigger('click');
    expect(wrapper.vm.state.modalIsOpen).toBe(true);
    expect(wrapper.vm.state.modalName).toBe('stats');
  });
});
