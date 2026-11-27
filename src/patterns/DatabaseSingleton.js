const mysql = require('mysql2/promise');

class DatabaseSingleton {
  static instance = null;

  constructor() {
    if (DatabaseSingleton.instance) {
      return DatabaseSingleton.instance;
    }

    this.connectionConfig = {
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME || 'techos_db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };

    this.pool = mysql.createPool(this.connectionConfig);
    DatabaseSingleton.instance = this;
  }

  getConfig() {
    return this.connectionConfig;
  }

  getPool() {
    return this.pool;
  }
}

module.exports = DatabaseSingleton;