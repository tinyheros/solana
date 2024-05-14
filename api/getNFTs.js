export default async function handler(req, res) {

    console.log(req.params)
    return res.json(req);
  }