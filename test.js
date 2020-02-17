const request = require('request')

token=""

request.post('http://localhost:3000/users?name=test&password=lalala', {
	}, (error, res, body) => {
	  if (error) {
	    console.error(error)
	    return
	  }
	  console.log(`statusCode: ${res.statusCode}`)
	  console.log(body)


  request.post('http://localhost:3000/users/auth?name=test&password=lalala', {
	}, (error, res, body) => {
	  if (error) {
	    console.error(error)
	    return
	  }
	  console.log("")
	  console.log(`statusCode: ${res.statusCode}`)
	  console.log(body)
	  token=JSON.parse(body).token

	  request.post('http://localhost:3000/posts?title=test&text=test', {
	    headers:{"X-Token": token}
	    }, (error, res, body) => {
	      if (error) {
	        console.error(error)
	        return
	      }
        console.log("")
	    console.log(`statusCode: ${res.statusCode}`)
	    console.log(body)
		request.get('http://localhost:3000/posts', {}, (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
       console.log("")
       console.log(`statusCode: ${res.statusCode}`)
	   console.log(body)
       post_id=JSON.parse(body)["posts"][0]["id"]


	   console.log("")
	/*	url='http://localhost:3000/posts/'.concat(post_id,"/")
		console.log(url)

	   request.get(url, {}, (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
		})
	    console.log(body)*/
		
	   })

	})

  })
})



