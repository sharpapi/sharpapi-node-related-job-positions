const { SharpApiCoreService, SharpApiJobTypeEnum } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for finding related job positions using SharpAPI.com
 */
class SharpApiRelatedJobPositionsService extends SharpApiCoreService {
  /**
   * Generates a list of related job positions with their weights as float value (1.0-10.0)
   * where 10 equals 100%, the highest relevance score.
   *
   * @param {string} jobPositionName
   * @param {string|null} language
   * @param {number|null} maxQuantity
   * @returns {Promise<string>} - The status URL.
   */
  async relatedJobPositions(jobPositionName, language = null, maxQuantity = null) {
    const data = { content: jobPositionName };
    if (language) data.language = language;
    if (maxQuantity) data.max_quantity = maxQuantity;

    const response = await this.makeRequest('POST', SharpApiJobTypeEnum.HR_RELATED_JOB_POSITIONS.url, data);
    return this.parseStatusUrl(response);
  }
}

module.exports = { SharpApiRelatedJobPositionsService };