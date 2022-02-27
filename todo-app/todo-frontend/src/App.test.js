import { render, screen } from '@testing-library/react';
import App from './App';
import Todo from './Todos/Todo';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Todos/i);
  expect(linkElement).toBeInTheDocument();
});

test('single todo is correctly displayed', () => {
  render(<Todo todo={{ text: "test todo", done: false }} deleteTodo={() => { }} completeTodo={() => { }}/>);
  const linkElement = screen.getByText(/test todo/i);
  expect(linkElement).toBeInTheDocument();
});
