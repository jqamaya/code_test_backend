const SearchResultRepository = require('../src/repositories/SearchResultRepository');

describe('Save Search Result', () => {
  it('should save result with complete data', async () => {
    const res = SearchResultRepository.saveResult({
      topic: 'tetris',
      language: 'assembly',
      result: { items: [], total_count: 0 }
    });
    await expect(res).resolves.toBeTruthy();
  });

  it('should save result with topic and result only', async () => {
    const res = SearchResultRepository.saveResult({
      topic: 'tetris',
      result: { items: [], total_count: 0 }
    });
    await expect(res).resolves.toBeTruthy();
  });

  it('should save result with language and result only', async () => {
    const res = SearchResultRepository.saveResult({
      language: 'assembly',
      result: { items: [], total_count: 0 }
    });
    await expect(res).resolves.toBeTruthy();
  });

  it('should save result with result only', async () => {
    const res = SearchResultRepository.saveResult({
      result: { items: [], total_count: 0 }
    });
    await expect(res).resolves.toBeTruthy();
  });

  it('should save result with empty result', async () => {
    const res = SearchResultRepository.saveResult({
      result: {}
    });
    await expect(res).resolves.toBeTruthy();
  });
});

describe('Get Search Result', () => {
  it('gets search results', async () => {
    const res = await SearchResultRepository.getResults({});
    expect(res.length).toBeGreaterThan(0);
  });
  
  it('gets search result details', async () => {
    const res = await SearchResultRepository.getResultDetails(1);
    expect(res).not.toBeNull();
    expect(res.topic).toBe('tetris');
    expect(res.language).toBe('assembly');
    expect(res.result).not.toBeNull();
  });

  it('gets null search result', async () => {
    const res = await SearchResultRepository.getResultDetails(100);
    expect(res).toBeNull();
  });
});