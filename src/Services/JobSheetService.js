import axios from "axios";

const JOBSHEET_API_BASE_URL = "http://localhost:8080/api/v1/jobSheets";

class JobSheetService{
    getJobSheets(){
        return axios.get(JOBSHEET_API_BASE_URL);
    }

    createJobSheet(jobSheet){
        return axios.post(JOBSHEET_API_BASE_URL,jobSheet);
    }
}

export default new JobSheetService()