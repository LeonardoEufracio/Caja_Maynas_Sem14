# Correcciones aplicadas - Caja Maynas Semana 14

## 1. Supabase correcto

Se dejó como proyecto Supabase correcto:

```text
https://cefsywrvzvpozkfpzrao.supabase.co
```

El `core-api/.env.example` ya apunta al host PostgreSQL de ese proyecto:

```text
db.cefsywrvzvpozkfpzrao.supabase.co
```

Por seguridad, la contraseña real no queda escrita en el ZIP. Debes copiar `core-api/.env.example` como `core-api/.env` y reemplazar `TU_PASSWORD` por tu contraseña real de Supabase.

## 2. App Clientes

Se alineó el login demo con el seed actual:

```text
DNI: 12345678
Clave: 1234
```

También queda permitida contraseña de 4 caracteres en el formulario.

Para celular físico, ejecutar usando la IP de la laptop:

```powershell
cd app-clientes
flutter run --dart-define=CORE_BASE_URL=http://TU_IP:8003
```

Ejemplo:

```powershell
flutter run --dart-define=CORE_BASE_URL=http://192.168.1.20:8003
```

## 3. Core API

Crear `.env`:

```powershell
cd core-api
copy .env.example .env
notepad .env
```

Luego iniciar:

```powershell
.\.venv\Scripts\Activate.ps1
python -m uvicorn main:app --host 0.0.0.0 --port 8003 --reload
```

Seeds:

```powershell
python -m scripts.seed_bd_core_mobile
python -m scripts.seed_cliente_demo
```

Credenciales core:

```text
Asesor web/core: 0001 / 1234
Cliente app: 12345678 / 1234
```

## 4. App Fuerza de Ventas

Se eliminó el Supabase anterior `lvmnykemxmthlxutbpfx` y se dejó el proyecto correcto `cefsywrvzvpozkfpzrao`.

Falta que pegues la `anon/public key` correcta del mismo proyecto en:

```text
app-fuerza-ventas/lib/supabase_config.dart
```

O ejecutes pasando la key:

```powershell
cd app-fuerza-ventas
flutter run ^
  --dart-define=SUPABASE_URL=https://cefsywrvzvpozkfpzrao.supabase.co ^
  --dart-define=SUPABASE_ANON_KEY=TU_ANON_KEY ^
  --dart-define=CORE_BASE_URL=http://TU_IP:8003
```

La app fuerza de ventas usa el usuario Supabase del SQL `04_usuario_prueba_alumno1.sql`:

```text
Usuario: alumno1@example.com
Clave: 12345
```

## 5. Java/Gradle

Se agregó en ambas apps Android:

```properties
org.gradle.java.home=D:/Android Studio/Android/jbr
```

Esto evita que Gradle use Java 25 y provoque el error:

```text
java.lang.IllegalArgumentException: 25
```

Si en otra PC Android Studio está en otra ruta, cambiar esa línea en:

```text
app-clientes/android/gradle.properties
app-fuerza-ventas/android/gradle.properties
```
