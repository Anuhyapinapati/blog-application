from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

posts = []

@app.route('/')
def index():
    return render_template('index.html')

# Real API routes
@app.route('/posts', methods=['GET'])
def get_posts():
    return jsonify(posts)

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()

    if not data or 'title' not in data or 'content' not in data:
        return jsonify({"error": "Invalid data"}), 400

    new_post = {
        "id": len(posts) + 1,
        "title": data["title"],
        "content": data["content"],
        "timestamp": request.date if hasattr(request, "date") else None  # placeholder
    }

    posts.append(new_post)
    return jsonify(new_post), 201


# 🔥 FIX: Add proxy routes so script.js works without changes
@app.route('/proxy/5000/posts', methods=['GET', 'POST'])
def proxy_posts():
    if request.method == 'GET':
        return get_posts()
    elif request.method == 'POST':
        return create_post()


if __name__ == '__main__':
    app.run(debug=True)
