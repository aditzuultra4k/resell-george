# Resell George

Site complet de resell pentru haine si adidasi, construit cu Next.js, TypeScript, Tailwind CSS si Supabase.

## Ce include

- Site public responsive: Home, produse, pagina produs, About, Contact
- Filtre dupa categorie, brand, marime, pret si disponibilitate
- SEO individual pentru produse cu Open Graph image
- Formular de cerere fara plata online
- Admin protejat pe `/admin`
- CRUD produse, imagini, status, pret, descriere, autenticitate
- Marimi multiple cu stoc separat pe fiecare marime
- Panou Comenzi/Cereri cu status: noua, contactat, rezervat, vandut, anulata
- Supabase schema, RLS policies si storage bucket pentru imagini

## Pornire local

```bash
npm install
npm run dev
```

Deschide `http://localhost:3000`.

Fara `.env.local`, proiectul porneste in demo local cu produse de test. Pentru date reale, configureaza Supabase.

## Configurare Supabase

1. Creeaza un proiect nou in Supabase.
2. Deschide SQL Editor si ruleaza `supabase/schema.sql`.
3. Optional, ruleaza `supabase/demo-seed.sql` pentru produse demo in baza de date.
4. Copiaza `.env.example` in `.env.local`.
5. Completeaza:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=40700000000
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourstore
```

## Creare cont admin

1. In Supabase Dashboard, mergi la Authentication -> Users.
2. Creeaza un user cu email si parola.
3. Copiaza `user_id`.
4. Ruleaza in SQL Editor:

```sql
insert into public.admin_profiles (user_id, email)
values ('USER_ID_AICI', 'emailul-tau@example.com');
```

Doar userii existenti in `admin_profiles` pot accesa `/admin`.

## Deploy pe Vercel

1. Urca proiectul pe GitHub.
2. In Vercel, alege `New Project` si importa repository-ul.
3. Adauga variabilele din `.env.local` in Vercel Project Settings -> Environment Variables.
4. Deploy.
5. Dupa deploy, seteaza `NEXT_PUBLIC_SITE_URL` la URL-ul final Vercel.

## Fisiere importante

- `app/` - pagini publice, produse, admin si server actions
- `components/` - navbar, footer, card produs, filtre, formulare admin/client
- `lib/` - tipuri, query-uri, helpers Supabase, date demo fallback
- `supabase/schema.sql` - schema bazei de date, RLS si storage
- `supabase/demo-seed.sql` - produse demo pentru testare
