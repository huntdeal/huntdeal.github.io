-- ============================================================
-- HuntDeal Initial Database Schema
-- Migration: 20261005124920_initial_schema
-- ============================================================


-- ============================================================
-- 1. CATEGORIES
-- ============================================================

create table if not exists public.categories (
    id bigint generated always as identity primary key,

    name text not null,
    slug text not null unique,

    parent_id bigint references public.categories(id)
        on delete set null,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================================
-- 2. PRODUCTS
-- One row per Amazon ASIN
-- ============================================================

create table if not exists public.products (
    id bigint generated always as identity primary key,

    asin text not null unique,

    title text not null,

    brand text,

    product_url text,

    affiliate_url text,

    image_url text,

    category_id bigint references public.categories(id)
        on delete set null,

    product_type text,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================================
-- 3. PRODUCT DEALS
-- Current / latest deal information
-- ============================================================

create table if not exists public.product_deals (
    id bigint generated always as identity primary key,

    product_id bigint not null references public.products(id)
        on delete cascade,

    source text not null default 'amazon',

    deal_price numeric(12,2),

    mrp numeric(12,2),

    discount_percent numeric(5,2),

    discount_text text,

    coupon_price numeric(12,2),

    coupon_message text,

    deal_status text,

    deal_type text,

    deal_id text,

    affiliate_url text,

    is_active boolean not null default true,

    starts_at timestamptz,

    ends_at timestamptz,

    raw_data jsonb,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================================
-- 4. PRICE HISTORY
-- Historical price snapshots
-- ============================================================

create table if not exists public.price_history (
    id bigint generated always as identity primary key,

    product_id bigint not null references public.products(id)
        on delete cascade,

    price numeric(12,2),

    mrp numeric(12,2),

    discount_percent numeric(5,2),

    source text not null default 'amazon',

    recorded_at timestamptz not null default now()
);


-- ============================================================
-- 5. INDEXES
-- ============================================================

create index if not exists idx_products_asin
    on public.products(asin);

create index if not exists idx_products_category
    on public.products(category_id);

create index if not exists idx_products_active
    on public.products(is_active);

create index if not exists idx_product_deals_product
    on public.product_deals(product_id);

create index if not exists idx_product_deals_active
    on public.product_deals(is_active);

create index if not exists idx_product_deals_source
    on public.product_deals(source);

create index if not exists idx_price_history_product
    on public.price_history(product_id);

create index if not exists idx_price_history_recorded
    on public.price_history(recorded_at);


-- ============================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================

alter table public.categories enable row level security;

alter table public.products enable row level security;

alter table public.product_deals enable row level security;

alter table public.price_history enable row level security;


-- ============================================================
-- 7. PUBLIC READ POLICIES
--
-- Website can read public deal information.
-- Writes remain server-side.
-- ============================================================

create policy "Public can read categories"
on public.categories
for select
to anon, authenticated
using (true);


create policy "Public can read active products"
on public.products
for select
to anon, authenticated
using (is_active = true);


create policy "Public can read active deals"
on public.product_deals
for select
to anon, authenticated
using (is_active = true);


create policy "Public can read price history"
on public.price_history
for select
to anon, authenticated
using (true);