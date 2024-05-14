export default async function handler(req, res) {
    const { headers } = req;
    console.log(headers)
    return res.json(headers);
  }