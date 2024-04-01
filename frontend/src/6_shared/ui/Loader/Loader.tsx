import { LoaderCircle } from 'lucide-react'
import styles from './Loader.module.css'; 
import { Box } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{m:2}}>
        <LoaderCircle size={50} className={styles.loader}/>
    </Box>
  )
}
