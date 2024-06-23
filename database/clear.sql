ALTER TABLE "interval" DROP CONSTRAINT IF EXISTS "interval_fk3";
ALTER TABLE "generator" DROP CONSTRAINT IF EXISTS "generator_fk5";
ALTER TABLE "device" DROP CONSTRAINT IF EXISTS "device_fk3";
ALTER TABLE "house" DROP CONSTRAINT IF EXISTS "house_fk6";
ALTER TABLE "room" DROP CONSTRAINT IF EXISTS "room_fk2";


DROP TABLE IF EXISTS "interval" CASCADE;
DROP TABLE IF EXISTS "generator" CASCADE;
DROP TABLE IF EXISTS "device" CASCADE;
DROP TABLE IF EXISTS "room" CASCADE;
DROP TABLE IF EXISTS "house" CASCADE;
DROP TABLE IF EXISTS "owner" CASCADE;