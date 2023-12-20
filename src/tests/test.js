import assert from 'assert';
import app from '../app.js';

describe('App', () => {
    it('should start the application', () => {
        // Vous pouvez ajouter d'autres tests ici selon les fonctionnalités de votre application
        assert.strictEqual(typeof app, 'function');
    });
});