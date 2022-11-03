import RestaurantBase from "./RestaurantTemplate/RestaurantBase";
import {Container, Box} from "@mui/material";
import { styled } from '@mui/material/styles';

const Background = styled(Box)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  });

export default function RestaurantLanding(){
    return(
        <RestaurantBase>
            <h1>Restaurant Landing</h1>
        </RestaurantBase>
    )
}