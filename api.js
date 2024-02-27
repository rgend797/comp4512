const express = require('express'); 
const supa = require('@supabase/supabase-js'); 
const app = express(); 
 //walaheeee!!!!!$
const supaUrl = 'https://igxaqwuvabsnrtcxcdbc.supabase.co'; 
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlneGFxd3V2YWJzbnJ0Y3hjZGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwNDI2OTQsImV4cCI6MjAyMzYxODY5NH0.z0GVfqkAqXvLb97iTDFfHHO_SHWII1nqk7IT9HOOaFg'; 
 
const supabase = supa.createClient(supaUrl, supaAnonKey); 

app.listen(8080, () => { 
    console.log('listening on port 8080'); 
    //console.log('http://localhost:8080/f1/qualifying/10'); 
    console.log('http://localhost:8080/api/seasons');
    console.log('http://localhost:8080/api/circuits');
    console.log('http://localhost:8080/api/circuits/monza');
    console.log('http://localhost:8080/api/circuits/calgary');
    console.log('http://localhost:8080/api/constructors');
    console.log('http://localhost:8080/api/constructors/ferrari');
    console.log('http://localhost:8080/api/drivers');
    console.log('http://localhost:8080/api/drivers/Norris');
    console.log('http://localhost:8080/api/drivers/norris');
    console.log('http://localhost:8080/api/drivers/connolly');
    console.log('http://localhost:8080/api/drivers/search/sch');
    console.log('http://localhost:8080/api/drivers/search/xxxxx');
    console.log('http://localhost:8080/api/drivers/race/1069');
    console.log('http://localhost:8080/api/races/1034');
    console.log('http://localhost:8080/api/races/season/2021');
    console.log('http://localhost:8080/api/races/season/2022/4');
    console.log('http://localhost:8080/api/races/circuits/monza');
    console.log('http://localhost:8080/api/races/circuits/monza/season/2015/2022');
    console.log('http://localhost:8080/api/results/1106');
    console.log('http://localhost:8080/api/results/driver/max_verstappen');
    console.log('http://localhost:8080/api/results/driver/connolly');
    console.log('http://localhost:8080/api/results/driver/sainz/seasons/2021/2022');
    console.log('http://localhost:8080/api/qualifying/1106');
    console.log('http://localhost:8080/api/standings/1120/drivers');
    console.log('http://localhost:8080/api/standings/1120/constructors');
    console.log('http://localhost:8080/api/standings/asds/constructors');

});

/*app.get('/f1/qualifying/:race', async (req, res) => { 
    const {data, error} = await supabase 
    .from('qualifying') 
    .select(` 
    qualifyId, position, q1, q2, q3, races (name,year), drivers (surname,forename), constructors (name)
    `) 
    .eq('raceId', req.params.race) 
    .order('position', { ascending: true }); 
    res.send(data); 
}); 

app.get('/f1/races/:st/:en', async (req, res) => { 
    const {data, error} = await supabase 
    .from('races') 
    .select() 
    .gte('year', req.params.st)
    .lte('year', req.params.en) 
    .order('year', { ascending: true }); 
    res.send(data); 
}); 

app.get('/f1/drivers/name/:sch/limit/:lim', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers') 
    .select() 
    .ilike('surname', req.params.sch + "%")
    .limit(req.params.lim)
    .order('surname', { ascending: true }); 
    res.send(data); 
}); */

app.get('/api/seasons', async (req, res) => { 
    const {data, error} = await supabase 
    .from('seasons').select();
    res.send(data); 
}); 

app.get('/api/circuits', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits').select();
    res.send(data); 
}); 

app.get('/api/circuits/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits')
    .select()
    .eq('circuitRef', req.params.ref);
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/circuits/season/:year', async (req, res) => { 
    const {data, error} = await supabase 
    .from('circuits')
    .select('*, races (year, round), seasons (*)')
    .eq('races.year', req.params.year)
    .order('races.round', { ascending: true });
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/constructors', async (req, res) => { 
    const {data, error} = await supabase 
    .from('constructors')
    .select();
    res.send(data); 
}); 

