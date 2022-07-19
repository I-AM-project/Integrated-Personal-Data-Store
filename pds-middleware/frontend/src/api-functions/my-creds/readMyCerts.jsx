async function readMyCerts() {
    const res = await fetch('/api/readMyCerts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let data = await res.json()
    return data
}

export default readMyCerts