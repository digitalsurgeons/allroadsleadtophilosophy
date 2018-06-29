require('dotenv').config()
const { Client } = require('pg')

module.exports = {
  getLeaderBoard: getLeaderBoard,
  getStepsBySession: getStepsBySession,
  insertSession: insertSession,
  insertStep: insertStep,
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

async function insertSession(id, origin) {
  const client = getClient()
  let res = await client.query(
    `
      INSERT INTO sessions (id, origin)
      VALUES ($1, $2)
    `,
    [id, origin]
  )
  await client.end()
  return res.rows
}

async function insertStep(sessionId, sequenceKey, url, path) {
  const client = getClient()
  let res = await client.query(
    `
      INSERT INTO steps (sessionId, sequenceKey, url, screenshotPath)
      VALUES ($1, $2, $3, $4)
    `,
    [sessionId, sequenceKey, url, path]
  )
  await client.end()
  return res.rows
}

insertStep(1, 1, "test.com", "image.png")
