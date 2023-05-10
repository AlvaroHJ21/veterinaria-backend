# Veterinaria - Backend

Este es un proyecto de backend desarrollado con Node.js y Express, que utiliza una base de datos Postgres. La herramienta de gestión de paquetes utilizada es Yarn.

## Requisitos previos

Antes de comenzar a utilizar el proyecto, asegúrese de tener instalados Node.js y Postgres en su máquina.

## Instalación

1. Clone el repositorio desde Github en su máquina local.
2. En la raíz del proyecto, ejecute el comando `yarn install` para instalar las dependencias.
3. Cree un archivo `.env` en la raíz del proyecto y edite las variables de entorno para configurar la conexión a la base de datos. Ejemplo:

```
DB_HOST=localhost
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
```

## Configuración de la base de datos

El proyecto utiliza una base de datos Postgres que contiene dos tablas: `clientes` y `mascotas`.

### Tabla `clientes`

| Campo    | Tipo                  |
| -------- | --------------------- |
| id       | SERIAL PRIMARY KEY    |
| dni      | VARCHAR(8) NOT NULL   |
| nombre   | VARCHAR(255) NOT NULL |
| apellido | VARCHAR(255) NOT NULL |
| telefono | VARCHAR(9) NOT NULL   |

### Tabla `mascotas`

| Campo      | Tipo                            |
| ---------- | ------------------------------- |
| id         | SERIAL PRIMARY KEY              |
| nombre     | VARCHAR(255) NOT NULL           |
| edad       | INTEGER NOT NULL                |
| cliente_id | INTEGER REFERENCES clientes(id) |

## Ejecución del servidor

Una vez instaladas las dependencias y configurada la base de datos, puede ejecutar el servidor con el comando:

```
yarn start o yarn dev
```

El servidor se ejecutará en el puerto 3000 por defecto.

## Rutas

El servidor tiene las siguientes rutas disponibles:

url base: `http://localhost:3000/api/v1`

| Método | Ruta         | Descripción                                                    |
| ------ | ------------ | -------------------------------------------------------------- |
| GET    | /clients     | Obtiene la lista de todos los clientes                         |
| GET    | /clients/:id | Obtiene la información de un cliente por su ID                 |
| POST   | /clients     | Crea un nuevo cliente                                          |
| PATCH  | /clients/:id | Actualiza la información parcial de un cliente por su ID       |
| DELETE | /clients/:id | Elimina un cliente por su ID                                   |
| GET    | /pets        | Obtiene la lista de todas las mascotas                         |
| GET    | /pets/:id    | Obtiene la información de una mascota por su ID                |
| POST   | /pets        | Crea una nueva mascota                                         |
| PATCH  | /pets/:id    | Actualiza la información parcialmente de una mascota por su ID |
| DELETE | /pets/:id    | Elimina una mascota por su ID                                  |
