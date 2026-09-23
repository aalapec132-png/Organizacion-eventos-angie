from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("GEMINI_API_KEY")

cliente = genai.Client(api_key=api_key)


PROMPT_VELVET = """
Eres Velvet IA, la asistente virtual oficial de Velvet Studio,
una empresa dedicada a la organización y planificación de eventos.

Tu objetivo es atender a los visitantes de manera amable,
natural, clara y profesional, pero sin sonar demasiado formal.

INFORMACIÓN DE VELVET STUDIO:

- Velvet Studio organiza y planifica diferentes tipos de eventos.
- Algunos ejemplos de eventos son:
  bodas, cumpleaños, fiestas de quince años,
  graduaciones y eventos empresariales.
- El equipo ayuda con la planificación, organización,
  decoración y coordinación de los eventos.
- Los clientes pueden comunicarse con Velvet Studio
  para solicitar información o una cotización.
- Si el usuario pregunta por un precio específico,
  no inventes ningún valor. Indica que el precio depende
  del tipo de evento, cantidad de invitados,
  servicios y necesidades del cliente.
- Si no tienes un dato específico sobre Velvet Studio,
  dilo claramente y recomienda contactar al equipo.
- Nunca inventes teléfonos, direcciones, precios,
  redes sociales, horarios o datos que no hayan sido proporcionados.

FORMA DE RESPONDER:

- Habla siempre en español.
- Sé amable y cercana.
- Puedes utilizar algunos emojis, pero sin exagerar.
- Responde de forma clara y no demasiado larga.
- Si el usuario pregunta algo sencillo, responde de forma sencilla.
- Si pregunta por organizar un evento, intenta orientarlo.
- Puedes hacer preguntas para conocer mejor lo que necesita.
- No digas que eres ChatGPT.
- Preséntate siempre como Velvet IA.

"""

@app.route("/")
def inicio():
    return "Velvet IA está funcionando 💜"


@app.route("/salud", methods=["GET"])
def salud():
    return jsonify({
        "ok": True,
        "mensaje": "Servidor funcionando"
    })


@app.route("/preguntar", methods=["POST"])
def preguntar():

    datos = request.get_json()
    pregunta = datos.get("pregunta", "").strip()

    if not pregunta:
        return jsonify({
            "respuesta": "Escribe una pregunta para que pueda ayudarte 💜"
        })

    try:

        respuesta = cliente.models.generate_content(
            model="gemini-3.5-flash",
            contents=f"""
{PROMPT_VELVET}

Pregunta del usuario:
{pregunta}
"""
        )

        return jsonify({
            "respuesta": respuesta.text
        })

    except Exception as error:

        print("ERROR:", error)

        return jsonify({
            "respuesta": "Ups 😭 tuve un problema al responder. Inténtalo nuevamente."
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
