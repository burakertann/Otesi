import os
from tavily import TavilyClient
from dotenv import load_dotenv

load_dotenv()

tavily_key = os.getenv("TAVILY_API_KEY")

query_text = (
    "Gazeteci Cem Küçük'ün 'Piyasalar kan ağlıyor' açıklaması site:.tr | "
    "Bu açıklama Türkiye ekonomisi ve Borsa İstanbul ile nasıl ilişkilidir? "
    "Cem Küçük'ün siyasi duruşu göz önüne alındığında bu ifadenin önemi nedir ve ne gibi tepkiler aldı?"
)

tavily_client = TavilyClient(api_key=tavily_key)
response = tavily_client.search(
    query= query_text,
    search_depth='advanced',
    include_answer=True,
    topic='news',
    max_results=5,
    country='turkey'
    )

print(response)

print(response["answer"])