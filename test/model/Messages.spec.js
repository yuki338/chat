import { mount } from '@vue/test-utils'
const Message = require('../../model/Message')

describe('Sample Test', () => {
  test('should test that true === true', async () => {
    const message = await Message.getMessages('0')
    console.log(message)
    expect(message).toBe('test')
  })
})
