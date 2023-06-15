import LoadStatus from "./LoadStatus";
import { Button } from "@mui/material";
import PublishIcon from '@mui/icons-material/Publish';

export default function ButtonExcel({loadExcelStatus}){
    return(
        <>
            <Button disabled={loadExcelStatus} >Upload With Excel<PublishIcon sx={{ marginRight: "90px" }}/></Button>
            {loadExcelStatus&&<LoadStatus />}
        </>

    )
}