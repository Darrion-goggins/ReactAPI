const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./app/routes/router');

const port = 3040;
app.listen(port, () => {
    console.log(`Server on port: ${port}`); 
});

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// ALL ROUTES
app.get('/', (req, res) => {
    res.json({
        "All Classes": 'http://localhost:3040/api/classes',
        "All Roles": 'http://localhost:3040/api/roles',
        "All Spells": 'http://localhost:3040/api/spell_list',
        "All Spell Schools": 'http://localhost:3040/api/spell_type'
    });
});

app.post('/post', (req, res) => {
    console.log(req.body);
    
    res.json(req.body);
});

app.use('/api', router);