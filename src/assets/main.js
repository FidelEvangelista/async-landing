

const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCGCvz1jjE9fx6XOPtPEOBxQ&part=snippet%2Cid&order=date&maxResults=9';
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCBVjMGOIkavEAhyqpxJ73Dw&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '036e491edfmsh7ebdd1f39d93f89p187903jsn6fffdf8ca7fe',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

//Esta funcion se llama a si misma
//`` = Template String(fragmento de codigo HTML que se incrusta por medio de JS)
(async () =>{
try {
    const videos  = await fetchData(API);
    let view = `
    ${videos.items.map(video => `
    <div class="group relative">
    <div
      class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
      <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <h3 class="text-sm text-gray-700">
        <span aria-hidden="true" class="absolute inset-0"></span>
        ${video.snippet.title}
      </h3>
    </div>
  </div>
    `).slice(0,4).join('')}
  
    `;
    content.innerHTML = view;
       Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
} catch (error) {
    console.log(error);
    // Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Something went wrong!",
    //     footer: '<a href="#">Why do I have this issue?</a>'
    //   });
}
})();
