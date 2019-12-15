// get the current user info
export function currentSession(req, res) {
  res.status(200).send(req.user);
}