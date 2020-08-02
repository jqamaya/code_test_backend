const SearchResultRepository = require('../src/repositories/SearchResultRepository');
let SearchResult = require('../db/models').search_results;

describe('Save Search Result', () => {
  it('should save result with complete data', async () => {
    const data = {
      topic: 'tetris',
      language: 'assembly',
      result: { items: [], total_count: 0 }
    };
    const mock = jest.spyOn(SearchResult, 'create');
    mock.mockResolvedValue(data);

    const res = SearchResultRepository.saveResult(data);
    await expect(res).resolves.toBeTruthy();
  });

  it('should save result with topic and result only', async () => {
    const data = {
      topic: 'tetris',
      result: { items: [], total_count: 0 }
    };
    const mock = jest.spyOn(SearchResult, 'create');
    mock.mockResolvedValue(data);

    const res = SearchResultRepository.saveResult(data);
    await expect(res).resolves.toBeTruthy();
  });

  it('should save result with language and result only', async () => {
    const data = {
      language: 'assembly',
      result: { items: [], total_count: 0 }
    };
    const mock = jest.spyOn(SearchResult, 'create');
    mock.mockResolvedValue(data);

    const res = SearchResultRepository.saveResult(data);
    await expect(res).resolves.toBeTruthy();
  });

  it('should save result with result only', async () => {
    const data = {
      result: { items: [], total_count: 0 }
    };
    const mock = jest.spyOn(SearchResult, 'create');
    mock.mockResolvedValue(data);

    const res = SearchResultRepository.saveResult(data);
    await expect(res).resolves.toBeTruthy();
  });

  it('should save result with empty result', async () => {
    const data = {
      result: {}
    };
    const mock = jest.spyOn(SearchResult, 'create');
    mock.mockResolvedValue(data);

    const res = SearchResultRepository.saveResult(data);
    await expect(res).resolves.toBeTruthy();
  });
});

describe('Get Search Result', () => {
  it('gets search results', async () => {
    const results = [{
      topic: 'tetris',
      language: 'assembly',
      result: { items: [], total_count: 0 }
    }];
    const mock = jest.spyOn(SearchResult, 'findAll');
    mock.mockResolvedValue(results);

    const res = await SearchResultRepository.getResults({});
    expect(res.length).toBeGreaterThan(0);
    expect(res).toBe(results);
  });
  
  it('gets search result details', async () => {
    const result = {
      topic: 'tetris',
      language: 'assembly',
      result: { items: [], total_count: 0 }
    };
    const mock = jest.spyOn(SearchResult, 'findByPk');
    mock.mockResolvedValue(result);

    const res = await SearchResultRepository.getResultDetails(1);
    expect(res).not.toBeNull();
    expect(res.topic).toBe('tetris');
    expect(res.language).toBe('assembly');
    expect(res.result).not.toBeNull();
  });

  it('gets null search result', async () => {
    const result = null;
    const mock = jest.spyOn(SearchResult, 'findByPk');
    mock.mockResolvedValue(result);

    const res = await SearchResultRepository.getResultDetails(100);
    expect(res).toBeNull();
  });
});