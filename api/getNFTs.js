export default async function handler(req, res) {

    console.log(req.query)
    return res.json(req);
  }