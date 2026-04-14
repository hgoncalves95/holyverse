# ⚙️ HolyVerse API — Backend

API desenvolvida em Python com Flask para fornecer versículos bíblicos baseados no estado emocional do usuário.

---

## 🚀 API ONLINE

👉 https://holyverse-backend.onrender.com

---

## 🔥 Funcionalidades

* 📖 Retorna versículos por sentimento
* 🤖 Analisa texto do usuário (IA simples)
* 🎯 Seleciona versículo aleatório
* 🌐 API REST

---

## 🛠️ Tecnologias

* Python
* Flask
* Flask-CORS
* Gunicorn

---

## 📡 Endpoints

### 🔹 Buscar versículo por sentimento

```
GET /versiculo/<sentimento>
```

Exemplo:

```
/versiculo/tristeza
```

---

### 🔹 Analisar texto (IA simples)

```
POST /analisar
```

Body:

```json
{
  "texto": "estou muito cansado"
}
```

Resposta:

```json
{
  "sentimento": "cansaco",
  "versiculo": "..."
}
```

---

## 🧠 Lógica de IA

O sistema utiliza detecção de palavras-chave para identificar sentimentos como:

* tristeza
* ansiedade
* medo
* cansaço
* gratidão
* alegria

---

## 📁 Estrutura

```
holyverse-backend/
│── app.py
│── versiculos.json
│── requirements.txt
```

---

## ⚙️ Como rodar localmente

```bash
pip install -r requirements.txt
python app.py
```

---

## 📌 Objetivo

Fornecer uma API simples e eficiente para conectar usuários a versículos bíblicos personalizados.

---

## 🙌 Autor

Desenvolvido por Henrique Gonçalves
