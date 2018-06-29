const test = require('tape')
const DB = require('../modules/db')

test('inserting sessions and steps', async function (t) {
  t.plan(2)

  const db = new DB()
  db.clear()
  const sessionId = await db.insertSession('test session')
  const stepId = await db.insertStep(sessionId, 1, 'test.com', 'test.png')
  const rows = await db.getStepsBySession(sessionId)
  db.pool.end()
  t.equal(rows.length, 1)
  t.equal(rows[0].sessionid, sessionId)
})

test('leaderboard', async function (t) {
  t.plan(1)

  const db = new DB()
  await db.clear()

  const sessionOneId = await db.insertSession('session one')
  const sessionTwoId = await db.insertSession('session two')
  const sessionThreeId = await db.insertSession('session three')

  await db.insertStep(sessionOneId, 1, 'test.com', 'test.png')
  await db.insertStep(sessionOneId, 2, 'test.com', 'test.png')
  await db.insertStep(sessionOneId, 3, 'test.com', 'test.png')
  await db.insertStep(sessionOneId, 4, 'test.com', 'test.png')
  await db.insertStep(sessionTwoId, 1, 'test.com', 'test.png')
  await db.insertStep(sessionTwoId, 2, 'test.com', 'test.png')
  await db.insertStep(sessionThreeId, 1, 'test.com', 'test.png')
  await db.insertStep(sessionThreeId, 2, 'test.com', 'test.png')
  await db.insertStep(sessionThreeId, 3, 'test.com', 'test.png')
  await db.insertStep(sessionThreeId, 4, 'test.com', 'test.png')
  await db.insertStep(sessionThreeId, 5, 'test.com', 'test.png')
  await db.insertStep(sessionThreeId, 6, 'test.com', 'test.png')

  const rows = await db.getLeaderBoard()

  await db.pool.end()

  t.deepEqual(rows.map(row => row.sessionid), [sessionThreeId, sessionOneId, sessionTwoId])
})
