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

    // Github API URL
    let url = 'https://api.github.com/search/repositories';
    // if topic and language are empty, return empty result
    if (!topic && !language) {
        return res.json({
            'draw': request.draw,
            'recordsTotal': 0,
            'recordsFiltered': 0,
            'data': [],
            'error': '',
        });
    }

    // create query
    let keyword = '';
    // if topic is not empty, add topic to keyword
    if (topic) {
        keyword = 'topic:' + topic + '+';
    }
    // if language is not empty, add language to keyword
    if (language) {
        keyword += 'language:' + language;
    }

    url += '?q=' + keyword + '&page=' + page + '&per_page=' + limit;
    console.log(url);
    // call Github API
    return axios.get(url)
        .then(response => {
            // save search result to DB
            const result = SearchResultRepository.saveResult({
                topic,
                language,
                result: response.data
            });
            return res.json({
                'draw': request.draw,
                'recordsTotal': response.data.total_count,
                'recordsFiltered': response.data.total_count,
                'data': response.data.items,
                'error': '',
            });
        })
        .catch(error => {
            console.log(error);
            let errorMessage = error.message;
            // if response exists, get the message from the response data
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message;
            }
            // save the error message to DB
            const result = SearchResultRepository.saveResult({
                topic,
                language,
                result: error.response ? error.response.data : errorMessage
            });
            return res.json({
                'draw': request.draw,
                'recordsTotal': 0,
                'recordsFiltered': 0,
                'data': [],
                'error': errorMessage,
            });
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
        // get the search results from the database
        const results = await SearchResultRepository.getResults(req);
        return res.json({
            'draw': request.draw,
            'recordsTotal': results.length,
            'recordsFiltered': results.length,
            'data': results,
            'error': '',
        });
    } catch (error) {
        console.log(error);
        let errorMessage = error.message;
        // if response exists, get the message from the response data
        if (error.response && error.response.data) {
            errorMessage = error.response.data.message;
        }
        return res.json({
            'draw': request.draw,
            'recordsTotal': 0,
            'recordsFiltered': 0,
            'data': [],
            'error': errorMessage,
        });
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
        console.log(error);
        return res.render('admin_result', { result: null });
    }
}