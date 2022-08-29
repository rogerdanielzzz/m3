const commands = require('./commands/index.js');    

function done (algo){
    process.stdout.write(algo);
    process.stdout.write("\nprompt > ");
}



process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
    var cmd = data.toString().trim(); // remueve la nueva línea
    if (cmd === "date") {
        done(Date());
    }
    if (cmd === "pwd") {
        done(process.cwd());
    }

 
});