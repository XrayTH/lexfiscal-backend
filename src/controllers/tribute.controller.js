import Tribute from "../models/Tribute.js"

export const getTributes = async (req, res, next) => {
  try {
    // preferimos los valores validados (si existen), si no usamos req.query directo
    const qObj = (req.validated && req.validated.query) || req.query || {}
    const page = parseInt(qObj.page, 10) || 1
    const limit = Math.min(parseInt(qObj.limit, 10) || 20, 100)
    const search = qObj.q ? String(qObj.q).trim() : null

    const filter = {}
    if (search) {
      const regex = new RegExp(search, "i")
      filter.$or = [
        { name: regex },
        { slug: regex },
        { "technicalSheet.definition": regex }
      ]
    }

    const total = await Tribute.countDocuments(filter)
    const tributes = await Tribute.find(filter)
      .select("name slug type scope validity legalBasis")
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json({
      total,
      page,
      perPage: limit,
      count: tributes.length,
      data: tributes
    })
  } catch (error) {
    next(error)
  }
}

export const getTributeBySlug = async (req, res, next) => {
  try {
    const { slug } = (req.validated && req.validated.params) || req.params
    const tribute = await Tribute.findOne({ slug })

    if (!tribute) {
      return res.status(404).json({
        message: "Tribute not found"
      })
    }

    res.status(200).json(tribute)
  } catch (error) {
    next(error)
  }
}

