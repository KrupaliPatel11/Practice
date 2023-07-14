module.exports = ({ env }) => ({
  defaultConnection: "default",
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5433),
      database: env("DATABASE_NAME", "krupali"),
      user: env("DATABASE_USER", "postgres"),
      password: env("DATABASE_PASSWORD", "ztlab131"),
      schema: env("DATABASE_SCHEMA", "public"),
    },
  }
});