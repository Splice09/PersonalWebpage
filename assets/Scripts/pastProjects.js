//Connect to DATABASE_URL (heroku postgreSQL database)
pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client
        //change code to match the schema and table name in my database
        .query('SELECT projects.pastProjects FROM projects.pastProjects;')
        .on('row', function(row) {
            console.log(JSON.stringify(row));
        });
});
