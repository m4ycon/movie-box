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
      .get('/movies/popular')
      .then(res => res.body);

    expect(response.results.length > 0).toBe(true);
  });

  it('should search movies', async () => {
    const response = await request(app)
      .get('/movies/search?movie=joker')
      .then(res => res.body);

    expect(response.results.length > 0).toBe(true);
  });

  it("should get movie's details", async () => {
    const response = await request(app)
      .get('/movie/550')
      .then(res => res.body);

    expect(response.id).toBe(550);
  });

  it("should not get movie's details", async () => {
    const response = await request(app).get('/movie/1');

    expect(response.status).toBe(400);
  });

  it('should get recommended movies', async () => {
    const response = await request(app)
      .get('/movies/recommended')
      .then(res => res.body);

    expect(response.results.length > 0).toBe(true);
  });
});
