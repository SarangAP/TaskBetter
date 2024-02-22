# How to setup the initial database
1. Follow [these instructions](https://dev.mysql.com/doc/mysql-getting-started/en/) to install and setup MySQL on your computer
2. Run `mysql -u root -p` and enter your MySQL password
3. Run `SOURCE <full path to your repo directory>/backend/taskBetter.sql;`
   - If for some reason you already have a database called 'task_better', this WILL delete it. 
