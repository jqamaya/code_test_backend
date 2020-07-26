let SearchResult = require('../db/models').search_results;

/**
 * Save search results
 */
exports.saveResult = async function(searchResult) {
    const result = await SearchResult.create({
        topic: searchResult.topic,
        language:searchResult.language,
        result: searchResult.result
    });
    return result;
}

/**
 * Get search results
 */
exports.getResults = async function(req) {
    let results = await SearchResult.findAll();
    return results;
}

/**
 * Get search result details
 */
exports.getResultDetails = async function(id) {
    let result = await SearchResult.findByPk(id);
    return result;
}