import { renderRouter, screen } from 'expo-router/testing-library';
import { View } from 'react-native';

describe('Router Path Tests', () => {
  const MockComponent = jest.fn(() => <View />);

  beforeEach(() => {
    MockComponent.mockClear();
  });

  it('should render the correct component for /tasks', async () => {
    renderRouter(
      {
        index: MockComponent,
        tasks: MockComponent,
      },
      {
        initialUrl: '/tasks',
      }
    );

    expect(screen).toHavePathname('/tasks');
    expect(MockComponent).toHaveBeenCalledTimes(1);
  });

  it('should render the correct component for /tasks/new-task', async () => {
    renderRouter(
      {
        'tasks/new-task': MockComponent,
      },
      {
        initialUrl: '/tasks/new-task',
      }
    );

    expect(screen).toHavePathname('/tasks/new-task');
    expect(MockComponent).toHaveBeenCalledTimes(1);
  });

  it('should render the correct component for /tasks/:id', async () => {
    renderRouter(
      {
        'tasks/:id': MockComponent,
      },
      {
        initialUrl: '/tasks/123',
      }
    );

    expect(screen).toHavePathname('/tasks/123');
    expect(MockComponent).toHaveBeenCalledTimes(1);
  });
});
