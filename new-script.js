function createCard(gridDiv, cardData) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('onclick', `location.href="${cardData.url}"`);
    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img');
    cardImg.setAttribute('src', cardData.img);
    const cardTitle = document.createElement('h4');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = cardData.title;

    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardImg);
    gridDiv.appendChild(cardDiv);
    return cardDiv;
};

/*const cardData = {
    title: 'title',
    url: 'url',
    img: 'imgStr'
}*/

$.getJSON('https://www.reddit.com/r/persoonlijkebonus/.json', function(data) {
    const posts = data['data']['children'];
    const gridDiv = document.getElementById('gridDiv');
    cards = [];
    for (let i = 0; i < posts.length; i++) {
        if (!['MEDEDELING', 'VERLOPEN', 'OVERIG', 'VRAAG'].includes(posts[i]['data']['link_flair_text'])) {
            try {
                let imgMeta = posts[i]['data']['media_metadata'];
                let stripImg = imgMeta[Object.keys(imgMeta)[0]]['s']['u'].replace(/amp;/g, '')
                var cardData = {
                    title: posts[i]['data']['title'],
                    url: `https://www.reddit.com/r/persoonlijkebonus/comments/${posts[i]["data"]["id"]}`,
                    img: stripImg
                };
                console.log(cardData.img);
            } catch {            
            var cardData = {
                title: posts[i]['data']['title'],
                url: `https://www.reddit.com/r/persoonlijkebonus/comments/${posts[i]["data"]["id"]}`
            };
        };
        cards.push(createCard(gridDiv, cardData));
        };
    };
    document.getElementById('getData').remove();
});