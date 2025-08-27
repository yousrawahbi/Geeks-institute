const pool = require('../config/database');

class Country {
  // Create countries table
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        capital VARCHAR(255),
        flag TEXT,
        subregion VARCHAR(255),
        population BIGINT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    try {
      await pool.query(query);
      console.log('Countries table created or already exists');
    } catch (error) {
      console.error('Error creating countries table:', error);
      throw error;
    }
  }

  // Insert a country
  static async create(countryData) {
    const { name, capital, flag, subregion, population } = countryData;
    const query = `
      INSERT INTO countries (name, capital, flag, subregion, population)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    
    try {
      const result = await pool.query(query, [name, capital, flag, subregion, population]);
      return result.rows[0];
    } catch (error) {
      console.error('Error inserting country:', error);
      throw error;
    }
  }

  // Get all countries
  static async findAll() {
    const query = 'SELECT * FROM countries ORDER BY id;';
    
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }

  // Count all countries
  static async count() {
    const query = 'SELECT COUNT(*) FROM countries;';
    
    try {
      const result = await pool.query(query);
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error('Error counting countries:', error);
      throw error;
    }
  }

  // Clear all countries
  static async clearAll() {
    const query = 'TRUNCATE TABLE countries RESTART IDENTITY;';
    
    try {
      await pool.query(query);
      console.log('Countries table cleared');
    } catch (error) {
      console.error('Error clearing countries table:', error);
      throw error;
    }
  }
}

module.exports = Country;