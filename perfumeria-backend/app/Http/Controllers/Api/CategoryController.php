<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Consultar categorías con paginación y búsqueda.
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'activo' => ['nullable', 'boolean'],
        ]);

        $query = DB::table('categoria as c')
            ->leftJoin('categoria as padre', 'padre.id_categoria', '=', 'c.id_categoria_padre')
            ->select(
                'c.id_categoria',
                'c.id_categoria_padre',
                'padre.nombre as categoria_padre',
                'c.nombre',
                'c.descripcion',
                'c.activo'
            );

        if (!empty($validated['search'])) {
            $search = '%' . $validated['search'] . '%';

            $query->where(function ($builder) use ($search) {
                $builder->where('c.nombre', 'like', $search)
                    ->orWhere('c.descripcion', 'like', $search);
            });
        }

        if (array_key_exists('activo', $validated)) {
            $query->where('c.activo', $validated['activo']);
        }

        $categorias = $query
            ->orderBy('c.nombre')
            ->paginate($validated['per_page'] ?? 15);

        return response()->json($categorias);
    }

    /**
     * Consultar una categoría.
     */
    public function show(int $id): JsonResponse
    {
        $categoria = DB::table('categoria as c')
            ->leftJoin('categoria as padre', 'padre.id_categoria', '=', 'c.id_categoria_padre')
            ->select(
                'c.id_categoria',
                'c.id_categoria_padre',
                'padre.nombre as categoria_padre',
                'c.nombre',
                'c.descripcion',
                'c.activo'
            )
            ->where('c.id_categoria', $id)
            ->first();

        if (!$categoria) {
            return response()->json([
                'message' => 'La categoría no existe.'
            ], 404);
        }

        return response()->json([
            'data' => $categoria
        ]);
    }

    /**
     * Crear una categoría.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id_categoria_padre' => [
                'nullable',
                'integer',
                'exists:categoria,id_categoria'
            ],
            'nombre' => [
                'required',
                'string',
                'max:100'
            ],
            'descripcion' => [
                'nullable',
                'string',
                'max:255'
            ],
            'activo' => [
                'sometimes',
                'boolean'
            ],
        ]);

        $nombreDuplicado = DB::table('categoria')
            ->where('nombre', $validated['nombre'])
            ->where(function ($query) use ($validated) {
                if (!empty($validated['id_categoria_padre'])) {
                    $query->where(
                        'id_categoria_padre',
                        $validated['id_categoria_padre']
                    );
                } else {
                    $query->whereNull('id_categoria_padre');
                }
            })
            ->exists();

        if ($nombreDuplicado) {
            return response()->json([
                'message' => 'Ya existe una categoría con ese nombre en el mismo nivel.'
            ], 422);
        }

        $idCategoria = DB::table('categoria')->insertGetId([
            'id_categoria_padre' => $validated['id_categoria_padre'] ?? null,
            'nombre' => trim($validated['nombre']),
            'descripcion' => $validated['descripcion'] ?? null,
            'activo' => $validated['activo'] ?? 1,
        ]);

        return response()->json([
            'message' => 'Categoría creada correctamente.',
            'data' => DB::table('categoria')
                ->where('id_categoria', $idCategoria)
                ->first()
        ], 201);
    }

    /**
     * Actualizar una categoría.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $categoria = DB::table('categoria')
            ->where('id_categoria', $id)
            ->first();

        if (!$categoria) {
            return response()->json([
                'message' => 'La categoría no existe.'
            ], 404);
        }

        $validated = $request->validate([
            'id_categoria_padre' => [
                'sometimes',
                'nullable',
                'integer',
                'exists:categoria,id_categoria'
            ],
            'nombre' => [
                'sometimes',
                'required',
                'string',
                'max:100'
            ],
            'descripcion' => [
                'sometimes',
                'nullable',
                'string',
                'max:255'
            ],
            'activo' => [
                'sometimes',
                'boolean'
            ],
        ]);

        $nuevoPadre = array_key_exists('id_categoria_padre', $validated)
            ? $validated['id_categoria_padre']
            : $categoria->id_categoria_padre;

        if ((int) $nuevoPadre === $id) {
            return response()->json([
                'message' => 'Una categoría no puede ser su propia categoría padre.'
            ], 422);
        }

        $nuevoNombre = trim($validated['nombre'] ?? $categoria->nombre);

        $duplicada = DB::table('categoria')
            ->where('id_categoria', '<>', $id)
            ->where('nombre', $nuevoNombre)
            ->where(function ($query) use ($nuevoPadre) {
                if ($nuevoPadre !== null) {
                    $query->where('id_categoria_padre', $nuevoPadre);
                } else {
                    $query->whereNull('id_categoria_padre');
                }
            })
            ->exists();

        if ($duplicada) {
            return response()->json([
                'message' => 'Ya existe una categoría con ese nombre en el mismo nivel.'
            ], 422);
        }

        DB::table('categoria')
            ->where('id_categoria', $id)
            ->update([
                'id_categoria_padre' => $nuevoPadre,
                'nombre' => $nuevoNombre,
                'descripcion' => $validated['descripcion'] ?? $categoria->descripcion,
                'activo' => $validated['activo'] ?? $categoria->activo,
            ]);

        return response()->json([
            'message' => 'Categoría actualizada correctamente.',
            'data' => DB::table('categoria')
                ->where('id_categoria', $id)
                ->first()
        ]);
    }

    /**
     * Desactivar una categoría sin eliminar el registro.
     */
    public function destroy(int $id): JsonResponse
    {
        $categoria = DB::table('categoria')
            ->where('id_categoria', $id)
            ->first();

        if (!$categoria) {
            return response()->json([
                'message' => 'La categoría no existe.'
            ], 404);
        }

        if (!$categoria->activo) {
            return response()->json([
                'message' => 'La categoría ya se encuentra inactiva.'
            ], 409);
        }

        DB::table('categoria')
            ->where('id_categoria', $id)
            ->update(['activo' => 0]);

        return response()->json([
            'message' => 'Categoría desactivada correctamente.'
        ]);
    }
}
