import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Card from "../components/Card";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export default function Dogs() {
    const [dogs, setDogs] = React.useState([]);
    const [filteredDogs, setFilteredDogs] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [adoption, setAdoption] = React.useState(false);
    const [desexed, setDesexed] = React.useState(false);
    const [parvo, setParvo] = React.useState(false);

    React.useEffect(() => {
        axios.get("http://localhost:5000/api/dogs")
            .then((res) => {
                setDogs(res.data);
                setFilteredDogs(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    React.useEffect(() => {
        filterDogs(search)
    }, [search, adoption, desexed, parvo])

    const filterDogs = (value) => {
        if(value == '' || value == null){
            setFilteredDogs(dogs)
        }
        setFilteredDogs(dogs.filter((dog) => {
            return (
                (
                    dog.name.toLowerCase().includes(value.toLowerCase()) ||
                    dog.breed.toLowerCase().includes(value.toLowerCase()) ||
                    dog.color.toLowerCase().includes(value.toLowerCase()) ||
                    dog.description.toLowerCase().includes(value.toLowerCase())
                ) &&
                (adoption ? dog.adoption == true : true) &&
                (desexed ? dog.medical_history.desexed == true : true) &&
                (parvo ? dog.medical_history.parvo == true : true)
            )
        }))

    }

    return (
        <Layout meta={{ title: "Dogs", description: "Waikato Pound Pups Catalog" }}>
            <Grid container spacing={1} sx={{ width: '80%', margin: '0 auto' }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="h3">Dogs</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Typography variant="h4">Filter</Typography>
                    <br />
                    <Box sx={{ width: 'max-content' }}>
                        <TextField size="small" placeholder="Search keywords..." value={search}
                            onChange={
                                () => {
                                    setSearch(event.target.value)
                                }
                            } />
                        <hr />
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={adoption} onChange={() => {setAdoption(event.target.checked)}} />} label="Adoption" />
                            <FormControlLabel control={<Checkbox checked={desexed} onChange={() => {setDesexed(event.target.checked)}} />} label="Desexed" />
                            <FormControlLabel control={<Checkbox checked={parvo} onChange={() => {setParvo(event.target.checked)}} />} label="Parvo" />
                        </FormGroup>
                        <hr />
                        <Button variant="contained" onClick={() => {
                            setSearch('')
                            setAdoption(false)
                            setDesexed(false)
                            setParvo(false)
                        }}>Clear Filter</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}> 
                    <Typography variant="h4">Adoption Dogs</Typography>
                    <br />  
                    <Grid container spacing={1}>
                        {filteredDogs.filter(item => item.adoption == true).map((dog) => {
                            return (
                                <Grid item key={dog._id} xs={6} sm={6} md={4} lg={2} xl={2}>
                                    <Card dog={dog} />
                                </Grid>
                            )
                        })}
                    </Grid>
                    <br /> 
                    <Typography variant="h4">All Dogs</Typography>
                    <br />  
                    <Grid container spacing={1}>
                        {filteredDogs.filter(item => item.adoption == false).map((dog) => {
                            return (
                                <Grid item key={dog._id} xs={4} sm={4} md={4} lg={4} xl={2}>
                                    <Card dog={dog} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}