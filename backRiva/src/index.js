import  app  from './app.js';

async function main(){
    try {
        console.log("go");
        app.listen(3001);
    } catch (error) {
        console.error("no funca")
    }
}

main();