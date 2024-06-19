CREATE TABLE IF NOT EXISTS "house" (
	"house_id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"address" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"daytime_tariff" double precision NOT NULL,
	"night_tariff" double precision NOT NULL,
	"owner_id" bigint NOT NULL,
	PRIMARY KEY ("house_id")
);

CREATE TABLE IF NOT EXISTS "device" (
	"device_id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"name" text NOT NULL,
	"power_consumption_per_hour" double precision NOT NULL,
	"room_id" bigint NOT NULL,
	PRIMARY KEY ("device_id")
);

CREATE TABLE IF NOT EXISTS "generator" (
	"generator_id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"name" text NOT NULL,
	"panel_surface" double precision NOT NULL,
	"effectiveness" double precision NOT NULL,
	"battery_capacity" double precision NOT NULL,
	"house_id" bigint NOT NULL,
	PRIMARY KEY ("generator_id")
);

CREATE TABLE IF NOT EXISTS "interval" (
	"interval_id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"time_start" time without time zone NOT NULL,
	"time_end" time without time zone NOT NULL,
	"device_id" bigint NOT NULL,
	PRIMARY KEY ("interval_id")
);

CREATE TABLE IF NOT EXISTS "room" (
	"room_id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"name" text NOT NULL,
	"house_id" bigint NOT NULL,
	PRIMARY KEY ("room_id")
);

CREATE TABLE IF NOT EXISTS "owner" (
	"owner_id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"surname" text NOT NULL,
	"password" text NOT NULL,
	PRIMARY KEY ("owner_id")
);

ALTER TABLE "house" ADD CONSTRAINT "house_fk6" FOREIGN KEY ("owner_id") REFERENCES "owner"("owner_id");
ALTER TABLE "device" ADD CONSTRAINT "device_fk3" FOREIGN KEY ("room_id") REFERENCES "room"("room_id");
ALTER TABLE "generator" ADD CONSTRAINT "generator_fk5" FOREIGN KEY ("house_id") REFERENCES "house"("house_id");
ALTER TABLE "interval" ADD CONSTRAINT "interval_fk3" FOREIGN KEY ("device_id") REFERENCES "device"("device_id");
ALTER TABLE "room" ADD CONSTRAINT "room_fk2" FOREIGN KEY ("house_id") REFERENCES "house"("house_id");
