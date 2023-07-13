const KEY = 'niljmp81bl893d0g3ux19f8056ty2zmbtfpxz1p9';

const getData = async ( city ) => {
    const base = 'https://www.meteosource.com/api/v1/free/point?place_id'
    const query = `=${city}&sections=all&timezone=UTC&language=en&units=metric&key=${KEY}`
    const req = await fetch(base + query)
    const data = await req.json()
    return data
}

// getData('samarkand').then((data) => console.log(data))







