import App from 'components/App'

test('returns hello message', () => {
  expect(new App().sayHello()).toBe('Hello!')
})
