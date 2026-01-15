# Azarquiel-Despliegues

## Netlify

En esta rama se explica cómo desplegar una App Web **dinámica** con Next JS en Netlify y se sirven los recursos necesarios para hacer pruebas rápidamente.

Se usan diferentes tecnologías como **Clerk** (Autenticación y registro de usuarios), **Supabase & Supabase UI** (base de datos y componentes de UI predefinidos), **Next JS** (framework JavaScript) o **Netlify** (hosting) entre otras.

### Requisitos: 
- Tener **Git** instalado
- Tener **Node** instalado
- Tener una cuenta en **GitHub**
- Tener una cuenta en **Clerk**
- Tener una cuenta en **Supabase**
- Tener una cuenta en **Netlify**

---

## 1. Clonar el proyecto en local

Debemos obtener la carpeta <a href="./azarquiel-chat">azarquiel-chat</a> de éste repositorio.

Primero, clonaremos esta rama:

```bash
git clone --branch 2-Netlify --single-branch https://github.com/AlonsoMartinez8/Azarquiel-Despliegues.git chat
```

Podemos comprobar el contenido del repositorio clonado con:

```bash
ls -a chat/

## aparecerá algo como;
## ./  ../  .git/  README.md  azarquiel-chat/
```

Ahora, copiaremos el directorio `azarquiel-chat` únicamente:

```bash
cp -r chat/azarquiel-chat/ .
```

Ya disponemos únicamente de la carpeta `azarquiel-chat` donde se encuentra nuestro proyecto. Podemos eliminar el repositorio clonado si queremos.

## 2. Instalar dependencias

Podemos acceder al proyecto con

```bash
cd azarquiel-chat
```

y ejecutar el siguiente comando para instalar las dependencias:

```bash
npm i
```

Al finalizar la instalación, podemos comprobar si funciona correctamente ejecutando:

```bash
npm run dev
```

Si nos abre un puerto `localhost:3000` o algo similar, funciona correctamente.

## 3. Variables de entorno

Ya que éste proyecto utiliza servicios como el de Clerk o Supabase, debemos de darle las **claves secretas** de dichos servicios para el correcto funcionamiento.

### Clerk

Tras crear una cuenta en <a href="https://clerk.com/">Clerk</a>, crearemos una aplicación.

Debemos:

- Dar un nombre a la aplicación (ej.: Azarquiel Chat)
- Seleccionar opciones de inicio de sesión (como mínimo debemos elegir **Username**)

Tras confirmar, nos llevará a una página de *Overview*.

Bajaremos hasta la sección *Set your Clerk API keys* y copiaremos las claves.

Crearemos un archivo `.env.local` en el proyecto donde pegaremos las claves.

### Supabase

Tras crear una cuenta en <a href="https://supabase.com/">Supabase</a>, crearemos un proyecto.

Le daremos un nombre y contraseña.

Tras confirmar, iremos a la parte superior y pulsaremos en *Connect*.

Iremos a *App Frameworks* y copiaremos las claves que aparecen en el archivo `.env.local`

## 4. Crear repositorio en GitHub

Ya establecidas las variables de entorno, deberemos crear un repositorio en GitHub y subir ahí nuestro proyecto.

En nuestro repositorio local:

```bash
git init
git add .
git commit -m "First commit"
git branch -M main
git remote add origin https://github.com/AlonsoMartinez8/AzarquielChatTest.git
git push -u origin main
```

Si recargamos nuestro repositorio en GitHub, aparecerá nuestro código subido.

## 5. Desplegar en Netlify

Tras crear una cuenta en <a href="https://www.netlify.com/">Netlify</a>, pulsaremos en **añadir nuevo proyecto** y elegiremos la opción **importar un proyecto existente**.

Seleccionaremos **GitHub** como proveedor y buscaremos nuestro repositorio.

---

Si no lo encontramos, deberemos de darle acceso a Netlify pulsando en *Configure the Netlify app on GitHub*.

Iremos hasta *repository access* haciendo scroll para abajo y daremos acceso a nuestro repositorio.

Finalmente pulsaremos en guardar y ya debería aparecer el repositorio en Netlify.

---

Seleccionaremos el repositorio y en la configuración, le daremos un nombre al proyecto de Netlify (ej.: azarquiel-chat).

De momento no modificaremos ninguna configuración aparte. Pulsaremos en **Deploy** abajo del todo.

> Este despliegue fallará

Tras el error, debido a que el entorno de Netlify no encuentra las variables de entorno necesarias para Clerk y Supabase, deberemos proporcionárselas.

Las copiaremos de nuestro archivo `.env.local` e iremos a `Project Configuration > Enviroment Variables` en Netlify.

Ahí pulsaremos *Add Variable* y seleccionaremos *Import from a .env file*.

En el contenido, pegaremos nuestras claves y pulsaremos en "Import variables" para confirmar.

---

Ahora deberemos *Re - Desplegar* la aplicación.

Iremos a `Deploys` y pulsaremos en *Trigger Deploy*, seleccionando la opción `Deploy project without Cache*.

Cuando Netlify finalice de desplegar la aplicación, tendremos nuestra app disponible para todos.