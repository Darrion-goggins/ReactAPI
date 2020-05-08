const pool = require('../config/dbconfig');

class PrometheusDao {
    constructor() {
        this.pool = pool;
    }

    findByClass(req, res) {
        let sql = `SELECT c.id,c.class_name, 
        s.school_name as School_name,
        r.role_type as role
        FROM classes c
        JOIN spell_type s ON c.spell_access_school = s.id
        JOIN roles r ON c.class_role = r.id`;
        this.pool.query(sql, (err, rows) => {
            if (err) {
                res.json({
                    "err": true,
                    "message": err
                });
            };
            res.json(rows);
        });
    }
    
    findByRole(req, res) {
        let sql = 'SELECT * FROM roles';
        this.pool.query(sql, (err, rows) => {
            if (err) {
                res.json({
                    "err": true,
                    "message": err
                });
            };
            res.json(rows);
        });
    }

    findBySpell(req, res) {
        let sql = `SELECT sl.id,sl.spell_name,sl.mp_cost,sl.description, 
        st.school_name as spell_type 
        from spell_list sl
        JOIN spell_type st ON sl.spell_type_id = st.id
        ORDER BY sl.id ASC`;
        this.pool.query(sql, (err, rows) => {
            if (err) {
                res.json({
                    "err": true,
                    "message": err
                });
            };
            res.json(rows);
        });
    }

    findBySpellType(req, res) {
        let sql = `SELECT * FROM spell_type`;
        this.pool.query(sql, (err, rows) => {
            if (err) {
                res.json({
                    "err": true,
                    "message": err
                });
            };
            res.json(rows);
        });
    }

    create(req, res) {
        // Required Min Data
        if (!req.body.model || !req.body.vin) {
            res.json({
                "err": true,
                "message": 'Missing data'
            });
        };
        let fields = Object.keys(req.body);
        let values = Object.values(req.body);
 
        fields[fields.indexOf('condition')] = '`condition`';

        let sql = `INSERT INTO prometheus (${fields.join(',')}) 
        VALUES (${Array(values.length).fill('?').join(',')})`;
        
        this.pool.query(sql, values, (err, rows) => {
            if (err) {
                res.json({
                    "err": true,
                    "message": err
                });
            };
            if (rows.warning_count > 0) {
                this.pool.query('SHOW warnings', (err, rows) => {
                    res.json(rows);
                });
            }
            res.json(rows);
        });        
    }

    run (req, res, sql, params) {
        this.pool.query(sql, params,function (err, rows) {
            if (err) {
                res.json({
                    "err": true,
                    "message": err
                });
            };
            res.json(rows);
        });
    }
}

module.exports = PrometheusDao;