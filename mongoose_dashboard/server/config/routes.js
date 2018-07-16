
const user = require('./../controllers/users');
module.exports = function(app){
    app.get('/', (req, res)=> {
        user.index(req, res);
    })
    app.get('/mongooses/new', (req, res)=> {
        user.new(req, res);
    })
    app.post('/mongooses', (req, res)=>{
        user.create(req, res);
    })
    app.post('/mongooses/destroy/:id', (req, res)=>{
        user.destroy(req, res);
    })
    app.get('/mongooses/:id', (req, res)=> {
        user.show(req, res);
    })
    app.get('/mongooses/edit/:id', (req, res)=> {
        user.edit(req, res);
    })
    app.post('/mongooses/:id', (req, res)=>{
        user.update(req, res);
    })
}