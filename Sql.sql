CREATE USER "useradmin"@"localhost"identified BY "mypass";
grant all privileges on *.* to "useradmin"@"localhost";
flush privileges