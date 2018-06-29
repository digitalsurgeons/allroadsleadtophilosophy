CREATE TABLE IF NOT EXISTS sessions (id SERIAL PRIMARY KEY, origin TEXT);
CREATE TABLE IF NOT EXISTS steps (id SERIAL PRIMARY KEY, sessionId INT REFERENCES sessions (id), sequenceKey INT, url TEXT, screenshotPath TEXT);
