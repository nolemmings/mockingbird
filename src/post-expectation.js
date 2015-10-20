import expectations from './expectations';

export default (req, res) => {
  const request = req.body;
  const expected = expectations.add(request);
  res.status(201).send(expected);
};
