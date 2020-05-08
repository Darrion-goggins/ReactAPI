const pool = require('../config/dbconfig');

/* SELECT c.id,c.class_name, 
s.school_name as School_name,
r.role_type as role
FROM classes c
JOIN spell_type s ON c.spell_access_school = s.id
JOIN roles r ON c.class_role = r.id */

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
        let sql = `SELECT * spell_list
        JOIN spell_type st ON spell_type_id = st.id`;
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
        let sql = 'SELECT * FROM spell_type';
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

    updateById(req, res) {
        let fields = Object.keys(req.body);
        fields[fields.indexOf('condition')] = '`condition`';
        let values = Object.values(req.body);

        if (!req.params.id) {
            res.json({
                "err": true,
                "message": 'Missing ID'
            });
        } else if (fields.length == 0) {
            res.json({
                "err": true,
                "message": 'No fields to update'
            });
        }
        
        let sql = `UPDATE prometheus SET ${fields.join('=?,')}=? WHERE id = ?`;
        this.pool.query(sql, [...values, req.params.id], (err, rows) => {
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

    deleteById(req, res, id) {
        let sql = "UPDATE prometheus set deleted_at = NOW() WHERE id = ?";
        this.pool.query(sql, [id], (err, rows) => {
            if (err) {
                res.json({
                    "err": true,
                    "message": err
                });
            };
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