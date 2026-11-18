<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CrearSuperAdmin extends Command
{
    protected $signature = 'perfumeria:crear-superadmin';

    protected $description = 'Crea el primer usuario superadministrador';

    public function handle(): int
    {
        $nombres = trim($this->ask('Nombres'));
        $apellidos = trim($this->ask('Apellidos'));
        $correo = strtolower(trim($this->ask('Correo electrónico')));

        if ($nombres === '' || $apellidos === '') {
            $this->error('Los nombres y apellidos son obligatorios.');
            return self::FAILURE;
        }

        if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            $this->error('El correo electrónico no es válido.');
            return self::FAILURE;
        }

        if (DB::table('usuario')->where('correo', $correo)->exists()) {
            $this->error('Ya existe un usuario con ese correo.');
            return self::FAILURE;
        }

        $rol = DB::table('rol')
            ->where('codigo', 'SUPERADMIN')
            ->where('activo', 1)
            ->first();

        if (!$rol) {
            $this->error('No existe un rol SUPERADMIN activo.');
            return self::FAILURE;
        }

        $cantidadPermisos = DB::table('rol_permiso')
            ->where('id_rol', $rol->id_rol)
            ->count();

        if ($cantidadPermisos === 0) {
            $this->error('El rol SUPERADMIN no tiene permisos asignados.');
            return self::FAILURE;
        }

        $password = $this->secret('Ingrese una contraseña segura');
        $confirmacion = $this->secret('Confirme la contraseña');

        if (strlen($password) < 12 || $password !== $confirmacion) {
            $this->error('Las contraseñas deben coincidir y tener mínimo 12 caracteres.');
            return self::FAILURE;
        }

        try {
            DB::transaction(function () use (
                $nombres,
                $apellidos,
                $correo,
                $password,
                $rol
            ) {
                $idUsuario = DB::table('usuario')->insertGetId([
                    'nombres' => $nombres,
                    'apellidos' => $apellidos,
                    'correo' => $correo,
                    'password_hash' => Hash::make($password),
                    'estado' => 'ACTIVO',
                    'email_verificado_en' => now(),
                    'creado_en' => now(),
                    'actualizado_en' => now(),
                ]);

                DB::table('usuario_rol')->insert([
                    'id_usuario' => $idUsuario,
                    'id_rol' => $rol->id_rol,
                    'asignado_en' => now(),
                ]);
            });

            $this->info('SUPERADMIN creado correctamente.');
            $this->info('Correo: ' . $correo);
            $this->info('Permisos disponibles: ' . $cantidadPermisos);

            return self::SUCCESS;

        } catch (\Throwable $e) {
            report($e);
            $this->error('No fue posible crear el administrador. Revisa el registro de errores.');
            return self::FAILURE;
        }
    }
}
