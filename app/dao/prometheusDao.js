const pool = require('../config/dbconfig');

class PrometheusDao {
    constructor() {
        this.pool = pool;
    }

    findSingleClass(req, res, id) {
        let sql = `SELECT c.id,c.class_name, 
        s.school_name as School_name,
        r.role_type as role,
        c.description as lore
        FROM classes c
        JOIN spell_type s ON c.spell_access_school = s.id
        JOIN roles r ON c.class_role = r.id WHERE c.id = ?`;
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

    findBySpell(req, res, school_name) {
        let sql = `SELECT sl.id,sl.spell_name,sl.mp_cost,sl.description, 
        st.school_name as spell_type 
        from spell_list sl
        JOIN spell_type st ON sl.spell_type_id = st.id
        WHERE st.school_name = ?`;
        this.pool.query(sql, [school_name], (err, rows) => {
            if (err) {
                res.json({
                    "err": true,
                    "message": err
                });
            };
            res.json(rows);
        });
    }

    findDPS(req, res, id) {
        let sql = `SELECT c.id,c.class_name, 
        s.school_name as School_name,
        r.role_type as role
        FROM classes c
        JOIN spell_type s ON c.spell_access_school = s.id
        JOIN roles r ON c.class_role = r.id WHERE r.id= 2`;
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