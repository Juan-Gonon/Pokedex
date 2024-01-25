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


    

    getAPI(genres)
   
    //'https://pokeapi.co/api/v2/'

  
    // console.log(gen)
})

function getAPI(genres){
    let numero = 1;
    let toggle = false;


    const filters = document.getElementById('filters');
    const btnIcon = document.getElementById('btnicono');
    const title = document.getElementById('title');
    let gen = '';

    for(let i=0; i<genres.length; i++){
        // console.log(genres[i])
        gen += `<input type="radio" class="radio-gens" id=${genres[i]} name="generation" value=${i+1} checked>
                <label for=${genres[i]} class="label-gens">${genres[i]}</label>`
    }

    filters.innerHTML = gen;

    getPokemon(numero)
    btnIcon.addEventListener('click',()=>{
        getPokemon(numero, toggle)
    })

    filters.addEventListener('click', (e)=>{
        let target = e.target.type;
        let valor = e.target.value;
        // console.log(e.target.id)
        if(target == 'radio'){
            getPokemon(valor, toggle);
            title.innerText = 'Pokemon ' + e.target.id;
            
        }
    })




 
   
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

function getPokemon(numero, toggle){
    let endpoint = `https://pokeapi.co/api/v2/generation/${numero}`;
    const container = document.getElementById('container');
    // let Pokemon = [];

        //#region Observador de img task
        const imgOptions = {};
        const imgObserver = new IntersectionObserver((entry, observer)=>{
            entry.forEach((i)=>{
                if(!i.isIntersecting) return;
                const img = i.target;
                let dataImage = img.getAttribute("data-image");
                img.src = dataImage;
                observer.unobserve(img);
            })
        }, imgOptions)
    //#endregion

    container.innerHTML = '';
    
    fetchPokemon(endpoint).then((data)=>{

        for(let j=0; j<data.length; j++){
            data[j].nr = orderNumber(data[j].url)
        }
        data.sort((a,b)=> a.nr - b.nr)

        data.forEach((i)=>{
            // console.log(i)

            let num3Decimales = orderNumber(i.url);
            const divItem = document.createElement('li');
            const img = new Image();

            if(num3Decimales < 10){
                num3Decimales = "00" + num3Decimales;
            }else if(num3Decimales < 100){
                num3Decimales = "0" + num3Decimales;
            }

            // console.log(num3Decimales)
            

            const toggleUrl = toggle ? "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" : "https://www.serebii.net/pokemongo/pokemon/";

            const urlImage = `${toggleUrl}${num3Decimales}.png`

            img.setAttribute('src', 'https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif');
            img.setAttribute('data-image', urlImage);
            img.setAttribute('class', 'pokeimage');
            img.setAttribute('alt', i.name)
            divItem.classList.add('item');
            divItem.innerHTML = `<div> ${i.nr}-${i.name}</div> `

            divItem.appendChild(img)
            container.appendChild(divItem)
            imgObserver.observe(img)
        })

    });

   

}