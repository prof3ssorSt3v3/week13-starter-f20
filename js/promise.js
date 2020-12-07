let p = new Promise((ftw, wtf) => {
  //this function must call ftw or wtf
  //OR it will forever remain "pending"
});

p.then((res) => {
  //res is the value that was `resolved` from the original Promise
  //we can return a value from here
  //OR we can return a new Promise
  console.log('NEVER see this');
})
  .then((res) => {
    //res is the value returned from the previous `then`
  })
  .then((res) => {
    //res is the value returned from the previous `then`
  })
  .catch((err) => {
    //this gets called if the original promise is `rejected`
    //OR if a Promise inside any `then` is `rejected`
    //OR an error is thrown from any of the `then` methods
  });
console.log(p);

//FETCH returns a Promise object.
//that is why we use `then` with `fetch()`
//Response reference - https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
//Headers reference - https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers

let fehtsh = function (url) {
  //let's pretend to get the json data from url
  let data = {
    results: [
      { name: 'steve', message: 'hola' },
      { name: 'alex', message: 'oi' },
      { name: 'devon', message: 'bonjour' },
      { name: 'riley', message: 'hej' },
    ],
  };
  let p = new Promise((resolve, reject) => {
    let body = JSON.stringify(data);
    let responses = [
      {
        status: 200,
        statusText: 'Hellz ya!',
        body: body,
        headers: new Headers({ 'content-type': 'application/json' }),
      },
      {
        status: 404,
        statusText: 'Where did it go?',
        body: null,
        headers: new Headers(),
      },
      {
        status: 403,
        statusText: 'You NOT allowed to see it.',
        body: null,
        headers: new Headers(),
      },
    ];
    let init = responses[Math.floor(Math.random() * responses.length)];
    let response = new Response(init.body, {
      status: init.status,
      statusText: init.statusText,
      headers: init.headers,
    });
    setTimeout(resolve, 2000, response);
    //call resolve after 2 seconds and pass it the response object
  });
  return p;
};

console.log('Call fehtsh');
fehtsh('https://www.example.com/')
  .then((resp) => {
    console.log(`response received ${resp.status}`);
    if (resp.status === 200) {
      console.log(resp.statusText);
      return resp.json();
    } else {
      throw new Error(`Bad Response ${resp.status} ${resp.statusText}`);
    }
  })
  .then((data) => {
    //data is the object created from the JSON string inside the body
    //property inside the Response object
    let pre = document.querySelector('pre');
    pre.textContent = JSON.stringify(data.results, '\t', 2);
  })
  .catch((err) => {
    console.error(err);
    let pre = document.querySelector('pre');
    pre.textContent = err.message;
  });
