class SupabaseConfig {
  // Proyecto Supabase correcto usado por el core-api / app-clientes.
  static const url = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://cefsywrvzvpozkfpzrao.supabase.co',
  );

  // Pega la anon/public key del proyecto desde Supabase > Project Settings > API,
  // o pásala al ejecutar con --dart-define=SUPABASE_ANON_KEY=...
  // Se deja vacía para evitar conectar por error al proyecto anterior.
  static const anonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'sb_publishable_NEFNA6pzgImdYZbstRtFDA_zcvmNf58',
  );

  static bool get isConfigured =>
      url.isNotEmpty &&
      anonKey.isNotEmpty &&
      anonKey.startsWith('sb_publishable_');
}
