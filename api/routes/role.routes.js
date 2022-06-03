const express = require('express');
const { getAllroles, addrole,getOnerole,deleteOnerole,updaterole } = require('../controllers/role.controller');

const roleRouter = express.Router()


roleRouter.get('/',getAllroles);
roleRouter.post('/add',addrole);
roleRouter.get('/:id',getOnerole);
roleRouter.delete('/:id',deleteOnerole);
roleRouter.put('/:id',updaterole);


module.exports = roleRouter