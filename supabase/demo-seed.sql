insert into public.products (name, slug, brand, category, price, description, condition, status, authenticity_notes, seo_title, seo_description)
values
('Nike Dunk Low Panda', 'nike-dunk-low-panda', 'Nike', 'adidasi', 649, 'Pereche verificata, silueta iconica alb-negru, potrivita pentru daily wear.', 'foarte_buna', 'disponibil', 'Cutie originala si poze detaliate la cerere.', 'Nike Dunk Low Panda - Resell verificat', 'Nike Dunk Low Panda disponibil in stoc pe marimi, cu autenticitate verificata.'),
('Supreme Box Logo Hoodie', 'supreme-box-logo-hoodie', 'Supreme', 'hanorace', 1299, 'Hoodie premium cu fit relaxat si print curat, piesa statement pentru colectie.', 'purtat', 'disponibil', 'Proof of purchase disponibil.', 'Supreme Box Logo Hoodie - Streetwear resell', 'Supreme Box Logo Hoodie cu proof of authenticity si livrare rapida.')
on conflict (slug) do nothing;

insert into public.product_sizes (product_id, size, stock, sort_order)
select p.id, s.size, s.stock, s.sort_order from public.products p
cross join (values ('40', 1, 1), ('41', 2, 2), ('42', 0, 3)) as s(size, stock, sort_order)
where p.slug = 'nike-dunk-low-panda'
on conflict (product_id, size) do nothing;

insert into public.product_sizes (product_id, size, stock, sort_order)
select p.id, s.size, s.stock, s.sort_order from public.products p
cross join (values ('M', 1, 1), ('L', 1, 2), ('XL', 0, 3)) as s(size, stock, sort_order)
where p.slug = 'supreme-box-logo-hoodie'
on conflict (product_id, size) do nothing;

insert into public.product_images (product_id, url, alt, sort_order)
select id, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop', name, 0 from public.products where slug = 'nike-dunk-low-panda';
insert into public.product_images (product_id, url, alt, sort_order)
select id, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1600&auto=format&fit=crop', name, 0 from public.products where slug = 'supreme-box-logo-hoodie';
