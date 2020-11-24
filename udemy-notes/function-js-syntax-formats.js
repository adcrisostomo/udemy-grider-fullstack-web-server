// write a function to retrieve a blob of json
// make an ajax request! Use the 'fetch' function
// http://rallycoding.herokuapp.com/api/music_albums

// then-chain format
// function fetchAlbums() {
//     fetch('http://rallycoding.herokuapp.com/api/music_albums')
//         .then(res => {
//             res.json()
//         })
//         .then(json => console.log('json:', json))
// }
 
// async-await format
// async function fetchAlbums() {
//     // make code into synchronous nature
//     const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
//     const json = await res.json()

//     console.log('json:', json)
// }

// async-await arrow function format
const fetchAlbums = async () => {
    // make code into synchronous nature
    const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json()

    console.log('json:', json)
}


fetchAlbums()