# backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
# CORS için gerekli modülü import et
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- YENİ KISIM BAŞLANGICI ---
# İzin verilecek adreslerin listesi
# React geliştirme sunucusu varsayılan olarak 5173 portunu kullanır
origins = [
    "http://localhost:5173",
]

# Middleware'i uygulamaya ekle
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Sadece bu adreslerden gelen isteklere izin ver
    allow_credentials=True,
    allow_methods=["*"],  # Tüm metodlara (GET, POST, vb.) izin ver
    allow_headers=["*"],  # Tüm başlıklara izin ver
)
# --- YENİ KISIM SONU ---

class AnalyzeRequest(BaseModel):
    url: str

@app.get("/")
def read_root():
    return {"message": "Ötesi AI Backend'i çalışıyor!"}

@app.post("/analyze")
def analyze_url(request: AnalyzeRequest):
    print(f"Analiz için gelen link: {request.url}")
    fake_result = f"'{request.url}' linki için BACKEND tarafından üretilen GERÇEK sonuç: Bu haber önemlidir."
    return {"result": fake_result}