"use strict"

import { logger } from '../utils/logger.js'

const handleError = async (code, error, res) => {
  logger.error(error)
  const errorMessage = error.toString()
  if (errorMessage == "[object Object]") {
    res.status(code).send(error)
  }
  else {
    res.status(code).send(errorMessage)
  }
}

export default handleError
