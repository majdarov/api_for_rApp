BEGIN TRANSACTION;
CREATE TABLE products_new (
    "id" TEXT UNIQUE,
    "name" TEXT NOT NULL,
    "code" INTEGER,
    "measure_name" TEXT,
    "tax" TEXT NOT NULL DEFAULT "NO_VAT",
    "allow_to_sell" BOOLEAN DEFAULT true,
    "description" TEXT,
    "article_number" TEXT,
    "parent_id" TEXT DEFAULT NULL,
    "type" TEXT DEFAULT "NORMAL",
    "price" DECIMAL (10, 2),
    "cost_price" DECIMAL (10, 2),
    "quantity" DECIMAL (10, 3),
    "barcodes" TEXT,
    "photo" TEXT,
    PRIMARY KEY ("id"),
	CHECK(price >= 0)
	);
INSERT INTO products_new SELECT * FROM products;
COMMIT;