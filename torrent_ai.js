const axios = require('axios');
const brain = require("brain.js");

const net = new brain.NeuralNetwork();
let arr = [];
let arr1 = [];
let arr2 = [];


let movies_details = 'https://yts.mx/api/v2/movie_details.json?movie_id=19437'

//let movie_list = 'https://yts.mx/api/v2/list_movies.json?limit=5'
let movie_list = 'https://yts.mx/api/v2/list_movies.json?rating[gt]=6'

// Make a request for a user with a given ID
axios.get(movie_list)
    .then(function (response) {
        // handle success
        //console.log(response);
        //console.log(response.data.data.movies);

        let movies_length = response.data.data.movies.length


        for (let i = 0; i < movies_length; i++) {
            let movies = response.data.data.movies[i].title

            let sum = response.data.data.movies[i].rating

            if (sum >= 6 && sum <= 7) {
                sum = 1 / 4
            } else if (sum >= 7 && sum <= 8) {
                sum = 1 / 4
            } else if (sum >= 8 && sum <= 9) {
                sum = 1 / 4
            } else if (sum >= 9 && sum <= 10) {
                sum = 1 / 4
            } else {
                sum = 0;

            };



            arr.push({
                input: {
                    [movies]: 1
                },
                output: [sum]
            });
        };

        net.train(arr);
        console.log(arr)

        for (let i = 0; i < arr.length; i++) {

            let movies = response.data.data.movies[i].title
            let newValue = Array.from(net.run(arr[i].input));


            arr1.push({
                [i]: movies,
                rating: newValue
            });


            arr2.push(newValue);
        }
        console.log(Math.max(...arr2));

        function findIndexOfGreatest(array) {
            var greatest;
            var indexOfGreatest;
            for (var i = 0; i < array.length; i++) {
                if (!greatest || array[i] > greatest) {
                    greatest = array[i];
                    indexOfGreatest = i;
                }
            }
            return indexOfGreatest;
        }
        let val = findIndexOfGreatest(arr2)


        console.log(val)

        console.log(arr1[val][val])
        console.log(arr1[val])

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
