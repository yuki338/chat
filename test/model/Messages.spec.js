import { format } from 'date-fns'
const connection = require('../../model/DbConnection')
const Message = require('../../model/Message')

describe('Messages Test', () => {
  /**
   * 最初に1回だけ走る処理
   */
  beforeAll(() => {
  })

  /**
   * 各テスト前に走る処理
   */
  beforeEach(() => {
    connection.beginTransaction()
  })

  /**
   * 各テスト後に走る処理
   */
  afterEach(async () => {
    await connection.rollback()
  })

  /**
   * 最後に1回だけ走る処理
   */
  afterAll(async () => {
    connection.end()
  })

  async function createTestRecord() {
    const date1 = format(new Date('2022/10/10 12:00:00'), 'yyyy-MM-dd HH:mm:ss')
    const date2 = format(new Date('2022/10/10 13:00:00'), 'yyyy-MM-dd HH:mm:ss')
    await connection.query(
      'insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)',
      [0, 'test', 0, date1]
    )
    await connection.query(
      'insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)',
      [2, 'test_1', 1, date2]
    )
    await connection.query(
      'insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)',
      [2, 'test_2', 2, date1]
    )
    await connection.query(
      'insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)',
      [3, 'test_3', 3, date1]
    )
    await connection.query(
      'insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)',
      [3, 'test_4', 4, date1]
    )
    await connection.query(
      'insert into message (roomId, message, userId, dateTime) values (?, ?, ?, ?)',
      [2, 'test_5', 2, date1]
    )
    await connection.query(
      'insert into message (roomId, message, userId, dateTime, deleteFlg) values (?, ?, ?, ?, ?)',
      [2, 'test_5', 2, date1, 1]
    )
  }

  /**
   * 条件:
   *   レコードなし
   *   セレクト
   * 観点:
   *   エラーが出ないこと
   */
  test('getMessages レコードなし', async () => {
    await createTestRecord()
    const messages = await Message.getMessages(1)
    expect(messages.length).toBe(0)
  })

  /**
   * 条件:
   *   レコードあり
   *   セレクト
   * 観点:
   *   エラーが出ないこと
   *   条件にマッチしたレコードを取得できること
   *   dateTime,messageIdの順にソートされていること
   *   deleteFlg=1のレコードが取得されないこと
   */
  test('getMessages レコードあり', async () => {
    await createTestRecord()
    const messages = await Message.getMessages(2)
    // レコード件数
    expect(messages.length).toBe(3)

    // 1件目の整合性チェック
    expect(messages[0]['message']).toBe('test_2')
    expect(messages[0]['roomId']).toBe('2')
    expect(messages[0]['userId']).toBe(2)
    expect(messages[0]['deleteFlg']).toBe(0)
    expect(format(new Date(messages[0]['dateTime']), 'yyyy-MM-dd HH:mm:ss')).toBe('2022-10-10 12:00:00')

    // 2件目の整合性チェック
    expect(messages[1]['message']).toBe('test_5')
    expect(messages[1]['roomId']).toBe('2')
    expect(messages[1]['userId']).toBe(2)
    expect(messages[1]['deleteFlg']).toBe(0)
    expect(format(new Date(messages[1]['dateTime']), 'yyyy-MM-dd HH:mm:ss')).toBe('2022-10-10 12:00:00')

    // 3件目の整合性チェック
    expect(messages[2]['message']).toBe('test_1')
    expect(messages[2]['roomId']).toBe('2')
    expect(messages[2]['userId']).toBe(1)
    expect(messages[2]['deleteFlg']).toBe(0)
    expect(format(new Date(messages[2]['dateTime']), 'yyyy-MM-dd HH:mm:ss')).toBe('2022-10-10 13:00:00')
  })

  /**
   * 条件:
   *   インサート
   * 観点:
   *   エラーが出ないこと
   *   レコードを追加できていること
   *   追加したレコードが返ってきていること
   */
  test('insertMessage', async () => {
    const message = await Message.insertMessage('insert message', 3, 10)
    expect(message['message']).toBe('insert message')
    expect(message['roomId']).toBe('3')
    expect(message['userId']).toBe(10)
    expect(message['deleteFlg']).toBe(0)

    const messages = await Message.getMessages(3)
    expect(messages.length).toBe(1)
    expect(message).toEqual(messages[0])
  })
})
