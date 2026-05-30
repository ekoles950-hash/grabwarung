// Lokasi file: api/topup.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, pesan: 'Method Not Allowed' });
  }

  // Sekarang Vercel nangkep nomor HP dan ID Layanan dari web
  const { noHp, idLayanan } = req.body;

  const termuxUrl = "https://highlights-cassette-preliminary-executed.trycloudflare.com/topup.php";

  try {
    const response = await fetch(termuxUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: noHp,
        id_layanan: idLayanan // <-- Ini dikirim langsung ke Termux
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error Sistem:", error);
    return res.status(500).json({ status: false, pesan: "Gagal nyambung ke Server Termux HP." });
  }
}