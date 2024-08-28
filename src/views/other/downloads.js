import useFetch from '../../custom/useFetch';
const Downloads = () => {

   const HandleClick = (url,name) =>{
        fetch(url, {
            method: 'GET',
            headers: {
                // 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //get file-name from backend
            const contentDisposition = response.headers.get('Content-Disposition');
            const filename = contentDisposition ? contentDisposition.match(/filename="?([^"]+)"?/)[1] : 'download.xlsx';
            return response.blob().then(blob => ({ filename, blob }));
            
        })
        .then(({ filename, blob }) => {

            const url = window.URL.createObjectURL(blob); 
            const link = document.createElement('a'); 
            link.href = url;
            link.download = filename; // Set the filename for the downloaded file
            document.body.appendChild(link); // Append the link to the DOM
            link.click(); // Trigger the download
            link.remove(); // Clean up
            window.URL.revokeObjectURL(url); // Revoke the Blob URL
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
}

    return (
        <div className='downloads-container'>
            <h2>Download Excel Files</h2>
            <div className='button-container'>
            <button onClick={()=>HandleClick('http://localhost:3002/api/employee_excel','employees')}><b>Employees</b></button>
            <button onClick={()=>HandleClick('http://localhost:3002/api/skill_excel','skills')}><b>Skills</b></button>
            <button onClick={() => HandleClick('http://localhost:3002/api/EmpSkillExcel','emp-skill')}><b>Employee-Skill Relations</b></button>
            </div>
        </div>
    );

}

export default Downloads