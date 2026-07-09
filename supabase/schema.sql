create extension if not exists "pgcrypto";

create type product_category as enum ('adidasi', 'hanorace', 'tricouri', 'geci', 'pantaloni', 'accesorii');
create type product_condition as enum ('nou', 'purtat', 'foarte_buna');
create type product_status as enum ('disponibil', 'sold_out');
create type request_status as enum ('noua', 'contactat', 'rezervat', 'vandut', 'anulata');

create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand text not null,
  category product_category not null,
  price numeric(10, 2) not null check (price >= 0),
  description text not null,
  condition product_condition not null default 'foarte_buna',
  status product_status not null default 'disponibil',
  authenticity_notes text,
  proof_url text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.product_sizes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text not null,
  stock integer not null default 0 check (stock >= 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (product_id, size)
);

create table public.order_requests (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  selected_size text not null,
  customer_name text not null,
  phone text not null,
  instagram text,
  message text,
  status request_status not null default 'noua',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger order_requests_updated_at before update on public.order_requests for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_profiles where user_id = auth.uid());
$$;

alter table public.admin_profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_sizes enable row level security;
alter table public.order_requests enable row level security;

create policy "admin profiles readable by admins" on public.admin_profiles for select to authenticated using (public.is_admin());
create policy "products readable by everyone" on public.products for select to anon, authenticated using (true);
create policy "products manageable by admins" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "images readable by everyone" on public.product_images for select to anon, authenticated using (true);
create policy "images manageable by admins" on public.product_images for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "sizes readable by everyone" on public.product_sizes for select to anon, authenticated using (true);
create policy "sizes manageable by admins" on public.product_sizes for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "anyone creates requests" on public.order_requests for insert to anon, authenticated with check (true);
create policy "admins read requests" on public.order_requests for select to authenticated using (public.is_admin());
create policy "admins update requests" on public.order_requests for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete requests" on public.order_requests for delete to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) on conflict (id) do nothing;
create policy "public reads product files" on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
create policy "admins upload product files" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());
create policy "admins update product files" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_admin()) with check (bucket_id = 'product-images' and public.is_admin());
create policy "admins delete product files" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());
