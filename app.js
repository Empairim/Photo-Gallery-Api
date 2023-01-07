const btnEl = document.getElementById('btn')
const errorMessage = document.getElementById('errorMessage')
const galleryEl = document.getElementById('gallery')


async function grabImage() {
    const inputValue = document.getElementById('input').value;

    if (inputValue > 10 || inputValue < 1) {
        errorMessage.style.display = 'block'
        errorMessage.innerText = "Number between 1 and 10"
        return
    }
    
    imgs = '';
    
    try {

        btnEl.style.display = 'none'
        const loading = `<img src="spinner.svg"/>`;
        galleryEl.innerHTML = loading;

        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=quQItcPxxslu11Ow7s3WyGK1hzCyosWor8DrbpR9aB8`).then((res) => res.json().then((data) => {
        if (data) {
            data.forEach(pic => {
                imgs += `<img src=${pic.urls.small} alt='image'/>`
                galleryEl.style.display = 'block'
                galleryEl.innerHTML = imgs;
                btnEl.style.display = 'block'
            });
        }
    }));

    errorMessage.style.display = 'none'
        
    } catch (error) {
        errorMessage.style.display = 'block'
        errorMessage.innerText = 'An error has occured, try again later'
        btnEl.style.display = 'block'
        
    }
// the try catch is to make sure if the api doesnt work you get an error message for that
// getting the error message and then using . style selects the style and the .display gets the display element and allows me to change the display none to display block if the if condition is met the return makes it so it wont go fetch the data it makes it end the function
   
// the Math.round math .random is so we cant collect random images from 1k pages rather than just a small handful or a prescribed page

// jason converts the info from unsplash to readable data and we get the input.value for input to know what number of photos the api is to look for and set display again so the error message is hidden if the data is properly fetched. we when use await the function used must be async instead of sync
}

btnEl.addEventListener('click', grabImage)