const webshot = require('webshot')

module.exports = function (html, sequenceKey, cb) {
  try {
    const renderStream = webshot(html, {siteType: 'html'})
    cb(null, {stream: renderStream, sequenceKey: sequenceKey})
  } catch (e) {
    cb({message: e})
  }
}
