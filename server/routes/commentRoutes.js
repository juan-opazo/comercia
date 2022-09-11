const CommentHandler = require('../services/commentHandler');

module.exports = (app) => {
    app.post('/api/new_comment', async (req, res) => {
        console.log(req.body);
        const comment = await new CommentHandler(req.body).insert()
        res.send(comment);
    });
}