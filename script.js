const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const clima = document.querySelector('.clima');
const climaDetalhes = document.querySelector('.clima-detalhes');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    //https://openweathermap.org/guide
    const APIKey = '53a47abfeaad8555655295ed351c3dd7';
    const city = document.querySelector('.search input').value;

    if (city === '') {
        return
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        if (json.cod === '404'){
            container.style.height = '400px';
            clima.style.display = 'none';
            climaDetalhes.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const img = document.querySelector('.clima img');
        const temperatura = document.querySelector('.clima .temperatura');
        const descricao = document.querySelector('.clima .descricao');
        const umidade = document.querySelector('.clima-detalhes .umidade span');
        const vento = document.querySelector('.clima-detalhes .vento span');

        switch(json.weather[0].main){
            case 'Clear':
                img.src = 'assets/clear.png'
                break;
            case 'Rain':
                img.src = 'assets/rain.png';
                break;
            case 'Snow':
                img.src = 'assets/snow.png';
                break;
            case 'Clouds':
                img.src = 'assets/cloud.png';
                break;
            case 'Haze':
                img.src = 'assets/mist.png';
                break;
            default:
                img.src = '';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descricao.innerHTML = `${json.weather[0].description}`;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        clima.style.display = '';
        climaDetalhes.style.display = '';
        clima.classList.add('fadeIn');
        climaDetalhes.classList.add('fadeIn');
        container.style.height = '590px';
    })
})