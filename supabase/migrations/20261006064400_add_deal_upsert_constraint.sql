-- Prevent duplicate deal records for the same
-- product + source.

alter table public.product_deals
add constraint product_deals_product_source_unique
unique (product_id, source);