app.get('/api/constructors/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('constructors')
    .select()
    .eq('constructorRef', req.params.ref);
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/drivers', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers')
    .select();
    res.send(data); 
}); 

app.get('/api/drivers/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('drivers')
    .select()
    .eq('driversRef', req.params.ref);
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/drivers/search/:substring', async (req, res) => {
    const {data, error} = await supabase 
    .from('drivers')
    .select()
    .ilike('surname', req.params.substring + "%");
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/drivers/race/:raceId', async (req, res) => { 
    const {data, error} = await supabase 
    .from('driverStandings')
    .select('drivers (*), races (raceId)')
    .eq('races.raceId', req.params.raceId)
    .limit(1000);
    res.send(data); 
}); 

app.get('/api/races/:raceId', async (req, res) => { 
    const {data, error} = await supabase 
    .from('races')
    .select('*, circuits (name, location, country)')
    .eq('raceId', req.params.raceId);
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/races/season/:year', async (req, res) => { 
    const {data, error} = await supabase 
    .from('races')
    .select('*, seasons (*)')
    .eq('year', req.params.year)
    .order('round', { ascending: true });
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/races/season/:year/:round', async (req, res) => { 
    const {data, error} = await supabase 
    .from('races')
    .select('*, seasons (*)')
    .eq('year', req.params.year)
    .eq('round', req.params.round);
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/races/circuits/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('races')
    .select('*, circuits (*)')
    .eq('circuits.circuitRef', req.params.ref)
    .order('year', {ascending: true});
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/races/circuits/:ref/season/:start/:end', async (req, res) => { 
    const {data, error} = await supabase 
    .from('races')
    .select('*, circuits (circuitRef), seasons (*)')
    .eq('circuits.circuitRef', req.params.ref)
    .gte('year', req.params.start)
    .lte('year', req.params.end);
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/results/:raceId', async (req, res) => { 
    const {data, error} = await supabase 
    .from('results')
    .select('*, drivers (driverRef, code, forename, surname), races (name, round, year, date), constructors (name, constructorRef, nationality)')
    .eq('raceId', req.params.raceId)
    .order('grid', {ascending: true});
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/results/driver/:ref', async (req, res) => { 
    const {data, error} = await supabase 
    .from('results')
    .select('*, drivers (driverRef)')
    .eq('drivers.driverRef', req.params.ref);
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/results/driver/:ref/seasons/:start/:end', async (req, res) => { 
    const {data, error} = await supabase 
    .from('results')
    .select('*, races (*), drivers (*)')
    .eq('drivers.driverRef', req.params.ref)
    .gte('races.year', req.params.start)
    .lte('races.year', req.params.end);
    const filtered = data.filter(function (a){return a.races != null;});
    if(filtered.length == 0){res.send("No such results.");}
    else{res.send(filtered);} 
}); 

app.get('/api/qualifying/:raceId', async (req, res) => { 
    const {data, error} = await supabase 
    .from('qualifying')
    .select('*, races (name, round, year, date, results (*, drivers (driverRef, code, forename, surname), constructors (name, constructorRef, nationality)))')
    .eq('raceId', req.params.raceId)
    .order('position', {ascending: true});
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/standings/:raceId/drivers', async (req, res) => { 
    const {data, error} = await supabase 
    .from('driverStandings')
    .select('*, races(name, round, year, date, results (drivers (driverRef, code, forename, surname), constructors (name, constructorRef, nationality)))')
    .eq('raceId', req.params.raceId)
    .order('position', {ascending: true});
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 

app.get('/api/standings/:raceId/constructors', async (req, res) => { 
    const {data, error} = await supabase 
    .from('constructorStandings')
    .select()
    .eq('raceId', req.params.raceId)
    .order('position', {ascending: true});
    if(data.length == 0){res.send("No such results.");}
    else{res.send(data)}; 
}); 
