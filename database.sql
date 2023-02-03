CREATE DATABASE job_database;

CREATE TABLE jobs(
    job_id SERIAL PRIMARY KEY,
    company_name VARCHAR (25),
    role VARCHAR (25),
    location VARCHAR (25)
);