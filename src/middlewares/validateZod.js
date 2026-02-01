import { ZodError } from "zod"

const formatZodError = (err) => {
  return err.errors.map(e => ({
    path: e.path.join("."),
    message: e.message
  }))
}

export const validateParams = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.params)
    req.validated = { ...(req.validated || {}), params: parsed }
    next()
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: "Invalid params", errors: formatZodError(err) })
    }
    return res.status(400).json({ message: "Invalid params", errors: err.message })
  }
}

export const validateQuery = (schema) => (req, res, next) => {
  try {
    // parse desde req.query (strings) y guardamos resultado en req.validated.query
    const parsed = schema.parse(req.query)
    req.validated = { ...(req.validated || {}), query: parsed }
    next()
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: "Invalid query", errors: formatZodError(err) })
    }
    return res.status(400).json({ message: "Invalid query", errors: err.message })
  }
}

export const validateBody = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body)
    req.validated = { ...(req.validated || {}), body: parsed }
    next()
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ message: "Invalid body", errors: formatZodError(err) })
    }
    return res.status(400).json({ message: "Invalid body", errors: err.message })
  }
}