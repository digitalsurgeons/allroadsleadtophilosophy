const { Pool } = require('pg')
require('dotenv').config()

module.exports = class DB {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    })
  }

  async query(query, args = [], scalar = false) {
    const result = await this.pool.query(query, args).catch(e => { throw e })
    return scalar ? result.rows[0] : result.rows
  }

  async clear() {
    await this.query('DELETE FROM steps;')
    await this.query('DELETE FROM sessions;')
  }

  async getLeaderBoard() {
    const result = await this.query(`
      SELECT
        sessionId,
        COUNT(*) AS stepCount
      FROM steps
      INNER JOIN sessions ON sessions.id = steps.sessionId
      GROUP BY sessionId
      ORDER BY stepCount DESC
      LIMIT 10
    `)
    return result
  }

  async getStepsBySession(sessionId) {
    const result = await this.query(
      `
        SELECT * FROM steps
        WHERE sessionID = $1
        ORDER BY sequenceKey ASC
      `,
      [sessionId]
    )
    return result
  }

  async insertSession(origin) {
    const result = await this.query(
      `
        INSERT INTO sessions (origin)
        VALUES ($1)
        RETURNING id
      `,
      [origin],
      true
    )

    return result.id
  }

  async insertStep(sessionId, sequenceKey, url, path) {
    let result = await this.query(
      `
        INSERT INTO steps (sessionId, sequenceKey, url, screenshotPath)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `,
      [sessionId, sequenceKey, url, path],
      true
    )

    return result.id
  }
}
