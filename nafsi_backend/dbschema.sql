CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) CHECK (role IN ('patient', 'doctor', 'admin')) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Appointments (
  id SERIAL PRIMARY KEY,
  patient_id INT REFERENCES Users(id),
  doctor_id INT REFERENCES Users(id),
  date TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  notes TEXT
);

CREATE TABLE MedicalRecords (
  id SERIAL PRIMARY KEY,
  patient_id INT REFERENCES Users(id) NOT NULL,
  doctor_id INT REFERENCES Users(id) NOT NULL,
  diagnosis TEXT,
  prescription TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE HealthResources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  language VARCHAR(20) DEFAULT 'English'
);
