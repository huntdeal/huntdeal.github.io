-- ============================================================
-- ADD PRODUCT CATEGORY FIELDS
-- ============================================================

alter table public.products
add column amazon_category text;
alter table public.products
add column huntdeal_category text;
