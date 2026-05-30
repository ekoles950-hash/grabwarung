// Lokasi file: api/topup.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, pesan: 'Method Not Allowed' });
  }

  const { noHp } = req.body;

  // Ini link jembatan Cloudflare lo, ditambah /topup.php di belakangnya
  const termuxUrl = "https://highlights-cassette-preliminary-executed.trycloudflare.com/topup.php";

  try {
    // Vercel ngirim pesanan ke HP Termux lo
    const response = await fetch(termuxUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: noHp,
        id_layanan: 'DN5' // Kode ID produk DANA 5000
      })
    });

    // Jawaban dari Termux (dan PPOB) dikembalikan ke web
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error Sistem:", error);
    return res.status(500).json({ status: false, pesan: "Gagal nyambung ke Server Termux HP." });
  }
}