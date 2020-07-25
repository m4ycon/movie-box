import 'regenerator-runtime/runtime';

import request from 'supertest';
import app from '../../src/app';

describe('TMDB Controller', () => {
  it('should list images', async () => {
    const response = await request(app)
      .get('/movie/550/image_list')
      .then(res => res.body);

    expect(response.backdrops.length > 0 && response.posters.length > 0).toBe(
      true
    );
  });

  it('should not list images, invalid id', async () => {
    const response = await request(app).get('/movie/1/image_list');

    expect(response.status).toBe(400);
  });

  it('should get popular movies list', async () => {
    const response = await request(app)
      .get('/movie/popular')
      .then(res => res.body);

    expect(response.results.length > 0).toBe(true);
  });
});
