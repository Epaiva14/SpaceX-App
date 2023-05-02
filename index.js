const express = require('express');
const axios = require('axios');
const app = express();


app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
        .then(function (response) {
            // to find company -> console.log(response.data.name)
            res.render('index', { company: response.data }); //company.name
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later' })
        });

});



app.get('/capsules', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            //console.log('capsules data', response.data);
            res.render('capsules', { capsules: response.data });
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });

});
// app.get('/capsules/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/capsules')
//         .then(function (response) {
//             // handle success
//             //console.log(response.data);
//             //
//             for (let i = 0; i < response.data.length; i++) {
//                 let capsule = response.data[i];
//                 let splitSerial = req.params.serial.split(''); // array ['c', '1',...]
//                 let finalSerial = splitSerial[0].toUpperCase() + splitSerial.slice(1).join('');
//                 //upperCaseSerial[0].toUpperCase()
//                 //upperCaseSerial.join('');
//                 console.log('UpperCase Serial', finalSerial);
//                 //console.log('CAPSULE---->', capsule)
//                 if (capsule.serial === finalSerial) {
//                     return res.json({ capsule: capsule });
//                 }
//             }
//             return res.json({ message: 'Capsule does not exist' })
//         })
//         .catch(function (error) {
//             return res.json({ message: 'Data not found. Please try again later' })
//         });
// });
app.get('/capsules/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // print req.params
            // console.log('req.params', req.params);// print an object
            // console.log('api response', response.data) // print an array of capsules
            //run a for loop to seach based off the key from req.params
            const capsuleArray = [];

            for (let i = 0; i < response.data.length; i++) {
                let capsule = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['reuse_count', '0']
                if (userRequest[0] === 'serial') {
                    if (capsule.serial === userRequest[1].toUpperCase()) {
                        return res.json({ capsule });
                    }
                } else if (userRequest[0] === 'id') {
                    if (capsule.id === userRequest[1].toUpperCase()) {
                        return res.json({ capsule });
                    }
                } else if (userRequest[0] === 'reuse_count') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (capsule.reuse_count === countValue) {
                        capsuleArray.push(capsule);
                    }
                    console.log('reuse count', req.params.reuse_count);
                } else if (userRequest[0] === 'water_landings') {
                    let waterLandings = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (capsule.water_landings === waterLandings) {
                        capsuleArray.push(capsule);
                    }
                    console.log('water landings', req.params.water_landings);
                } else if (userRequest[0] === 'land_landings') {
                    let landLandings = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (capsule.land_landings === landLandings) {
                        capsuleArray.push(capsule);
                    }
                    console.log('land landings', req.params.land_landings);
                } else if (userRequest[0] === 'last_update') {
                    if (capsule.last_update === userRequest[1]) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'status') {
                    if (capsule.status === userRequest[1]) {
                        capsuleArray.push(capsule);
                    }
                } else if (userRequest[0] === 'type') {
                    if (capsule.status === userRequest[1]) {
                        capsuleArray.push(capsule);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again' })
                }


            }
            if (capsuleArray.length < 1) {
                return res.json({ message: 'Capsule not found, Please try again' });
            } else {
                return res.json({ capsules: capsuleArray });
            }

        })

});
app.get('/company', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
        .then(function (response) {

            res.json({ data: response.data })
        })
        .catch(function (error) {

            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/company/:name', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
        .then(function (response) {

            for (let i = 0; i < response.data.length; i++) {
                let company = response.data[i];
                let splitName = req.params.name.split('');
                let finalName = splitName[0].toUpperCase() + splitName.slice(1).join('');
                if (company.name === finalName) {
                    return res.json({ name: name });
                }
            }
            return res.json({ message: 'Company does not exist' })
        })
        .catch(function (error) {
            return res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/cores', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            //console.log('cores data', response.data);
            res.render('cores', { cores: response.data })
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later' })
        });
});
// app.get('/cores/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/cores')
//         .then(function (response) {

//             for (let i = 0; i < response.data.length; i++) {
//                 let core = response.data[i];
//                 let splitSerial = req.params.serial.split('');
//                 let finalSerial = splitSerial[0].toUpperCase() + splitSerial.slice(1).join('');

//                 if (core.serial === finalSerial) {
//                     return res.json({ core: core });
//                 }
//             }
//             return res.json({ message: 'Core does not exist' })
//         })
//         .catch(function (error) {
//             return res.json({ message: 'Data not found. Please try again later' })
//         });
// });
app.get('/cores/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            const coreArray = [];


            for (let i = 0; i < response.data.length; i++) {
                let core = response.data[i];

                let userRequest = req.params['0'].split('/'); // ['reuse_count', '0']

                if (userRequest[0].toLowerCase() === 'serial') {
                    if (core.serial.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ core });
                    }
                } else if (userRequest[0].toLowerCase() === 'id') {
                    if (core.id.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ core });
                    }
                } else if (userRequest[0] === 'reuse_count') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (core.reuse_count === countValue) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0] === 'rtls_attempts') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (core.rtls_attempts === countValue) {
                        coreArray.push(core);
                    }

                } else if (userRequest[0] === 'rtls_landings') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (core.rtls_landings === countValue) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0] === 'last_update') {
                    if (core.last_update === userRequest[1]) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0] === 'launches') {
                    if (core.status === userRequest[1]) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0] === 'status') {
                    if (core.status === userRequest[1]) {
                        coreArray.push(core);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again' })
                }

            }
            if (coreArray.length < 1) {
                return res.json({ message: 'Core not found, Please try again' });
            } else {
                return res.json({ core: coreArray });
            }

        })

});
app.get('/crew', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            res.render('crew', { crew: response.data })
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/crew/:status', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {

            for (let i = 0; i < response.data.length; i++) {
                let crew = response.data[i];
                let splitStatus = req.params.status.split('');
                let finalStatus = splitStatus[0].toUpperCase() + splitStatus.slice(1).join('');

                if (crew.status === finalStatus) {
                    return res.json({ crew: crew });
                }
            }
            return res.json({ message: 'Capsule does not exist' })
        })
        .catch(function (error) {
            //console.log(error);
            return res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/dragons', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            // handle success
            console.log('dragon data', response.data);
            res.render('dragons', { dragons: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });

});
app.get('/dragons/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            const dragonArray = [];

            for (let i = 0; i < response.data.length; i++) {
                let dragon = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['reuse_count', '0']

                if (userRequest[0] === 'crew_capacity') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (dragon.crew_capacity === countValue) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0] === 'dry_mass_kg') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (dragon.dry_mass_kg === countValue) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0] === 'dry_mass_lb') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (dragon.dry_mass_lb === countValue) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0].toLowerCase() === 'name') {
                    if (dragon.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0] === 'type') {
                    if (dragon.type === userRequest[1]) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0] === 'status') {
                    if (dragon.status === userRequest[1]) {
                        dragonArray.push(dragon);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again' })
                }
            }
            if (dragonArray.length < 1) {
                return res.json({ message: 'dragon not found, Please try again' });
            } else {
                return res.json({ dragons: dragonArray });
            }

        })

});
app.get('/landpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.render('landpads', { landpads: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/landpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            const landpadsArray = [];

            for (let i = 0; i < response.data.length; i++) {
                let landpads = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['reuse_count', '0']
                if (userRequest[0] === 'region') {              // this is good
                    if (landpads.region === userRequest[1].toUpperCase()) {
                        return res.json({ landpads });
                    }
                } else if (userRequest[0].toLowerCase() === 'id') {           // this is good
                    if (landpads.id.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ landpads });
                    }
                } else if (userRequest[0] === 'landing_attempts') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (landpads.landing_attempts === countValue) {
                        landpadsArray.push(landpads);
                    }
                } else if (userRequest[0] === 'landing_successes') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (landpads.landing_successess === countValue) {
                        landpadsArray.push(landpads);
                    }
                } else if (userRequest[0] === 'name') {
                    if (landpads.name === userRequest[1]) {
                        landpadsArray.push(landpads);
                    }
                } else if (userRequest[0] === 'full_name') {
                    if (landpads.full_name === userRequest[1]) {
                        landpadsArray.push(landpads);
                    }
                } else if (userRequest[0] === 'type') {
                    if (landpads.type === userRequest[1]) {
                        landpadsArray.push(landpads);
                    }
                } else if (userRequest[0] === 'locality') {
                    if (landpads.locality === userRequest[1]) {
                        landpadsArray.push(landpads);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again' })
                }

            }
            if (landpadsArray.length < 1) {
                return res.json({ message: 'Landpad not found, Please try again' });
            } else {
                return res.json({ capsules: landpadsArray });
            }
        })

});
app.get('/launches', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.json({ data: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/launches/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            const launchesArray = [];

            for (let i = 0; i < response.data.length; i++) {
                let launch = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['reuse_count', '0']            // this is good
                if (userRequest[0] === 'details') {
                    if (launch.details === userRequest[1]) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'name') {
                    if (launch.name === userRequest[1]) {
                        launchesArray.push(launch);
                    }

                } else if (userRequest[0] === 'window') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (launch.window === countValue) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0].toLowerCase() === 'net') {
                    if (launch.net.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'rocket') {
                    if (launch.rocket === userRequest[1]) {
                        launchesArray.push(launch);
                    }
                } else if (userRequest[0] === 'success') {
                    if (launch.success === userRequest[1]) {
                        launchesArray.push(launch);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again' })
                }

            }
            if (launchesArray.length < 1) {
                return res.json({ message: 'Launch not found, Please try again' });
            } else {
                return res.json({ capsules: launchesArray });
            }
        })

});
app.get('/launchpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.render('launchpads', { launchpads: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/launchpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            const launchpadArray = [];

            for (let i = 0; i < response.data.length; i++) {
                let launchpad = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['reuse_count', '0']
                if (userRequest[0].toLowerCase() === 'region') {
                    if (launchpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launchpad });
                    }
                } else if (userRequest[0] === 'latitude') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (launchpad.latitude === countValue) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'longitude') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (launchpad.longitude === countValue) {
                        launchpadArray.push(launchpad);
                    }

                } else if (userRequest[0] === 'name') {
                    if (launchpad.name === userRequest[1]) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'full_name') {
                    if (launchpad.full_name === userRequest[1]) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'status') {
                    if (launchpad.status === userRequest[1]) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0] === 'locality') {
                    if (launchpad.locality === userRequest[1]) {
                        launchpadArray.push(launchpad);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again' })
                }

            }
            if (launchpadArray.length < 1) {
                return res.json({ message: 'Launchpad not found, Please try again' });
            } else {
                return res.json({ launchpad: launchpadArray });
            }

        })

});
app.get('/payloads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.render('payloads', { payloads: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/search', (req, res) => {
    let result = {};
    // { name: 'capsules',  serial: 'C103' }
    // How would we make an axios when the item is different?
    axios.get(`https://api.spacexdata.com/v4/${req.query.item}`)
        .then(function (response) {
            for (let key in req.query) {
                if (key === 'item') {
                    //do nothing
                    continue;
                } else {
                    // run for loop to search for key and value
                    // key -> serial
                    // req.query[key] -> C103
                    for (let i = 0; i < response.data.length; i++) {
                        let capsule = response.data[i];
                        if (capsule.serial === req.query[key]) {  // if the response capsule.serial is equal to the search item C103
                            return res.json({ capsule });
                        } else if (capsule.name === req.query[key] || capsule.type === req.query[key]) {
                            return res.json({ capsule });
                        } else if (capsule.reuse_count === req.query[key]) {
                            return res.json({ capsule });
                        }
                    }
                }
            }
            return res.json({ message: 'Data not found. Please try again' });
        })
        .catch(function (error) {
            //console.log(error);
            return res.json({ message: 'Data not found. Please try again later' })
        });

});
app.get('/payloads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            const payloadArray = [];

            for (let i = 0; i < response.data.length; i++) {
                let payload = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['reuse_count', '0']
                if (userRequest[0] === 'type') {
                    if (payload.type === userRequest[1].toUpperCase()) {
                        return res.json({ payload });
                    }
                } else if (userRequest[0] === 'mass_kg') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (payload.mass_kg === countValue) {
                        payloadArray.push(payload);
                    }
                } else if (userRequest[0] === 'mass_lbs') {
                    let countValue = parseInt(userRequest[1]) // Number(userRequest[1])
                    if (payload.mass_lbs === countValue) {
                        payloadArray.push(payload);
                    }

                } else if (userRequest[0] === 'name') {
                    if (payload.name === userRequest[1]) {
                        payloadArray.push(payload);
                    }
                } else if (userRequest[0] === 'reused') {
                    if (payload.reused === userRequest[1]) {
                        payloadArray.push(payload);
                    }
                } else if (userRequest[0] === 'launch') {
                    if (payload.launch === userRequest[1]) {
                        payloadArray.push(payload);
                    }
                } else {
                    return res.json({ message: 'Data is not found... Please try again' })
                }

            }
            return res.json({ payload: payloadArray });

        })

});
app.get('/roadster', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/roadster')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.render('roadster', { roadster: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/rockets', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.json({ data: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/ships', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.json({ data: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/starlink', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.json({ data: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/history', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/history')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            res.json({ data: response.data })
        })
        .catch(function (error) {
            //console.log(error);
            res.json({ message: 'Data not found. Please try again later' })
        });
});
app.get('/:input', function (req, res) {
    console.log('REQ.PARAMS ->', req.params);

    res.json({ message: `There is no data for /${req.params.input}` })
});

//==========================HTML VIEW==========================
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/views-folder/index.html');
// });
// app.get('/views-folder/blog-dir.html', function (req, res) {
//     res.sendFile(__dirname + '/views-folder/blog-dir.html');
// });
// app.get('/views-folder/about.html', function (req, res) {
//     res.sendFile(__dirname + '/views-folder/about.html');
// });


// res.sendFile(__dirname + '/views-folder/index.html');
const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log(`Server is running on PORT`, PORT);
});

module.exports = {
    app,
    PORT
}