"use client"
import ProductInfo from "@/src/4_features/ProductInfo/ProductInfo";
import { GetProduct } from "@/src/5_entities/product/product";
import Loader from "@/src/6_shared/ui/Loader/Loader";
import {Box, Container, Paper} from "@mui/material";

export default function ProductElement({ params }: { params: { id: number } }) {

    const {data, isLoading, isFetching} = GetProduct(params.id)

  return (
   <Container>
    <Paper elevation={16} sx={{px: [0,0,0,1], py: [1,1,1,2], minHeight: "100px"}}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}> 
        {isLoading ? <Loader/> : data?.data.title ? <ProductInfo data={data.data}/> : "Ничего не найдено"}
      </Box>
    </Paper>
   </Container>
  );
}