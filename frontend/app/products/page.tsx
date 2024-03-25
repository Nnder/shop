import ProductCard from "@/src/4_features/Card/Card";
import {Box, Container, Paper} from "@mui/material";
import 'react-photo-view/dist/react-photo-view.css';

const p = {
  id: 1,
  title: "Meat",
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, eum blanditiis! Ipsa perferendis non corrupti molestias doloribus nesciunt, aliquam numquam eos quam, labore pariatur quidem ducimus ullam tempora eum provident! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, eum blanditiis! Ipsa perferendis non corrupti molestias doloribus nesciunt, aliquam numquam eos quam, labore pariatur quidem ducimus ullam tempora eum provident!",
  imageSrc: "https://avatars.mds.yandex.net/i?id=8c1834ed9f9a1101dddc9b8050f7d4793ea0063e-5680793-images-thumbs&n=13",
  imageTitle: "Meat",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, eum blanditiis! Ipsa perferendis non corrupti molestias doloribus nesciunt, aliquam numquam eos quam, labore pariatur quidem ducimus ullam tempora eum provident! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, eum blanditiis! Ipsa perferendis non corrupti molestias doloribus nesciunt, aliquam numquam eos quam, labore pariatur quidem ducimus ullam tempora eum provident!",
}

export default function About() {
  return (
   <Container>
    <Paper elevation={16} sx={{px: [0,1], py: 4}}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: [1,2,3,4],
    }}>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
        <ProductCard product={p}/>
      </Box>
    </Paper>
   </Container>
  );
}