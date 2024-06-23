# EcoHouse+

Postgres database for EcoHouse+ project.

## Configuration 

1. Download Postgres database.
2. Set `PostgreSQL\16\bin` directory to environmental variables `PATH`.
3. Create database by console:

```bash
psql -U postgres -d eco-dom -f "tables.sql"

or:

psql -U postgres -W
\c eco-dom
\i clear.sql
\i tables.sql
```