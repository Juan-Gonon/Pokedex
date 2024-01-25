document.addEventListener('DOMContentLoaded', ()=>{
    let genres = [
        "generation-1",
        "generation-2",
        "generation-3",
        "generation-4",
        "generation-5",
        "generation-6",
        "generation-7",
    ];

    getAPI()
   
    //'https://pokeapi.co/api/v2/'


    const filters = document.getElementById('filters');
    let gen = '';

    for(let i=0; i<genres.length; i++){
        // console.log(genres[i])
        gen += `<input type="radio" class="radio-gens" id=${genres[i]} name="generation" value=${i+1} checked>
                <label for=${genres[i]} class="label-gens">${genres[i]}</label>`
    }

    filters.innerHTML = gen;



    // console.log(gen)
    
})

function getAPI(){
    getPokemon(1)
}


const fetchPokemon = (urlAPI) => {
    // console.log(urlAPI)
    return fetch(urlAPI, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        (res) => {
            if (res.status !== 200) {
                throw new Error('Error en fetch Pokemon');
            } else {
                return res.json().then((respuesta) => {
                    // return respuesta['pokemon-species'];
                    return respuesta['pokemon_species']
                });
            }
        }
    ).catch((error) => {
        console.log(error);
    });
}

//https://pokeapi.co/api/v2/generation/${numero}

function orderNumber(str){
    let mySubstring = str.substring(
        str.lastIndexOf("s/")+2, str.lastIndexOf("/")
    )

    return mySubstring
}

function getPokemon(numero){
    let endpoint = `https://pokeapi.co/api/v2/generation/${numero}`;
    const container = document.getElementById('container');
    // let Pokemon = [];

    container.innerHTML = '';
    
    fetchPokemon(endpoint).then((data)=>{

        for(let j=0; j<data.length; j++){
            data[j].nr = orderNumber(data[j].url)
        }
        data.sort((a,b)=> a.nr - b.nr)

        data.forEach((i)=>{
            console.log(i)

            const divItem = document.createElement('li');

            divItem.classList.add('item');
            divItem.innerHTML = `<div> ${i.nr}-${i.name}</div> `

            container.appendChild(divItem)
        })

    });

   

}