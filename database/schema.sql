CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  condition TEXT,
  doctor_id INTEGER REFERENCES users(id),
  icu_id INTEGER REFERENCES icus(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

//-- You can extend this with users, doctors, ICUs, comments tables.