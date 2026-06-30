const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

const app = express()

//  ミドルウェア
app.use(express.json())
app.use(cors())

// DB接続
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('DB接続エラー:', err.message)
  } else {
    console.log('DB接続成功')
  }
})

// テーブル作成
db.run(`
  
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT,
    user_email TEXT UNIQUE,
    user_password TEXT,
    user_gender TEXT,
    user_birthdate TEXT,
    user_created_at TEXT

  )
`)


// 動作確認
app.get('/', (req, res) => {
  res.send('サーバー起動OK')
})

/* =========================
   登録API
========================= */
app.post('/register', (req, res) => {
  const { name, email, password, gender, birthdate } = req.body

  //  未入力チェック
  if (!name || !email || !password) {
    return res.status(400).json({ error: '入力不足' })
  }

  const now = new Date().toISOString()

  db.run(
    `INSERT INTO users (
      user_name,
      user_email,
      user_password,
      user_gender,
      user_birthdate,
      user_created_at
    )
    VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, password, gender, birthdate, now], 

    function (err) {
      if (err) {
        // メール重複チェック
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'メールアドレスは既に登録されています' })
        }

        return res.status(500).json({ error: err.message })
      }

      res.json({
        message: '登録成功',
        userId: this.lastID
      })

    }

  )

})


/*    ログインAPI */
app.post('/login', (req, res) => {
  const { email, password } = req.body

  // 未入力チェック
  if (!email || !password) {
    return res.status(400).json({ error: '入力不足' })
  }

  db.get(
    `SELECT * FROM users WHERE user_email = ?`,
    [email],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (!user) {
        return res.json({ success: false, message: 'ユーザーが存在しません' })
      }

      // パスワードチェック
      if (user.user_password === password) {
        res.json({
          success: true,
          
          user: {
          id: user.user_id,
          name: user.user_name,
          email: user.user_email,
          gender: user.user_gender,
          birthdate: user.user_birthdate,
          created_at: user.user_created_at
          }

        })
      } else {
        res.json({ success: false, message: 'パスワード不一致' })
      }
    }
  )
})

/*    サーバー起動 */
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
