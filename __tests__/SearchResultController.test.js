const SearchResultController = require('../src/controllers/SearchResultController');
const {mockRequest, mockResponse} = require('../util/Interceptor');
const SearchResultRepository = require('../src/repositories/SearchResultRepository');
const axios = require('axios');

jest.mock('axios');

const items = [
  {
    "id": 1,
    "name": "react-tetris",
    "full_name": "chvin/react-tetris",
    "html_url": "https://github.com/chvin/react-tetris",
    "description": "Use React, Redux, Immutable to code Tetris. 🎮",
  }
];

describe('Get Repositories', () => {
  it('should get repositories with topic and language', async () => {
    const data = {
      total_count: 1,
      incomplete_results: false,
      items: items
    };
    axios.get.mockResolvedValue({data});

    let req = mockRequest();
    req.body.topic = 'tetris';
    req.body.language = 'assembly';
    req.body.start = 0;
    req.body.length = 20;
    req.body.draw = 1;
    const res = mockResponse();

    await SearchResultController.search(req, res);
    const responseData = {
      'draw': 1,
      'recordsTotal': data.total_count,
      'recordsFiltered': data.total_count,
      'data': data.items,
      'error': '',
    }
    expect(res.json).toHaveBeenCalledWith(responseData);
  });

  it('should get repositories with topic only', async () => {
    const data = {
      total_count: 1,
      incomplete_results: false,
      items: items
    };
    axios.get.mockResolvedValue({data});

    let req = mockRequest();
    req.body.topic = 'tetris';
    req.body.start = 0;
    req.body.length = 20;
    req.body.draw = 1;
    const res = mockResponse();

    await SearchResultController.search(req, res);
    const responseData = {
      'draw': 1,
      'recordsTotal': data.total_count,
      'recordsFiltered': data.total_count,
      'data': data.items,
      'error': '',
    }
    expect(res.json).toHaveBeenCalledWith(responseData);
  });

  it('should get repositories with language only', async () => {
    const data = {
      total_count: 1,
      incomplete_results: false,
      items: items
    };
    axios.get.mockResolvedValue({data});

    let req = mockRequest();
    req.body.language = 'assembly';
    req.body.start = 0;
    req.body.length = 20;
    req.body.draw = 1;
    const res = mockResponse();

    await SearchResultController.search(req, res);
    const responseData = {
      'draw': 1,
      'recordsTotal': data.total_count,
      'recordsFiltered': data.total_count,
      'data': data.items,
      'error': '',
    }
    expect(res.json).toHaveBeenCalledWith(responseData);
  });

  it('should return an error with pagination', async () => {
    const data = {
      "message": "Only the first 1000 search results are available",
      "documentation_url": "https://developer.github.com/v3/search/"
    };
    axios.get.mockRejectedValue({
      response: {
        data
      }
    });

    let req = mockRequest();
    req.body.language = 'assembly';
    req.body.start = 140;
    req.body.length = 20;
    req.body.draw = 1;
    const res = mockResponse();

    await SearchResultController.search(req, res);
    const responseData = {
      'draw': 1,
      'recordsTotal': 0,
      'recordsFiltered': 0,
      'data': [],
      'error': data.message,
    }
    expect(res.json).toHaveBeenCalledWith(responseData);
  });
});

describe('Get Results', () => {
  it('should get results', async () => {
    const results = [
      {
        id: 1,
        topic: 'tetris',
        language: 'assembly',
        result: {
          items: [],
          total_count: 0
        }
      }
    ]
    let req = mockRequest();
    req.body.length = 20;
    req.body.draw = 1;
    const res = mockResponse();
    const mock = jest.spyOn(SearchResultRepository, 'getResults');
    mock.mockResolvedValue(results);

    await SearchResultController.getResults(req, res);
    const responseData = {
      'draw': 1,
      'recordsTotal': results.length,
      'recordsFiltered': results.length,
      'data': results,
      'error': '',
    }
    expect(res.json).toHaveBeenCalledWith(responseData);
  });

  it('should get empty result', async () => {
    const results = [];
    let req = mockRequest();
    req.body.length = 20;
    req.body.draw = 1;
    const res = mockResponse();
    const mock = jest.spyOn(SearchResultRepository, 'getResults');
    mock.mockResolvedValue([]);

    await SearchResultController.getResults(req, res);
    const responseData = {
      'draw': 1,
      'recordsTotal': results.length,
      'recordsFiltered': results.length,
      'data': results,
      'error': '',
    }
    expect(res.json).toHaveBeenCalledWith(responseData);
  });

  it('should return error message for search results', async () => {
    const results = [];
    const error = {
      message: "DB exception"
    }
    let req = mockRequest();
    req.body.length = 20;
    req.body.draw = 1;
    const res = mockResponse();
    const mock = jest.spyOn(SearchResultRepository, 'getResults');
    mock.mockRejectedValue(error);

    await SearchResultController.getResults(req, res);
    const responseData = {
      'draw': 1,
      'recordsTotal': results.length,
      'recordsFiltered': results.length,
      'data': results,
      'error': error.message,
    }
    expect(res.json).toHaveBeenCalledWith(responseData);
  });
});