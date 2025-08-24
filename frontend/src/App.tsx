// ========================================================================
// Dosya: src/App.tsx
// Açıklama: Backend'e gerçek API isteği yapacak şekilde güncellendi.
// ========================================================================
import { useState } from 'react';
import type { FormEvent } from 'react';
// CSS Modules dosyasını 'styles' adıyla import ediyoruz.
// Artık tüm class isimleri styles objesinden gelecek (örn: styles.container)
import styles from './App.module.css';

export default function App() {
  const [url, setUrl] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fonksiyonu async olarak işaretliyoruz çünkü içinde await kullanacağız
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!url.startsWith('http')) {
      setError('Lütfen geçerli bir link girin (http:// veya https:// ile başlamalı).');
      return;
    }

    setError('');
    setResult('');
    setIsLoading(true);
    
    // --- GÜNCELLENEN KISIM BAŞLANGICI ---
    // setTimeout'u silip yerine gerçek API isteği ekliyoruz.
    try {
      // Backend'imizin /analyze endpoint'ine bir POST isteği gönderiyoruz
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Göndereceğimiz veri. Backend'deki Pydantic modelimizle eşleşmeli.
        body: JSON.stringify({ url: url }),
      });

      // Eğer sunucudan gelen cevap başarılı değilse (örn: 500 hatası)
      if (!response.ok) {
        throw new Error('Sunucudan bir hata yanıtı geldi. Lütfen tekrar deneyin.');
      }

      // Sunucudan gelen JSON verisini alıyoruz
      const data = await response.json();
      
      // Gelen verideki 'result' alanını state'e kaydediyoruz
      setResult(data.result);

    } catch (err) {
      // Ağ hatası veya başka bir sorun olursa burası çalışır
      console.error("API isteği sırasında bir hata oluştu:", err);
      setError('Analiz sırasında bir sorun oluştu. Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.');
    } finally {
      // Hata olsa da olmasa da yüklenme durumunu bitiriyoruz
      setIsLoading(false);
    }
    // --- GÜNCELLENEN KISIM SONU ---
  };

  return (
    // Class isimlerini styles objesinden çağırıyoruz.
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ötesi AI</h1>
        <p className={styles.subtitle}>Anlamak istediğin haberin linkini yapıştır ve bağlamın ötesini gör.</p>
      </header>

      <main className={styles.mainContent}>
        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.urlInput}
            placeholder="https://ornekhaber.com/..."
            disabled={isLoading}
          />
          <button type="submit" className={styles.analyzeButton} disabled={isLoading}>
            {isLoading ? 'Analiz Ediliyor...' : 'Haberi Açıkla'}
          </button>
        </form>

        {error && <p className={styles.errorMessage}>{error}</p>}

        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Sistem analiz ediyor, lütfen bekleyin...</p>
          </div>
        )}

        {result && (
          <div className={styles.resultContainer}>
            <h2 className={styles.resultTitle}>Analiz Sonucu</h2>
            <pre className={styles.resultText}>{result}</pre>
          </div>
        )}
      </main>
    </div>
  );
}