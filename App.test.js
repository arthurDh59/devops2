const request = require('supertest');
const app = require('./server');

let server;

beforeAll(() => {
    server = app.listen(0); 
});

afterAll(() => {
    server.close(); 
});

describe("TODOLIST API TESTS", () => {
    it('Devrait retourner une liste vide au départ', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toEqual([]);
    });

    it('Devrait ajouter une nouvelle tâche', async () => {
        const response = await request(app)
            .post('/add-task')
            .send({ task: { id: 0, text: 'Tâche de test' } });
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toContainEqual({ id: 0, text: 'Tâche de test' });
    });

    it('Devrait supprimer', async () => {
        // await request(app).post('/add-task').send({ task: { id: 1, text: 'Tâche à supprimer' } });
        const response = await request(app).delete('/').query({id:0});
        expect(response.statusCode).toBe(200);
        expect(response.body.tasks).toEqual([]);
    });

    it('Devrait renvoyer une 400 en cas de suppression d\'id inconnu',async () => {
        const response = await request(app).delete('/').query({id:5});
        expect(response.statusCode).toBe(400);
    });
});