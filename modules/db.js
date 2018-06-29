require('dotenv').config()
const { Client } = require('pg')

module.exports = {
  getLeaderBoard: getLeaderBoard,
  getStepsBySession: getStepsBySession,
  insertStep: insertStep
}

function getClient() {
  const client = new Client({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })
  client.connect()

  return client
}

async function getLeaderBoard() {
  const client = getClient()
  let res = await client.query(`
    SELECT
      sessionId,
      COUNT(*) AS stepCount
    FROM steps
    INNER JOIN sessions ON sessions.id = steps.sessionId
    GROUP BY sessionId
    ORDER BY stepCount DESC
    LIMIT 10
  `)
  await client.end()
  return res.rows
}

async function getStepsBySession(sessionId) {
  const client = getClient()
  let res = await client.query(
    `
      SELECT * FROM steps
      WHERE sessionID = $1
      ORDER BY sequenceKey ASC
    `,
    [sessionId]
  )
  await client.end()
  return res.rows
}

async function insertStep(sessionId, sequenceKey, url) {
  const client = getClient()
  let res = await client.query(
    `
      INSERT INTO STEPS (sessionId, sequenceKey, url)
      VALUES ($1, $2, $3)
    `,
    [sessionId, sequenceKey, url]
  )
  await client.end()
  return res.rows
}
