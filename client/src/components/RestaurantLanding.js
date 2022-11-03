import RestaurantBase from "./RestaurantTemplate/RestaurantBase";
import {Box,Paper, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';

export default function RestaurantLanding(){
    return(
        <RestaurantBase>
            <Paper
                fullWidth
                sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                padding:20,
                minHeight: 640,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')`,
                }}
            >
                {<img style={{ display: 'none' }} src='https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' alt='restaurant img' />}
                <Box
                    sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Box
                    sx={{
                    position: 'relative',
                    p: { xs: 3, md: 6 },
                    pr: { md: 0 },
                    }}
                >
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        Landing
                    </Typography>
                </Box>
            </Paper>
        </RestaurantBase>
    )
}