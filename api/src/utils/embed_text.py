from sentence_transformers import SentenceTransformer

# use_model = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4") # return 512 dimensions


model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2") # return 384 dimensions

# def embed_text(text: str) -> list:
#     emb = use_model([text])
#     return np.array(emb[0]).tolist()

def embed_text(text: str) -> list:
    embedding = model.encode(text)
    return embedding.tolist()
