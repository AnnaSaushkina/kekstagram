// Получаем адрес изображения из API
async function getResponse() {
    let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    let imageJSON = await response.json()
    return imageJSON
}

async function createImageElement() {
    let grid = document.getElementById('imageGrid');
    
    // Пытаемся получить сохраненные данные из localStorage
    let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    
    // Если данных нет, получаем новые
    if (savedImages.length === 0) {
        savedImages = await getResponse();
        // Сохраняем полученные данные в localStorage
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
    }

    // Создаем элементы используя сохраненные данные
    savedImages.forEach(imageData => {
        let imageItem = document.createElement('div');
        let img = document.createElement('img');
        
        imageItem.className = 'image-grid__item';
        img.src = imageData.url;
        
        imageItem.appendChild(img);
        grid.appendChild(imageItem);
    });
}

createImageElement();

