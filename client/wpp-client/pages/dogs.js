import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Card from "../components/Card";
import { Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value} years`;
}
const minDistance = 0;
   
export default function Dogs() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [dogs, setDogs] = React.useState([]);
    const [filteredDogs, setFilteredDogs] = React.useState([]);
    const [showFilter, setShowFilter] = React.useState(!isMobile);
    const [search, setSearch] = React.useState('');
    const [adoption, setAdoption] = React.useState(false);
    const [foster, setFoster] = React.useState(false);
    const [male, setMale] = React.useState(false);
    const [female, setFemale] = React.useState(false);
    const [desexed, setDesexed] = React.useState(false);
    const [parvo, setParvo] = React.useState(false);
    const [age, setAge] = React.useState([0, 8]);
  
    const handleChange1 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setAge([Math.min(newValue[0], age[1] - minDistance), age[1]]);
      } else {
        setAge([age[0], Math.max(newValue[1], age[0] + minDistance)]);
      }
    };

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
    }, [search, adoption, foster, desexed, parvo, male, female, age])

    function yearsDiff(dateFrom, dateTo = new Date()) {
        return (dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))) / 12
    }

    const filterDogs = (value) => {
        const date = new Date();
        if(value == '' || value == null){
            setFilteredDogs(dogs)
        }
        setFilteredDogs(dogs.filter((dog) => {
            return (
                (
                    dog.name.toLowerCase().includes(value.toLowerCase()) ||
                    dog.breed.toLowerCase().includes(value.toLowerCase()) ||
                    dog.color.toLowerCase().includes(value.toLowerCase()) 
                ) &&
                (adoption ? dog.status.toLowerCase() == 'adoption' : true) &&
                (foster ? dog.status.toLowerCase() == 'foster' : true) &&
                (desexed ? dog.medical_history.filter((x) => x.toLowerCase() == 'desexed').length == 1 : true) &&
                (parvo ? dog.medical_history.filter((x) => x.toLowerCase() == 'parvo').length == 1 : true) &&
                (male ? dog.sex.toLowerCase() == 'male' : true) &&
                (female ? dog.sex.toLowerCase() == 'female' : true) &&
                (
                    (age[0] <= yearsDiff(new Date(dog.dob)) &&
                    age[1] >= yearsDiff(new Date(dog.dob))) ||
                    (age[0] == 0 && age[1] == 0)
                )
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
                    <Typography variant="h4">
                        Filter  {isMobile ? (<>
                            <Button variant="outlined" size="small" onClick={() => setShowFilter(!showFilter)}>{showFilter ? 'Hide' : 'Show'}</Button>
                        </>) : (<></>)}
                    </Typography>
                    <br />
                    <Box sx={{ width: 'max-content', display: showFilter ? 'block' : 'none' }}>
                        <TextField size="small" placeholder="Search keywords..." value={search}
                            onChange={
                                () => {
                                    setSearch(event.target.value)
                                }
                            } />
                        <hr />
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={adoption} onChange={() => {setAdoption(event.target.checked)}} />} label="Adoption" />
                            <FormControlLabel control={<Checkbox checked={foster} onChange={() => {setFoster(event.target.checked)}} />} label="Foster" />
                            <FormControlLabel control={<Checkbox checked={male} onChange={() => {setMale(event.target.checked)}} />} label="Male" />
                            <FormControlLabel sx={{display: 'inline'}} control={<Checkbox checked={female} onChange={() => {setFemale(event.target.checked)}} />} label="Female" />
                            <FormControlLabel control={<Checkbox checked={desexed} onChange={() => {setDesexed(event.target.checked)}} />} label="Desexed" />
                            <FormControlLabel control={<Checkbox checked={parvo} onChange={() => {setParvo(event.target.checked)}} />} label="Parvo" />
                        </FormGroup>
                        <hr />
                        <Box sx={{ width: '100%' }}>
                            <Typography id="range-slider" gutterBottom>
                                Age
                            </Typography>
                            <Slider
                                getAriaLabel={() => 'Age'}
                                value={age}
                                onChange={handleChange1}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                                step={.5}
                                marks={[{ value: 0, label: 'All' }, { value: 8, label: '8 years' }]}
                                min={0}
                                max={8}
                            />
                        </Box>
                        <hr />
                        <Button variant="contained" onClick={() => {
                            setSearch('')
                            setAdoption(false)
                            setFoster(false)
                            setMale(false)
                            setFemale(false)
                            setDesexed(false)
                            setParvo(false)
                            setAge([0, 8])
                        }}>Clear Filter</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}> 
                    <Typography variant="h4">Results (<small>{filteredDogs.length}</small>)</Typography>
                    <br />  
                    <Grid container spacing={1}>
                        {filteredDogs.map((dog) => {
                            return (
                                <Grid item key={dog._id} xs={6} sm={6} md={4} lg={3} xl={3}>
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