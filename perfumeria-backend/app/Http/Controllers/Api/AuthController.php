<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Iniciar sesión.
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'correo' => ['required', 'email', 'max:190'],
            'password' => ['required', 'string', 'max:255'],
        ]);

        $correo = Str::lower(trim($validated['correo']));

        $usuario = DB::table('usuario')
            ->where('correo', $correo)
            ->whereNull('eliminado_en')
            ->first();

        if (
            !$usuario ||
            $usuario->estado !== 'ACTIVO' ||
            !Hash::check($validated['password'], $usuario->password_hash)
        ) {
            return response()->json([
                'message' => 'Credenciales incorrectas o cuenta no disponible.'
            ], 401);
        }

        // Generar token aleatorio y almacenar únicamente su hash.
        $token = bin2hex(random_bytes(32));
        $tokenHash = hash('sha256', $token);
        $expiraEn = now()->addHours(8);

        DB::transaction(function () use (
            $usuario,
            $request,
            $tokenHash,
            $expiraEn
        ) {
            DB::table('sesion_usuario')->insert([
                'id_usuario' => $usuario->id_usuario,
                'token_hash' => $tokenHash,
                'ip' => $request->ip(),
                'user_agent' => substr(
                    (string) $request->userAgent(),
                    0,
                    500
                ),
                'expira_en' => $expiraEn,
                'creada_en' => now(),
            ]);

            DB::table('usuario')
                ->where('id_usuario', $usuario->id_usuario)
                ->update([
                    'ultimo_acceso_en' => now(),
                    'intentos_fallidos' => 0,
                    'bloqueado_hasta' => null,
                ]);
        });

        return response()->json([
            'message' => 'Inicio de sesión exitoso.',
            'token_type' => 'Bearer',
            'access_token' => $token,
            'expires_at' => $expiraEn->toIso8601String(),
            'user' => [
                'id' => $usuario->id_usuario,
                'nombres' => $usuario->nombres,
                'apellidos' => $usuario->apellidos,
                'correo' => $usuario->correo,
            ],
        ]);
    }

    /**
     * Consultar el usuario autenticado.
     */
    public function me(Request $request): JsonResponse
    {
        $usuarioId = $request->attributes->get('auth_user_id');

        $usuario = DB::table('usuario')
            ->where('id_usuario', $usuarioId)
            ->first();

        $roles = DB::table('usuario_rol as ur')
            ->join('rol as r', 'r.id_rol', '=', 'ur.id_rol')
            ->where('ur.id_usuario', $usuarioId)
            ->where('r.activo', 1)
            ->pluck('r.codigo');

        $permisos = DB::table('usuario_rol as ur')
            ->join('rol as r', 'r.id_rol', '=', 'ur.id_rol')
            ->join('rol_permiso as rp', 'rp.id_rol', '=', 'r.id_rol')
            ->join('permiso as p', 'p.id_permiso', '=', 'rp.id_permiso')
            ->where('ur.id_usuario', $usuarioId)
            ->where('r.activo', 1)
            ->distinct()
            ->orderBy('p.codigo')
            ->pluck('p.codigo');

        return response()->json([
            'user' => [
                'id' => $usuario->id_usuario,
                'nombres' => $usuario->nombres,
                'apellidos' => $usuario->apellidos,
                'correo' => $usuario->correo,
                'estado' => $usuario->estado,
                'roles' => $roles,
                'permissions' => $permisos,
            ],
        ]);
    }

    /**
     * Cerrar sesión y revocar el token actual.
     */
    public function logout(Request $request): JsonResponse
    {
        $tokenHash = $request->attributes->get('auth_token_hash');

        DB::table('sesion_usuario')
            ->where('token_hash', $tokenHash)
            ->whereNull('revocada_en')
            ->update([
                'revocada_en' => now(),
            ]);

        return response()->json([
            'message' => 'Sesión cerrada correctamente.',
        ]);
    }
}
