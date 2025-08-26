from newsapi import NewsApiClient

newsapi = NewsApiClient(api_key="cc13ddeb04f34ed28822a7aaa6c17ffc")

sources = newsapi.get_sources()

for src in sources["sources"]:
    if src["country"] == "it":
        print(f"{src['id']} - {src['name']} ({src['language']})")

