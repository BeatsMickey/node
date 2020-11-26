const models = require('../models');

exports.getTasks = (req, res, next) => {
    models.Task.getTasks().then(([rows, fieldData]) => {
        //res.render('tasks', { tasks: rows });
        res.send({ status: 'ok', rows: rows});
        })
}

exports.createTask = (req, res, next) => {
    models.Task.createTask(req.body).then(([rows, fieldData]) => {
        models.Task.getTaskById(rows.insertId).then(([rows, fieldData]) => {
            res.send({ status: 'ok', task: rows[0]});
        });

    })
}

exports.updateTaskDescription = (req, res, next) => {
    models.Task.updateTask(req.body.taskId, req.body.description).then(([rows, fieldData]) => {
        res.send({ status: 'ok' });
    })
}

exports.deleteTask = (req, res, next) => {
    models.Task.deleteTask(req.body.taskId).then(([rows, fieldData]) => {
        res.send({ status: 'ok' });
    })
}