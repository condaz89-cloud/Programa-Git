<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class RequirePermission
{
    public function handle(
        Request $request,
        Closure $next,
        string $permission
    ): Response {

        $usuarioId = $request->attributes->get('auth_user_id');

        if (!$usuarioId) {
            return response()->json([
                'message' => 'Usuario no autenticado.'
            ], 401);
        }

        $tienePermiso = DB::table('usuario_rol as ur')
            ->join('rol as r', 'r.id_rol', '=', 'ur.id_rol')
            ->join('rol_permiso as rp', 'rp.id_rol', '=', 'r.id_rol')
            ->join('permiso as p', 'p.id_permiso', '=', 'rp.id_permiso')
            ->where('ur.id_usuario', $usuarioId)
            ->where('r.activo', 1)
            ->where('p.codigo', $permission)
            ->exists();

        if (!$tienePermiso) {
            return response()->json([
                'message' => 'No tienes autorización para realizar esta operación.',
                'required_permission' => $permission
            ], 403);
        }

        return $next($request);
    }
}

