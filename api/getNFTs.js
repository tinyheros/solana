export default async function handler(req, res) {
    const { body } = req;
    console.log(body.address)
    return res.json(body.address);
  }