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
      password: process.env.DB_PASS || ''
    };

    DatabaseSingleton.instance = this;
  }

  getConfig() {
    return this.connectionConfig;
  }
}

module.exports = DatabaseSingleton;