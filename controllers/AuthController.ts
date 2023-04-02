import express from "express"
import { UserRecord } from "~/types/types"
const User = require('../model/User')

module.exports = {
  auth: (req: express.Request, res: express.Response) => {
    const authId = req.body.authId ?? ''
    const name = req.body.name ?? ''
    const picture = req.body.picture ?? ''
    // authIdは必須
    if (! authId) {
      res.send(false)
    }
    // authIdで登録済みかチェック
    User.getUserByAuthId(authId)
      .then((user: UserRecord) => {
        if (user) {
          // 名前とプロフィール画像を更新する
          User.update(
            user,
            name,
            picture
          )
            .then(() => {
              res.send(true)
            })
            .catch(() => {
              res.send(false)
            })
        } else {
          // 新規登録
          User.insert(
            name,
            authId,
            picture
          )
            .then(() => {
              res.send(true)
            })
            .catch(() => {
              res.send(false)
            })
        }
      })
  }
}
