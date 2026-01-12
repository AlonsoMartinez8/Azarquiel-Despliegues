# Azaquiel-Despliegues

## GitHub Pages

En esta rama se explica cómo desplegar una App Web **estática** en GitHub Pages y se sirven los recursos necesarios para hacer pruebas rápidamente.

> Requisitos: tener **Git** instalado y una cuenta en **GitHub**.

---

## 1. Clonar esta rama en local

Clona directamente la rama `1-GitHub-Pages` en una carpeta llamada `PokeApi`:

```bash
git clone --branch 1-GitHub-Pages --single-branch https://github.com/AlonsoMartinez8/Azaquiel-Despliegues.git PokeApi
```

## 2. Crear repositorio en GitHub

- Ve a GitHub → New repository.

- Ponle un nombre (ej: PokeApi).

- Elige visibilidad (Public recomendado para Pages).

- Importante: selecciona **NO** inicializar con: 
    - README
    - .gitignore
    - LICENSE

- Crea el repositorio.

## 3. Enlazar tu proyecto local con el repositorio remoto

El proyecto clonado tiene un origin apuntando al repositorio original. Debes cambiarlo para que apunte a tu **propio** repositorio.

Comprueba el remote actual:

```bash
git remote -v
```
Cambia el remote (sustituye TU_USUARIO y TU_REPO)

```bash
git remote set-url origin https://github.com/TU_USUARIO/TU_REPO.git
```

Verifica el cambio

```bash
git remote -v
```

Comprueba el nombre de la rama actual

```bash
git branch
```

Cambia el nombre de la rama a *main*

```bash
git branch -M main
```

Sube los cambios al repositorio remoto

```bash
git push -u origin main
```

## 4. Desplegar en GitHub Pages

- En tu repositorio → Settings.
- Menú lateral → Pages.
- En Build and deployment:
    - Source: Deploy from a branch
    - Branch: 1-GitHub-Pages
    - Folder: / (root)
- Guarda los cambios.

Tras unos segundos aparecerá la URL del sitio.