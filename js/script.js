const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')


const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

const close = document.querySelector('.close')
const shiny = document.querySelector('.shiny')
const back = document.querySelector('.back')

let searchPokemon = 1


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data
    }

};

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    pokemonImage.src = ''

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'not found'
        pokemonNumber.innerHTML = ':/'
        pokemonImage.src = ''
    }

    if (searchPokemon >= 650) {
        pokemonImage.src = data['sprites']['front_default']
        pokemonImage.style.height = '25%'
        pokemonImage.style.bottom = '52%'
    }


}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

close.addEventListener('click', () => {
    alert('Easter Egg!')
})

shiny.addEventListener('change', () => {
    if (shiny.checked) {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${searchPokemon}.gif`
    } else {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${searchPokemon}.gif`
    }

    if (shiny.checked, searchPokemon >= 650) {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${searchPokemon}.png`
    }
})

back.addEventListener('change', () => {

    if (back.checked) {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${searchPokemon}.gif`
    } else {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${searchPokemon}.gif`
    }
    
    if (searchPokemon >= 650) {

        if (back.checked) {
            pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${searchPokemon}.png`

        } else {
            pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchPokemon}.png`
        }
    }

})



renderPokemon(searchPokemon)