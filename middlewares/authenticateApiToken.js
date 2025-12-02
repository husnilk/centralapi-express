const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Middleware: authenticateApiToken
 * - Reads API Key from `X-API-KEY` header
 * - Validates against ApiKey model in database
 * - On success: attaches `req.apiKey` object and calls `next()`
 * - On failure: responds with 401 (Unauthorized)
 *
 * Usage:
 *   const authenticateApiToken = require('./middlewares/authenticateApiToken');
 *   app.use('/api', authenticateApiToken);
 *
 * Client request example:
 *   curl -H "X-API-KEY: <uuid>" http://localhost:3000/api/endpoint
 */

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.get("X-API-KEY") || req.headers["x-api-key"];

    if (!apiKey) {
      return res
        .status(401)
        .json({ error: "Missing API Key. Please provide X-API-KEY header." });
    }

    // Query database for the API key
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { apikey: apiKey },
    });

    if (!apiKeyRecord) {
      return res.status(401).json({ error: "Invalid API Key." });
    }

    // Attach API Key record to request for downstream handlers
    req.apiKey = apiKeyRecord;
    next();
  } catch (error) {
    console.error("[authenticateApiToken] Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error during API Key validation." });
  }
};
