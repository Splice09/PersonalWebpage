//Connect to DATABASE_URL (heroku postgreSQL database)
var connectionString = "postgres://xppbneritkkeqc:ORqdupmaW39VMbGad0hzgZVC-i@ec2-54-225-201-25.compute-1.amazonaws.com:5432:/DATABASE_URL"
pg.connect(connectionString, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client
        //change code to match the schema and table name in my database
        .query('SELECT projects.pastProjects FROM projects.pastProjects;')
        .on('row', function(row) {
            console.log(JSON.stringify(row));
        });
});
