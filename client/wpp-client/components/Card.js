import React from "react";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CardPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function Card({dog}) {

    const formatDate = (date) => {
        const d = new Date(date);
        return `${(d.getDate() < 10 ) ? '0' + d.getDate() : d.getDate()}/${(d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}/${d.getFullYear()}`;
    }

    return (
        <Stack direction="row" spacing={3}>
            <CardPaper square={false} elevation={1} variant="outlined">
                <Typography variant="h6">{dog.name}</Typography>
                <Typography>{formatDate(dog.dob)}</Typography>
                <Typography>{dog.color} - {dog.breed}</Typography>
            </CardPaper>
        </Stack>
    );
}
