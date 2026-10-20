/* ═══════════════════════════════════════════════════════════════════
   LA MAISON BLEUE — CONFIGURATION
   Le seul fichier à remplir pour que le site fonctionne.
   ═══════════════════════════════════════════════════════════════════ */

/* 1 ─ SUPABASE  (base de données + connexion propriétaire)
   Où trouver ces deux valeurs :
   supabase.com → votre projet → Project Settings → API
     • Project URL        → SUPABASE_URL
     • anon / public key  → SUPABASE_ANON_KEY
   La clé « anon » est faite pour être publique : elle ne donne accès
   qu'à ce que les règles RLS autorisent (voir supabase/schema.sql).
   Ne mettez JAMAIS la clé « service_role » ici.                      */
window.CONFIG = {
  SUPABASE_URL: 'https://VOTRE-PROJET.supabase.co',
  SUPABASE_ANON_KEY: 'VOTRE_CLE_ANON',

  /* 2 ─ LE GÎTE */
  GITE: {
    nom: 'La Maison Bleue',
    accroche: 'Gîte 4 personnes à Saumur, vue sur la Loire',
    adresse: '4 rue du Tire Jarret, 49400 Saumur',
    hotes: 'Katia et Philippe',
    telephone: '06 08 64 55 64',
    email: 'katalice.bouillet@free.fr',
    capacite: 4,
    chambres: 2,
    arrivee: '16h',
    depart: '10h'
  },

  /* 3 ─ TARIFS  (affichés sur la vitrine) */
  TARIFS: {
    nuit: '00 €',
    semaine: '000 €',
    nuits_min: 2,
    menage: '50 € (forfait)',
    caution: '600 €',
    taxe_sejour: '1,00 € par personne et par nuit',
    linge: 'Draps et linge de toilette : 5 € par personne',
    note: 'Tarifs indicatifs — à ajuster selon la saison.'
  },

  /* 4 ─ PHOTOS
     Déposez vos images dans le dossier assets/photos/ du dépôt,
     puis remplacez les valeurs "src" ci-dessous.
     Laissez src vide ('') pour afficher un cadre gris en attendant. */
  PHOTOS: [
    {src:'', alt:'La maison vue de la rue',        legende:'La maison'},
    {src:'assets/photos/salon_gite.jpg', alt:'Le séjour', legende:'Le séjour, vue sur la Loire'},
    {src:'assets/photos/cusine_gite.jpg', alt:'La cuisine équipée',              legende:'La cuisine'},
    {src:'assets/photos/chambre_gite.jpg', alt:'La chambre avec lit double',      legende:'Chambre 1 — lit double'},
    {src:'assets/photos/chambre_parent_gite.jpg', alt:'La chambre avec lits superposés', legende:'Chambre 2 — lits superposés'},
    {src:'assets/photos/sdb_gite.jpg', alt:'La salle de bain', legende:'La salle de bain'}
  ]
};

/* ─────────── utilitaires partagés (ne pas modifier) ─────────── */
window.MB = {
  /* true tant que la config Supabase n'a pas été remplie */
  nonConfigure: function(){
    var c = window.CONFIG;
    return !c.SUPABASE_URL || c.SUPABASE_URL.indexOf('VOTRE-PROJET') > -1
        || !c.SUPABASE_ANON_KEY || c.SUPABASE_ANON_KEY.indexOf('VOTRE_CLE') > -1;
  },
  /* client Supabase, ou null si la config ou la librairie manquent */
  client: function(){
    if (this.nonConfigure() || !window.supabase || !window.supabase.createClient) return null;
    if (!this._c) this._c = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    return this._c;
  },
  /* 2026-07-14 → 14 juillet 2026 */
  dateFr: function(iso){
    if (!iso) return '';
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'});
  },
  dateCourte: function(iso){
    if (!iso) return '';
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'2-digit'});
  },
  /* AAAA-MM-JJ sans décalage de fuseau */
  iso: function(d){
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  },
  nuits: function(a, b){
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  },
  /* affiche un message dans une boîte .msg */
  dire: function(el, texte, type){
    if (!el) return;
    el.className = 'msg on msg-' + (type || 'info');
    el.textContent = texte;
  },
  taire: function(el){ if (el) el.className = 'msg'; }
};
