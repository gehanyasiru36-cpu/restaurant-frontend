import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRScannerScreen({ onScanSuccess }) {
  useEffect(() => {
    // QR Scanner එක සෙටප් කිරීම
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,       // තත්පරයට ෆ්‍රේම් ගණන
      qrbox: { width: 250, height: 250 }, // ස්කෑන් කරන කොටුවේ ප්‍රමාණය
    });

    // සාර්ථකව QR එකක් ස්කෑන් වුණාම වැඩ කරන ෆන්ක්ෂන් එක
    const onSuccess = (decodedText) => {
      console.log("Scanned Link: ", decodedText);
      scanner.clear(); // ස්කෑනර් එක නවත්වනවා
      
      try {
        // QR එක ඇතුළේ තියෙන්නේ ලින්ක් එකක් නම් (e.g., http://localhost:5173/?table=4)
        const url = new URL(decodedText);
        const table = url.searchParams.get('table');
        
        if (table) {
          onScanSuccess(parseInt(table)); // Table Number එක ප්‍රධාන ඇප් එකට පාස් කරනවා
        } else {
          alert("වැරදි QR කේතයක්! Table Number එකක් හොයාගන්න බැහැ.");
        }
      } catch (e) {
        // ලින්ක් එකක් නැතුව නිකන්ම අංකයක් විතරක් QR එකේ තිබුණොත්
        if (!isNaN(decodedText)) {
          onScanSuccess(parseInt(decodedText));
        } else {
          alert("කරුණාකර නිවැරදි QuickBite QR කේතයක් ස්කෑන් කරන්න!");
        }
      }
    };

    const onError = (err) => {
      // කැමරාව හැම තත්පරේම ෆ්‍රේම් චෙක් කරද්දී එන සාමාන්‍ය එරර්ස් (දැන්ම පෙන්වන්න ඕන නෑ)
    };

    scanner.render(onSuccess, onError);

    // පේජ් එකෙන් අයින් වෙද්දී කැමරාව ඔෆ් කරන්න
    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [onScanSuccess]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#2f3542', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ color: '#ff4757', marginBottom: '5px' }}>QuickBite QR Scanner 📸</h2>
      <p style={{ color: '#a4b0be', marginBottom: '30px' }}>කරුණාකර මේසය මත ඇති QR කේතය ස්කෑන් කරන්න</p>
      
      {/* Scanner එක රෙන්ඩර් වෙන තැන */}
      <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '10px', borderRadius: '10px', overflow: 'hidden' }}>
        <div id="reader" style={{ color: '#2f3542' }}></div>
      </div>

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#ced6e0' }}>
        <p>💡 ටෙස්ට් කිරීමට ඔබම සාදාගත් QR එකක් හෝ <br/> මේස අංකය ඇතුළත් QR එකක් පාවිච්චි කරන්න.</p>
      </div>
    </div>
  );
}

export default QRScannerScreen;
