import React from "react";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import Image from "next/image";

const CardPaper = styled(Paper)(({ theme }) => ({
  width: 200,
  height: 350,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'left',
  cursor: 'pointer',
}));

export default function Card({dog}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const formatDate = (date) => {
        const d = new Date(date);
        return `${(d.getDate() < 10 ) ? '0' + d.getDate() : d.getDate()}/${(d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}/${d.getFullYear()}`;
    }

    function yearsDiff(dateFrom, dateTo = new Date()) {
        return (dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))) / 12
    }

    return (
        <Stack direction="row" spacing={3}>
            <CardPaper square={false} elevation={1} variant="outlined">
                <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>{dog.name}</Typography>
                <Image src={'https://picsum.photos/100/100'} alt={dog.name} width={isMobile ? 100 : 200} height={isMobile ? 100 : 200} />
                <Typography><strong>DOB:</strong> {formatDate(dog.dob)} <i>({yearsDiff(new Date(dog.dob)).toFixed(1)} y/o)</i></Typography>
                <Typography><strong>Color:</strong> {dog.color}</Typography>
                <Typography><strong>Breed:</strong> {dog.breed}</Typography>
            </CardPaper>
        </Stack>
    );
}
