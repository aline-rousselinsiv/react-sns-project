import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


function Mui(){
    return <>
    Hello World
    <Stack spacing={1}>
      <Rating size="small" name="half-rating" defaultValue={4} precision={1} />
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Stack>
    
    </>

}
export default Mui;