// Seleciona o container onde os vídeos vão ser inseridos
const videoCardContainer = document.querySelector('.video-container');

// Chave da API e URLs base para requisições
let api_key = "sua_chave";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


// Faz requisição para buscar os vídeos mais populares do YouTube no Brasil
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 16,
    regionCode: 'BR'
}))
.then(res => res.json())
.then(data => {
    // Para cada vídeo, busca o ícone do canal
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

// Função para buscar o ícone do canal com base no ID do canal
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
         // Adiciona a thumbnail do canal ao objeto do vídeo
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

// Cria e adiciona um card de vídeo ao HTML
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// Barra de busca

// Seleciona os elementos da barra de busca
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

// URL base para busca no YouTube
let searchLink = "https://www.youtube.com/results?search_query=";

// Quando o botão for clicado, redireciona para a busca no YouTube
searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})