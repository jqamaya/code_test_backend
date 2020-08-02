let SearchResultRepository = require('../repositories/SearchResultRepository');
const axios = require('axios');

/**
 * Search for Github repositories
 * 
 * @param req   Request
 * @param res   Response
 */
exports.search = async function(req, res) {
    let request = req.body;
    let topic = request.topic;
    let language = request.language;
    let limit = request.length ? request.length : 20;
    let page = (request.start / limit) + 1;

    if (!topic && !language) {
        return buildResponse(request, res);
    }

    let keyword = '';
    let connector = '';
    if (topic) {
        keyword = 'topic:' + topic;
        connector = '+';
    }
    if (language) {
        keyword += connector + 'language:' + language;
    }

    let url = 'https://api.github.com/search/repositories?q=' + keyword;
    return axios.get(url, {
            params: {
                page: page,
                per_page: limit
            }
        })
        .then(response => {
            const result = SearchResultRepository.saveResult({
                topic,
                language,
                result: response.data
            });
            return buildResponse(request, res, response.data);
        })
        .catch(error => {
            let errorMessage = getErrorMessage(error);
            const result = SearchResultRepository.saveResult({
                topic,
                language,
                result: error.response ? error.response.data : errorMessage
            });
            return buildResponse(request, res, null, errorMessage);
        });
}

/**
 * Get the error message from the exception
 * 
 * @param {*} error 
 */
const getErrorMessage = function (error) {
    let errorMessage = error.message;
    if (error.response && error.response.data) {
        errorMessage = error.response.data.message;
    }
    return errorMessage;
}

/**
 * Build JSON response for datatables
 * 
 * @param {*} request 
 * @param {*} res 
 * @param {*} data 
 * @param {string} error error message 
 */
const buildResponse = function(request, res, data = null, error = null) {
    let total = 0;
    let results = [];
    if (data) {
        total = data.total_count ? data.total_count : data.length
        results = data.items ? data.items : data;
    }
    return res.json({
        'draw': request.draw,
        'recordsTotal': total,
        'recordsFiltered': total,
        'data': results,
        'error': error ? error : '',
    });
}

/**
 * Get search results from database
 * 
 * @param req   Request
 * @param res   Response
 */
exports.getResults = async function(req, res) {
    let request = req.body;
    try {
        const results = await SearchResultRepository.getResults(req);
        return buildResponse(request, res, results);
    } catch (error) {
        let errorMessage = getErrorMessage(error);
        return buildResponse(request, res, null, errorMessage);
    }
}

/**
 * Get result details by ID
 * 
 * @param req   Request
 * @param res   Response
 */
exports.getResultDetails = async function(req, res) {
    try {
        const result = await SearchResultRepository.getResultDetails(req.params.id);
        return res.render('admin_result', { result: result });
    } catch (error) {
        return res.render('admin_result', { result: null });
    }
}