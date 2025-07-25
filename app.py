from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, login_required, logout_user, UserMixin, current_user
import sqlite3
import bcrypt
import os

app = Flask(__name__)
app.secret_key = "clave_secreta_segura"

# Configuración de Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

DATABASE = "usuarios.db"

# -------- BASE DE DATOS --------
def crear_base():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

crear_base()

# -------- CLASE USUARIO --------
class Usuario(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    @staticmethod
    def buscar_por_nombre(username):
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        cur.execute("SELECT * FROM usuarios WHERE username=?", (username,))
        row = cur.fetchone()
        conn.close()
        if row:
            return Usuario(id=row[0], username=row[1], password=row[2])
        return None

@login_manager.user_loader
def load_user(user_id):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM usuarios WHERE id=?", (user_id,))
    row = cur.fetchone()
    conn.close()
    if row:
        return Usuario(id=row[0], username=row[1], password=row[2])
    return None

# -------- RUTAS --------
@app.route("/")
def index():
    return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["Username"]
        password = request.form["Password"].encode("utf-8")
        usuario = Usuario.buscar_por_nombre(username)

        if usuario and bcrypt.checkpw(password, usuario.password.encode("utf-8")):
            login_user(usuario)
            return redirect(url_for("panel"))
        else:
            flash("❌ Usuario o contraseña incorrectos", "danger")
            return redirect(url_for("login"))

    return render_template("login.html")

@app.route("/registro", methods=["POST"])
def registro():
    username = request.form["Username"]
    password = request.form["Password"].encode("utf-8")
    hash_pw = bcrypt.hashpw(password, bcrypt.gensalt())

    try:
        conn = sqlite3.connect(DATABASE)
        cur = conn.cursor()
        cur.execute("INSERT INTO usuarios (username, password) VALUES (?, ?)", (username, hash_pw.decode("utf-8")))
        conn.commit()
        conn.close()
        flash("✅ Usuario registrado exitosamente", "success")
    except sqlite3.IntegrityError:
        flash("⚠️ El usuario ya existe", "warning")

    return redirect(url_for("login"))

@app.route("/panel")
@login_required
def panel():
    return f"<h1>Bienvenido {current_user.username}</h1><a href='/logout'>Cerrar sesión</a>"

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
