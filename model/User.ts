import mysql from 'mysql'
const connection = require('../model/DbConnection')
import { UserRecord } from '~/types/types' 

module.exports = {
  /**
   * 認証先IDで取得
   * @returns UserRecord
   */
  getUserByAuthId: (authId: String) => {
    return new Promise ((resolve, reject) => {
      connection.query(
        'select * from user where authId = ? and deleteFlg = ? order by userId desc limit 1',
        [authId, 0],
        (error: mysql.MysqlError|null, items: Array<UserRecord>) => {
          if (error) {
            reject(error)
          }
          resolve(items[0])
        }
      )
    })
  },

  /**
   * 更新
   */
  update: (user: UserRecord, name: string = '', picture: string = '') => {
    // 名前、プロフィール画像どちらも更新前と変わらないなら更新しない
    if (user.name === name && user.name === picture) {
      return
    }

    if (name !== '') {
      user.name = name
    }
    if (picture !== '') {
      user.picture = picture
    }

    return new Promise ((resolve, reject) => {
      connection.query(
        'update user set name = ?, picture = ? where userId = ?',
        [user.name, user.picture, user.userId],
        (error: mysql.MysqlError|null, result: mysql.OkPacket) => {
          if (error) {
            reject(error)
          }
          resolve(true)
        }
      )
    })
  },

  /**
   * 新規登録
   */
  insert: (name: string = '', authId: string = '', picture: string = '') => {
    return new Promise ((resolve, reject) => {
      connection.query(
        'insert into user (name, authId, picture) values (?, ?, ?)',
        [name, authId, picture],
        (error: mysql.MysqlError|null, result: mysql.OkPacket) => {
          if (error) {
            reject(error)
          }
          resolve(true)
        }
      )
    })
  }
}
