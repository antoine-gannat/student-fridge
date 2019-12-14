// get the current user info
export function currentSession(request, reply) {
  reply.code(200).send(request.raw.user);
}