export default async function handler(req, res) {
    const { headers } = req;
    console.log(headers.address)
    return res.json(headers);
  }