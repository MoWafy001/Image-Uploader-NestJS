const image_containers = document.querySelectorAll('.image-container')

image_containers.forEach(contianer => {
    const inp = contianer.querySelector('input')
    const update_btn = contianer.querySelector('.btn.update')

    update_btn.addEventListener('click', async ()=>{

        const data = {
            title: inp.value
        }

        await fetch(`/images/${update_btn.dataset.imgId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        })
        window.location.reload()
    })

})