# Guía para reparar y probar Velvet IA en Windows

En esta guía vamos a configurar Velvet IA con una API key de Google Gemini. La clave no pertenece al repositorio y nunca debe publicarse en GitHub ni enviarse por chat.

## 1. Obtener una API key

1. Vamos a entrar en [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Creamos o seleccionamos un proyecto.
3. Creamos una API key.
4. La guardamos en un lugar seguro.

> La clave es personal y no la vamos a compartir. Si se publica por accidente, la revocamos y creamos otra.

## ¿Dónde se coloca la API key?

La API key se coloca en el archivo:

```text
backend/.env
```

El proyecto ya está preparado para leer ese archivo mediante `load_dotenv()` en `backend/app.py`.

No la colocamos en:

- `ia.js`.
- `app.py`.
- `index.html`.
- GitHub.

### Crear el archivo `.env`

Primero entramos a la carpeta `backend` y copiamos el archivo de ejemplo.

PowerShell:

```powershell
cd backend
Copy-Item .env.example .env
```

Git Bash:

```bash
cd backend
cp .env.example .env
```

CMD:

```bat
cd backend
copy .env.example .env
```

Después abrimos `backend/.env` con el Bloc de notas y reemplazamos:

```text
GEMINI_API_KEY=TU_API_KEY
```

por nuestra clave real:

```text
GEMINI_API_KEY=LA_CLAVE_REAL
```

Guardamos el archivo y luego iniciamos Flask:

```text
py app.py
```

Si aparece un error relacionado con `GEMINI_API_KEY`, revisamos que exista `backend/.env`, que la variable esté escrita correctamente y que no tenga espacios alrededor del signo `=`.

## 2. Preparar el backend

Desde la carpeta del proyecto, vamos a preparar el backend:

### Windows PowerShell

```powershell
cd backend
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
py app.py
```

### Windows Git Bash

```bash
cd backend
py -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
py app.py
```

### Windows CMD

```bat
cd backend
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
py app.py
```

Usamos una sola terminal para iniciar el backend. Podemos elegir PowerShell, Git Bash o CMD, según la herramienta que tengamos abierta.

Al terminar, nuestro backend debe quedar disponible en:

```text
http://localhost:5000
```

## 3. Comprobar que Flask funciona

Ahora abrimos en el navegador:

```text
http://localhost:5000/salud
```

La respuesta esperada es:

```json
{
  "ok": true,
  "mensaje": "Servidor funcionando"
}
```

Si esta URL no responde, primero revisamos Flask, las dependencias o el puerto. Todavía no buscamos el problema en Gemini.

## 4. Iniciar el frontend

En otra ventana de PowerShell o Git Bash, desde la carpeta principal del proyecto, iniciamos el frontend:

```powershell
py -m http.server 8001
```

El mismo comando funciona en Git Bash y CMD:

```bash
py -m http.server 8001
```

Después abrimos:

```text
http://127.0.0.1:8001/index.html
```

## 5. Probar la IA

Escribimos una pregunta en el chat, por ejemplo:

```text
¿Qué servicios ofrecen para una boda?
```

El frontend debe enviar nuestra pregunta a:

```text
POST /preguntar
```

## Diagnóstico rápido

| Problema | Posible causa | Solución |
|---|---|---|
| `/salud` no abre | Flask no está iniciado | Ejecutar `py app.py` |
| Error de módulo Flask | Dependencias faltantes | Ejecutar `pip install -r requirements.txt` |
| La IA responde error 500 | Falta la API key o falla Gemini | Revisar `GEMINI_API_KEY` y la terminal del backend |
| El navegador no conecta | URL o puerto incorrecto | Confirmar `localhost:5000` y `127.0.0.1:8001` |
| Render no responde | Servicio dormido, caído o mal configurado | Revisar logs y variables de entorno en Render |
| El modelo no existe | Nombre de modelo no disponible | Revisar el modelo configurado en `backend/app.py` |

## Reglas de seguridad

- No subir API keys a GitHub.
- No escribir API keys dentro de `ia.js`.
- No usar una API key personal para todo el curso.
- No publicar archivos `.env`.
- Si una clave aparece en una captura o repositorio, revocarla inmediatamente.

## Lista de comprobación

- [ ] Instalamos las dependencias de Flask.
- [ ] Creamos `backend/.env` a partir de `.env.example`.
- [ ] Colocamos `GEMINI_API_KEY` dentro de `backend/.env`.
- [ ] Confirmamos que `http://localhost:5000/salud` responde correctamente.
- [ ] Abrimos el frontend mediante un servidor HTTP.
- [ ] Confirmamos que la pregunta llega a `POST /preguntar`.
- [ ] Revisamos que la terminal del backend no muestre errores.
