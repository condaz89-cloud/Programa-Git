<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $authorization = $request->header('Authorization');

        if (!$authorization || !preg_match('/^Bearer\s+(.+)$/i', $authorization, $matches)) {
            return response()->json([
                'message' => 'No se proporcionó un token válido.'
            ], 401);
        }

        $token = trim($matches[1]);
        $tokenHash = hash('sha256', $token);

        $sesion = DB::table('sesion_usuario')
            ->where('token_hash', $tokenHash)
            ->whereNull('revocada_en')
            ->where('expira_en', '>', now())
            ->first();

        if (!$sesion) {
            return response()->json([
                'message' => 'La sesión no existe, expiró o fue revocada.'
            ], 401);
        }

        $usuario = DB::table('usuario')
            ->where('id_usuario', $sesion->id_usuario)
            ->where('estado', 'ACTIVO')
            ->whereNull('eliminado_en')
            ->first();

        if (!$usuario) {
            return response()->json([
                'message' => 'La cuenta no está disponible.'
            ], 403);
        }

        $request->attributes->set('auth_user_id', $usuario->id_usuario);
        $request->attributes->set('auth_token_hash', $tokenHash);

        return $next($request);
    }
}
