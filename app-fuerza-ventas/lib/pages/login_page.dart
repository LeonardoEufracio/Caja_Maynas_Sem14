import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController(text: 'alumno1@example.com');
  final passwordController = TextEditingController(text: '12345');
  final formKey = GlobalKey<FormState>();

  bool loading = false;
  bool hidePassword = true;
  int failedAttempts = 0;
  DateTime? lockedUntil;

  Future<void> signIn() async {
    final locked = lockedUntil;
    if (locked != null && DateTime.now().isBefore(locked)) {
      showMessage('Acceso bloqueado hasta ${_timeText(locked)}');
      return;
    }
    if (!formKey.currentState!.validate()) return;

    setState(() => loading = true);

    try {
      await Supabase.instance.client.auth.signInWithPassword(
        email: _loginToEmail(emailController.text.trim()),
        password: passwordController.text.trim(),
      );
      failedAttempts = 0;
    } on AuthException catch (error) {
      registerFailedAttempt();
      showMessage(error.message);
    } catch (_) {
      registerFailedAttempt();
      showMessage('No se pudo iniciar sesion. Revisa tu conexion o Supabase.');
    } finally {
      if (mounted) {
        setState(() => loading = false);
      }
    }
  }

  void showMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.redAccent),
    );
  }

  void registerFailedAttempt() {
    failedAttempts += 1;
    if (failedAttempts >= 5) {
      lockedUntil = DateTime.now().add(const Duration(minutes: 30));
    }
  }

  String _loginToEmail(String value) {
    if (value.contains('@')) return value;
    return 'asesor$value@cajamaynas.local';
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const green = Color(0xFFE30613);

    return Scaffold(
      backgroundColor: const Color(0xFFE8F5E9),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 440),
              child: Card(
                elevation: 8,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Form(
                    key: formKey,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const _MaynasLogo(),
                        const SizedBox(height: 8),
                        const Text(
                          'App Fuerza de Ventas',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 15, color: Colors.black54),
                        ),
                        const SizedBox(height: 28),
                        TextFormField(
                          controller: emailController,
                          keyboardType: TextInputType.emailAddress,
                          decoration: InputDecoration(
                            labelText: 'Codigo de empleado o correo',
                            prefixIcon: const Icon(Icons.badge_outlined),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          validator: (value) {
                            final email = value?.trim() ?? '';
                            if (email.isEmpty) return 'Ingrese su codigo';
                            if (!email.contains('@') &&
                                int.tryParse(email) == null) {
                              return 'Ingrese codigo numerico o correo valido';
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: passwordController,
                          obscureText: hidePassword,
                          decoration: InputDecoration(
                            labelText: 'Contrasena',
                            prefixIcon: const Icon(Icons.lock_outline),
                            suffixIcon: IconButton(
                              onPressed: () {
                                setState(() => hidePassword = !hidePassword);
                              },
                              icon: Icon(
                                hidePassword
                                    ? Icons.visibility_off
                                    : Icons.visibility,
                              ),
                            ),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          validator: (value) {
                            final password = value ?? '';
                            if (password.isEmpty) {
                              return 'Ingrese su contrasena';
                            }
                            if (password.length < 5) {
                              return 'La contrasena debe tener minimo 5 caracteres';
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 24),
                        SizedBox(
                          width: double.infinity,
                          height: 54,
                          child: FilledButton(
                            onPressed: loading ? null : signIn,
                            style: FilledButton.styleFrom(
                              backgroundColor: green,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                            ),
                            child: AnimatedSwitcher(
                              duration: const Duration(milliseconds: 220),
                              child: loading
                                  ? const _LoadingButtonContent()
                                  : const Text(
                                      key: ValueKey('loginText'),
                                      'Ingresar como asesor',
                                      style: TextStyle(
                                        fontSize: 17,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                            ),
                          ),
                        ),
                        if (failedAttempts > 0) ...[
                          const SizedBox(height: 12),
                          Text(
                            failedAttempts >= 5
                                ? 'Cuenta bloqueada temporalmente'
                                : 'Intentos fallidos: $failedAttempts/5',
                            style: const TextStyle(color: Colors.redAccent),
                          ),
                        ],
                        const SizedBox(height: 10),
                        TextButton.icon(
                          onPressed: () => showMessage(
                            'Contacta al administrador de agencia para restablecer acceso.',
                          ),
                          icon: const Icon(Icons.help_outline),
                          label: const Text('Problemas para ingresar'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _MaynasLogo extends StatelessWidget {
  const _MaynasLogo();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 112,
      child: Center(
        child: Container(
          width: 270,
          height: 96,
          padding: const EdgeInsets.symmetric(horizontal: 18),
          decoration: BoxDecoration(
            color: const Color(0xFFE30613),
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(26),
              bottomRight: Radius.circular(26),
              topRight: Radius.circular(6),
              bottomLeft: Radius.circular(6),
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFB8000A).withOpacity(0.22),
                blurRadius: 18,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(width: 64, height: 64, child: CustomPaint(painter: _MaynasMarkPainter())),
              SizedBox(width: 12),
              Text(
                'CAJA\nMAYNAS',
                style: TextStyle(
                  height: 0.92,
                  fontSize: 30,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.7,
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _MaynasMarkPainter extends CustomPainter {
  const _MaynasMarkPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final whitePaint = Paint()..color = Colors.white;
    final cutPaint = Paint()..color = const Color(0xFFE30613);

    final w = size.width;
    final h = size.height;
    canvas.drawCircle(Offset(w * 0.50, h * 0.17), h * 0.105, whitePaint);
    final body = RRect.fromRectAndRadius(
      Rect.fromLTWH(w * 0.12, h * 0.34, w * 0.76, h * 0.42),
      Radius.circular(h * 0.08),
    );
    canvas.drawRRect(body, whitePaint);
    final inner = RRect.fromRectAndRadius(
      Rect.fromLTWH(w * 0.31, h * 0.48, w * 0.38, h * 0.16),
      Radius.circular(h * 0.025),
    );
    canvas.drawRRect(inner, cutPaint);
    canvas.drawRect(Rect.fromLTWH(w * 0.10, h * 0.82, w * 0.80, h * 0.045), whitePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _LoadingButtonContent extends StatelessWidget {
  const _LoadingButtonContent();

  @override
  Widget build(BuildContext context) {
    return const Row(
      key: ValueKey('loadingText'),
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: 20,
          height: 20,
          child: CircularProgressIndicator(
            color: Colors.white,
            strokeWidth: 2.4,
          ),
        ),
        SizedBox(width: 12),
        Text(
          'Cargando...',
          style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }
}

String _timeText(DateTime value) {
  return '${value.hour.toString().padLeft(2, '0')}:${value.minute.toString().padLeft(2, '0')}';
}
