export const createIssuesTable = `
        CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,

        reporter_id INT NOT NULL,

        title VARCHAR(150) NOT NULL,

        description TEXT NOT NULL
        CHECK (char_length(description) >= 20),

        type VARCHAR(20) NOT NULL
        CHECK (type IN('bug', 'feature_request')),

        status VARCHAR(100) DEFAULT 'open'
        CHECK (status IN('open', 'in_progress', 'resolved')),

        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        `;
