// Create a promise chain where the function is called for for each of the players: Joe, Caroline and Sabrina

// Log out the resolved value for each promise and handle any promise rejections in the chain.

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

const players = ["Tina", "Jorge", "Julien"];


async function getResults(){
    try{
        const a = await luckyDraw(players[0]);
        console.log(a)
    }catch(error){
        console.log(error);
    }
    try{
        const b = await luckyDraw(players[1]);
        console.log(b)
    }catch(error){
        console.log(error);
    }
    try{
        const c = await luckyDraw(players[2]);
        console.log(c)
    }catch(error){
        console.log(error);
    }
}

getResults();
