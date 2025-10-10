const cron = require('node-cron');

cron.schedule("* * * * * *", () => {
    console.log("Hello World, "+ new Date());
});

/*
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *

- every star matter a lot just second option star is optional,
- so dont leave other stars
- * means every
- so default => (*) every second, every minute, every hour, every day, every month, every week.
- and if you find this explation not complicated use a website -:
" crontab guru"
*/