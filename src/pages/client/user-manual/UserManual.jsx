import React from 'react'
import "./UserManual.scss"
import Header from '../../../components/header/admin/Header'

const UserManual = () => {
  return (
    <>
      <Header name="Support" />
      <section className='client-user-manual-section'>
        <h2 className="top-main-title">User Manual</h2>
        <div className="table-box-default">
          <div className="box-header">
            <h3 className='box-title'>Table Content</h3>
          </div>
          <div className="box-body">
            <div className="user-manual">
              <div className="top-name">
                <h3 className='for-header'>Topic</h3>
              </div>
              <ol className='table-box-ol'>
                <li><a href="#Overview">Dashboard Overview</a></li>
                <li><a href="#First-Category">First Category: Content Management</a></li>
                <ul className='nest-ul'>
                  <li><a href="#Manage-Sector">Manage Sector</a></li>
                  <li><a href="#Manage-JR">Manage Job Role</a></li>
                  <li><a href="#Manage-NOS">Manage NOS</a></li>
                  <li><a href="#Manage-Scheme">Manage Scheme</a></li>
                  <li><a href="#Manage-QB">Manage Question Bank</a></li>
                </ul>
                <li><a href="#Second-Category">Second Category: User Management</a></li>
                <ul className='nest-ul'>
                  <li><a href="#Manage-Assessor">Manage Assessor</a></li>
                  <li><a href="#Candidate-BU">Candidate Bulk Upload</a></li>
                  <li><a href="#Manage-Candidate">Manage Candidate</a></li>
                  <li><a href="#Candidate-Attendanc">Candidate Attendance</a></li>
                </ul>
                <li><a href="#Third-Category">Third Category: Assessment</a></li>
                <ul className='nest-ul'>
                  <li><a href="#Batch-Upload">Batch Upload</a></li>
                  <li><a href="#Manage-Batch">Manage Batch</a></li>
                  <li><a href="#Schedule-Batch">Schedule Batch</a></li>
                  <li><a href="#Current-Batch">Current Batch</a></li>
                  <li><a href="#Assessment-Completed">Assessment Completed</a></li>
                  <li><a href="#Batch-SIP">Batch send to SIP</a></li>
                </ul>
                <li><a href="#Fourth-Category">Fourth Category: Monitoring</a></li>
                <ul className='nest-ul'>
                  <li><a href="#Batch-Status">Batch Status</a></li>
                  <li><a href="#Candidate-Evidence">Candidate Evidence</a></li>
                  <li><a href="#Batch-ER">Batch Evidence Record</a></li>
                </ul>
                <li><a href="#Fifth-Category">Fifth Category: Reports</a></li>
                <ul className='nest-ul'>
                  <li><a href="#MIS-Report">MIS Report</a></li>
                  <li><a href="#Batch-Result">Batch Result</a></li>
                  <li><a href="#Batch-Report">Batch Report</a></li>
                </ul>
                <li><a href="#Sixth-Category">Sixth Category: Support</a></li>
                <ul className='nest-ul'>
                  <li><a href="#Open-Ticket">Open Ticket</a></li>
                  <li><a href="#Closed-Ticket">Closed Ticket</a></li>
                  <li><a href="#User-Manual">User Manual</a></li>
                </ul>
                <li><a href="#Seventh-Category">Seventh Category: Analytics Report</a></li>
                <ul className='nest-ul'>
                  <li><a href="#Assessor-Analytics">Assessor's Analytics</a></li>
                  <li><a href="#Sector-Analytics">Sector's Analytics</a></li>
                  <li><a href="#QB-Analytics">Question Bank's Analytics</a></li>
                  <li><a href="#Batch-Analytics">Batch's Analytics</a></li>
                  <li><a href="#JobRole-Analytics">Jobrole's Analytics</a></li>
                </ul>
              </ol>
            </div>
          </div>
        </div>
        <div className="table-box-default" id='Overview'>
          <div className="box-header">
            <h3 className='box-title'>Dashboard Overview</h3>
          </div>
          <div className="box-body">
            <p>
              The portal provides a concise overview of key metrics, including the number of sectors,
              registered assessors, enrolled and assessed candidates, total batches, and the status of
              current, scheduled, and completed batches.
            </p>
            <p>
              The platform also features a real-time "Today’s Assessment Status" section, offering a count
              of assessments in progress and those completed on the current date. Additionally, a visual
              representation in the form of a chart displays the hourly distribution of candidates.
            </p>
            <p>
              On the left side, the functionality is organized into different categories, as outlined
              below:
            </p>
            <ul className='upper-ul'>
              <li>Content Management</li>
              <li>User Management</li>
              <li>Assessment</li>
              <li>Monitoring</li>
              <li>Reports</li>
              <li>Support</li>
              <li>Analytics Report</li>
            </ul>
            <img src="https://exam-express.com/admin/img/User-manual-img/image1.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
          </div>
        </div>
        <div className="table-box-default" id='First-Category'>
          <div className="box-header">
            <h3 className='box-title'>First category: Content Management</h3>
          </div>
          <div className="box-body">
            <p>
              Content Management involves one-time additions by the agency and is categorized into:
            </p>
            <ul className='upper-ul'>
              <li>Manage sector</li>
              <li>Manage Job Role</li>
              <li>Manage NOS (National Occupational Standards)</li>
              <li>Manage Scheme</li>
              <li>Manage Question Bank</li>
            </ul>
            <img src="https://exam-express.com/admin/img/User-manual-img/image2.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
          </div>
        </div>
        <div className="table-box-default" id='Manage-Sector'>
          <div className="box-header">
            <h3 className='box-title'>Manage Sector</h3>
          </div>
          <div className="box-body">
            <p>
              To add a new sector, follow these steps:
            </p>
            <ul className='upper-ul'>
              <li>Click on the "Add New" button.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image3.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <br />
              <li>Fill in all the required details and select the sector logo</li>
              <li>Click on "Add Sector" to finalize.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image4.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Manage-JR'>
          <div className="box-header">
            <h3 className='box-title'>Manage Job Role</h3>
          </div>
          <div className="box-body">
            <p>
              For adding a new job role:
            </p>
            <ul className='upper-ul'>
              <li>Click on the "Add New" button.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image5.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <br />
              <li>Provide all necessary details and click on "Add Job Role."</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image6.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Manage-NOS'>
          <div className="box-header">
            <h3 className='box-title'>Manage NOS</h3>
          </div>
          <div className="box-body">
            <p>
              To add single NOS or bulk upload:
            </p>
            <ul className='upper-ul'>
              <li>For single NOS: Click on "Add New" and fill in details.</li>
              <li>For bulk upload: Click on "Bulk Upload," download the template, fill it, and upload.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image7.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
            <p>Once NOS is uploaded, select and move them as needed.</p>
            <p>when clicking on bulk upload button-</p>
            <ul className='upper-ul'>
              <li>Click on the "Download Template" button to initiate the bulk upload process.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image8.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>Fill in all the required fields in the template:</li>
              <ul>
                <li>
                  Job Role ID: Enter the system-generated job role ID in the respective column (Only
                  numeric digit).
                </li>
                <li>NosNO: Fill in the NOS number as mentioned in the Qualification Pack (QP).</li>
                <li>NOSName: Provide the NOS name as specified in the QP.</li>
                <li>TTheoryMarks: Enter the theory marks based on the NOS requirements.</li>
                <li>TVivaMarks: Input the viva marks according to the NOS guidelines.</li>
                <li>TPracticalMarks: Fill in the practical/viva marks as per the NOS.</li>
              </ul>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image9.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <br />
              <li>To upload the completed template, click on the "Bulk Upload" button.</li>
              <li>Choose the file containing the filled template and click on the "Upload" button.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image10.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <br />
              <li>
                Once the NOS data is successfully uploaded, proceed to select the NOS and move them to
                the desired location.
              </li>
              <li>
                After the successful movement of NOS, return to the NOS homepage, where you can sort NOS
                based on the sector and job role.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image11.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Manage-Scheme'>
          <div className="box-header">
            <h3 className='box-title'>Manage Scheme</h3>
          </div>
          <div className="box-body">
            <p>
              To add a new scheme:
            </p>
            <ul className='upper-ul'>
              <li>Click on "Add New."</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image12.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <br />
              <li>Select the sector and fill in the scheme name.</li>
              <li>Click on "Add Scheme."</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image13.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Manage-QB'>
          <div className="box-header">
            <h3 className='box-title'>Manage Question Bank</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>Begin by selecting "Add New" to create a question bank.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image14.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <br />
              <li>Fill in the necessary details to create the question bank.</li>
              <li>Click on the "Add Question Bank" button to finalize the creation.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image15.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <br />
              <li>Once the theory question bank is created, proceed to upload questions.</li>
              <li>Click on the "Question" button to initiate the question upload process.</li>
              <img src="https://exam-express.com/admin/img/User-manual-img/image16.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                Select the NOS, difficulty level, update question marks, and choose the question type.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image18.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>Based on the question type, users can input questions and answers.</li>
              <li>
                Optionally, add images to questions and options by clicking on the "Choose File" buttons
                &gt; Add question.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image19.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                For bulk upload, download the template by clicking on the "Download Template" button.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image20.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                Fill in the template with questions, ensuring English language inclusion (compulsory).
              </li>
              <li>
                Add question type and system-generated NOS ID.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image21.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>Upload the filled template by clicking on "Choose File" and then "Upload."</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image22.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                After uploading, select and move all questions; they will automatically align with their
                respective NOS.
              </li>
              <li>The question count will increase as questions are uploaded into the Question Bank.</li>
            </ul>
            <h4 className='box-title'>
              <b> Practical/ Viva QuestionBank </b>
            </h4>
            <ul className='upper-ul'>
              <li>
                Initiate the creation of a question bank for practical and viva by clicking "Add New."
              </li>
              <li>
                Choose between creating a question bank based on individual questions or scenarios.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image23.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                If creating a question-based question bank, click on the "Question" option to begin
                adding questions.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image24.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <br />
              <li>To add a single question:</li>
              <ul >
                <li style={{ listStyle: "circle" }}> Click on the "Add New" button.</li>
                <li style={{ listStyle: "circle" }}> Select the Number of Options (NOS), Question Marks, and update the question.</li>
                <li style={{ listStyle: "circle" }}> Click on "Add Question" to save it.</li>
              </ul>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image25.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                For scenario-based questions, click "Add New" and select NOS, upload marks, questions,
                and scenarios.
              </li>
              <li>
                Add multiple scenarios if needed, including images by clicking on the respective
                buttons.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image26.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Second-Category'>
          <div className="box-header">
            <h3 className='box-title'>Second Category: User Management</h3>
          </div>
          <div className="box-body">
            <p>
              User Management includes:
            </p>
            <ul className='upper-ul'>
              <li>Manage Assessor</li>
              <li>Candidate Bulk Upload</li>
              <li>Manage Candidate</li>
              <li>Candidate Attendance</li>
            </ul>
            <img src="https://exam-express.com/admin/img/User-manual-img/image27.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
          </div>
        </div>
        <div className="table-box-default" id='Manage-Assessor'>
          <div className="box-header">
            <h3 className='box-title'>Manage Assessor</h3>
          </div>
          <div className="box-body">
            <p>To add a new assessor: </p>
            <ul className='upper-ul'>
              <li>Click on "Add New."</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image28.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                Fill in basic details and click on "Assign Job Role" to specify sector and job roles.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image29.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image30.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Candidate-BU'>
          <div className="box-header">
            <h3 className='box-title'>Candidate Bulk Upload</h3>
          </div>
          <div className="box-body">
            <p>
              To add candidates individually or in bulk.
            </p>
            <ul className='upper-ul'>
              <li>For a single candidate: Click on the "Add New" button.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image31.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                After clicking, a form will appear. Fill in the required details and click on the "Add
                Candidate" button to save.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image32.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
            <p>For bulk upload:</p>
            <ul className='upper-ul'>
              <li>Click on the "Download Template" button.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image31.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                Fill in the details for each candidate in the template. Mandatory fields must be filled,
                but empty fields are optional.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image33.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                After filling in the template, upload it by clicking on the "Bulk Upload" button.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image34.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>Choose the file and click on the "Upload" button.</li>
              <li>After successfully saving the data, select the candidates you want to move.</li>
              <li>Choose the desired sector, job role, and batch.</li>
              <li>
                Click on the "Move" button to relocate the selected candidates to the specified batch.
              </li>
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Manage-Candidate'>
          <div className="box-header">
            <h3 className='box-title'>Manage Candidate</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>Download the candidate list, including user IDs and passwords, from this page.</li>
              <li>Select the sector, job role, and batch from the drop-down menus.</li>
              <li>
                The enrollment number serves as the candidate’s user ID, and their password is provided.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image35.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
            <p>Functionality:</p>
            <ul className='upper-ul'>
              <li>Reset and Terminate Exams in Bulk:</li>
              <p>
                Reset or terminate exams for multiple candidates by using the dedicated buttons at the
                top.
              </p>
              <li>Edit Candidate Details:</li>
              <p>Modify any candidate's information by clicking on the "Edit" button.</p>
              <li>Delete Candidates:</li>
              <p>Remove any candidate from the system if needed.</p>
              <li>Reset Candidates:</li>
              <p>Reset a candidate's data, erasing evidence, responses, and results for theory, practical, and viva exams. Useful if another candidate has taken the exam in their place.</p>
              <li>Submit Exam for Candidates:</li>
              <p>
                Submit exams on behalf of candidates who are unable to do so, ensuring that their
                responses for all questions are available on the portal.
              </p>
              <li>Terminate Exams:</li>
              <p>
                Terminate the exam for any candidate who has logged in on another device, maintaining the
                integrity of the assessment process.
              </p>
              <img src="	https://exam-express.com/admin/img/User-manual-img/image36.png" alt="img" className='img-fluid' style={{ width: "auto" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Candidate-Attendanc'>
          <div className="box-header">
            <h3 className='box-title'>Candidate Attendance</h3>
          </div>
          <div className="box-body">
            <p>
              Download the attendance sheet for a specific batch by selecting the sector, job role, and
              batch.
            </p>
            <p>Steps:</p>
            <ul className='upper-ul'>
              <li>Select the desired sector, job role, and batch.</li>
              <li>
                Click on the "Download Attendance Sheet" button to obtain the attendance details in PDF
                format.
              </li>
              <li>
                Alternatively, choose the Excel button for downloading the attendance sheet in Excel
                format.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image37.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Third-Category'>
          <div className="box-header">
            <h3 className='box-title'>Third Category- Assessment</h3>
          </div>
          <div className="box-body">
            <p>
              Under the assessment drop-down menu, users can access various functionalities related to
              batch management and assessment tracking.
            </p>
            <p>Options Include:</p>
            <ul className='upper-ul'>
              <li>Batch Upload in Bulk: Upload assessment batches in bulk.</li>
              <li>
                Manage Batch: Handle batch management tasks such as editing, deleting, or modifying
                batch details.
              </li>
              <li>
                Scheduled Batch: View batches that are scheduled for assessment.
              </li>
              <li>
                Assessment Completed: Check batches for which assessment has been successfully
                completed.
              </li>
              <li>
                Batch Uploaded on SIP: View batches that have been uploaded on the SIP (Skill India
                Portal).
              </li>
            </ul>
            <img src="https://exam-express.com/admin/img/User-manual-img/image38.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
          </div>
        </div>
        <div className="table-box-default" id='Batch-Upload'>
          <div className="box-header">
            <h3 className='box-title'>Batch Upload</h3>
          </div>
          <div className="box-body">
            <p>
              This page enables users to create batches in bulk.
            </p>
            <p>Steps:</p>
            <ul className='upper-ul'>
              <li>Click on the "Download Template" button to obtain the batch template.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image39.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>Fill in the required details in the downloaded template.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image40.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
            <p>Uploading Process:</p>
            <p>After filling in the template, proceed to upload it:</p>
            <ul className='upper-ul'>
              <li>Click on the "Bulk Upload" button.</li>
              <li>Choose the file from your device.</li>
              <li>Click on the "Upload" button.</li>
              <img src="https://exam-express.com/admin/img/User-manual-img/image41.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
            </ul>
            <p>Batch Management:</p>
            <ul className='upper-ul'>
              <li>
                After successful upload, select the batches and specify the state, district, sector, and
                job role to which the batch should be assigned.
              </li>
              <li>Once the batch is moved, it will be visible in the "Manage Batch" drop-down menu.</li>
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Manage-Batch'>
          <div className="box-header">
            <h3 className='box-title'>Manage Batch</h3>
          </div>
          <div className="box-body">
            <p>
              This page is utilized to create individual batches and publish both single and batches moved
              from batch upload. Users can sort batches based on sector, job role, state, and district by
              selecting from the drop-down menus.
            </p>
            <p>Creating a Single Batch:</p>
            <ul className='upper-ul'>
              <li>Click on the "Add New" button.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image42.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>Fill out the form that appears and click on the "Add Batch" button.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image43.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
            <br />
            <p><b>Enrolling Candidates:</b></p>
            <ul className='upper-ul'>
              <li>
                To enroll candidates in the batch, click on the "Add Candidate" button, which will
                redirect you to the candidate bulk upload page.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image44.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>Users can add candidates in bulk or individually following the provided steps.</li>
            </ul>
            <br />
            <p><b>Publishing the Batch:</b></p>
            <ul className='upper-ul'>
              <li>
                Once candidates are enrolled in the batch, the next step is to publish it. Click on the
                "Manage" button.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image44.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br /><br />
              <li>
                If the user wants to disable AI for the batch, toggle the AI button off before
                publishing.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image45.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
            </ul>
            <p><b>Details for Various Tabs:</b></p>
            <ul className='upper-ul'>
              <li>Time Duration: Set the time displayed to candidates during the exam.</li>
              <li>Question Shuffle: Choose whether to shuffle questions during the exam.</li>
              <li>Option Shuffle: Decide whether to shuffle options during the exam.</li>
              <li>Theory, Practical, and Viva QB: Select question banks from this sector and job role.
              </li>
              <li>Find Assessors by State: Displays the number of assessors registered in the sector and job role for each state.
              </li>
              <li>Assessor: Choose an assessor from the drop-down menu.</li>
              <li>Scheme: Select from registered schemes in the sector.</li>
              <li>AI Based: Toggle on/off for facial recognition and text-to-speech features during the exam.</li>
              <li>Display Marks: Choose whether to display marks to candidates for each question.</li>
              <li>Feedback: Enable/disable feedback forms for candidate, assessor, and TP (Third Party).
              </li>
              <li>TT Questions: Specify the number of questions visible to candidates during the exam.
              </li>
              <li>Password: Upload passwords for candidates, either unique or the same for all.
              </li>
              <li>Contact Person Name: Provide the name of the person to contact during the exam.
              </li>
              <li>Centre Address: Enter the exam location.</li>
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Schedule-Batch'>
          <div className="box-header">
            <h3 className='box-title'>Schedule Batch</h3>
          </div>
          <div className="box-body">
            <p>
              This page displays a list of batches scheduled for future dates, allowing users to edit the
              date and time.
            </p>
            <p>Features:</p>
            <ul className='upper-ul'>
              <li>View scheduled batches for future dates.</li>
              <li>Edit the date and time for scheduled batches.</li>
              <li>Sort batches based on sector, job role, batch, state, and district.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image46.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Current-Batch'>
          <div className="box-header">
            <h3 className='box-title'>Current Batches</h3>
          </div>
          <div className="box-body">
            <p>
              This page displays the list of batches scheduled for the current date.
            </p>
            <p>Features:</p>
            <ul className='upper-ul'>
              <li>View batches scheduled for the current date.</li>
              <li>Modify the end time for the batches visible in the current batches list.</li>
              <li>Sort batches based on sector, job role, batch, state, and district.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image47.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Assessment-Completed'>
          <div className="box-header">
            <h3 className='box-title'>Assessment Completed</h3>
          </div>
          <div className="box-body">
            <p>
              This page presents a list of batches that have been completed in the past.
            </p>
            <p>Features:</p>
            <ul className='upper-ul'>
              <li>View batches that have been successfully completed.</li>
              <li>Modify the end date for completed batches.</li>
              <li>Sort batches based on sector, job role, batch, state, and district.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image48.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Batch-SIP'>
          <div className="box-header">
            <h3 className='box-title'>Batch Uploaded on SIP</h3>
          </div>
          <div className="box-body">
            <p>
              This section pertains to batches that have been uploaded to the SIP (Systematic Investment
              Plan) portal.
            </p>
            <p>Functionality:</p>
            <ul className='upper-ul'>
              <li>After the batch date has passed, users will move the batch to the SIP portal.</li>
              <li>
                Once a batch is moved to the SIP portal, users lose access to change the date or conduct
                assessments for that batch.
              </li>
              <br />
            </ul>
            <p>Sorting:</p>
            <ul className='upper-ul'>
              <li>Users can sort batches based on sector, job role, batch, state, and district.</li>
              <br />
            </ul>
            <img src="https://exam-express.com/admin/img/User-manual-img/image49.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
          </div>
        </div>
        <div className="table-box-default" id='Fourth-Category'>
          <div className="box-header">
            <h3 className='box-title'>Fourth category- Monitoring</h3>
          </div>
          <div className="box-body">
            <p>
              Under the monitoring drop-down menu, users can access various tools and records for
              monitoring purposes.
            </p>
            <p>Options Include:</p>
            <ul className='upper-ul'>
              <li>Batch Status: Monitor the status of batches.</li>
              <li>Candidate Evidence: Access evidence collected from candidates.</li>
              <li>Batch Evidence Record: View records of evidence collected for batches.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image50.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Batch-Status'>
          <div className="box-header">
            <h3 className='box-title'>Batch Status</h3>
          </div>
          <div className="box-body">
            <p>The Batch Status feature provides an overview of candidate statuses within a batch.</p>
            <p>Key Points:</p>
            <ul className='upper-ul'>
              <li>This page displays the status of candidates within the selected batch.</li>
              <li>Users can see the number of students who have submitted their exams, those whose exams
                are in progress, and those who have not started.
              </li>
              <li>To view this information, users need to select the sector, job role, and batch.</li>
              <li>Additionally, this feature displays the selfie and document ID of the theory exam.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image51.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Candidate-Evidence'>
          <div className="box-header">
            <h3 className='box-title'>Candidate Evidence</h3>
          </div>
          <div className="box-body">
            <p>
              This page provides comprehensive details about the exam status of candidates, including their
              responses, evidence, and performance.
            </p>
            <p><b>Viewing Details:</b></p>
            <ul className='upper-ul'>
              <li>
                To access candidate evidence, select the sector, job role, and batch.
              </li>
              <li>
                Users can download Theory, Practical, or Viva responses by clicking on the respective
                buttons or the "View" button.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image52.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
            </ul>
            <p><b>Performance:</b></p>
            <ul className='upper-ul'>
              <li>
                Performance metrics are available for all three assessment types: theory, practical, and
                viva.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image53.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
            </ul>
            <p><b>Response Details:</b></p>
            <ul className='upper-ul'>
              <li>
                To view candidate responses, click on the "View" button next to the exam status (e.g.,
                "submitted").
              </li>
              <li>
                Theory Response: Displays question bank name, NOS name, questions, options, correct
                answers, candidate-submitted answers, correctness status, and time taken for each
                question.
              </li>
              <li>Users can download the response in Excel, CSV, or PDF format.</li>
              <li>
                Practical/Viva Response: Provides details such as question bank name, NOS name,
                scenario, question details, maximum marks, marks obtained, and any recorded evidence by
                the assessor.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image54.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
            </ul>
            <p><b>Exam Evidence:</b></p>
            <ul className='upper-ul'>
              <li>Click on "View Evidence" to access evidence collected during the exam.</li>
              <li>
                The evidence page shows exam duration, screen swaps, warning occurrences, exam location,
                captured photos (e.g., selfie, document ID), and videos.
              </li>
              <li>Users can download evidence and candidate feedback in PDF format.</li>
              <br />
              <img src="	https://exam-express.com/admin/img/User-manual-img/image54.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
              <br />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Batch-ER'>
          <div className="box-header">
            <h3 className='box-title'>Batch evidence Record</h3>
          </div>
          <div className="box-body">
            <p>
              This page displays the evidence captured by the assessor during the exam for a particular
              batch.
            </p>
            <p>Contents:</p>
            <ul className='upper-ul'>
              <li>
                The evidence includes assessor selfie, attendance records, group photos, any additional
                photos, and videos.
              </li>
              <li>
                Feedback provided by both the assessor and TP (Training Partner) is also available in
                PDF format.
              </li>
            </ul>
            <p>Accessing Feedback:</p>
            <ul className='upper-ul'>
              <li>To download the feedback form, users can click on the "Feedback" tab.</li>
            </ul>
            <br />
            <img src="https://exam-express.com/admin/img/User-manual-img/image55.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
          </div>
        </div>
        <div className="table-box-default" id='Fifth-Category'>
          <div className="box-header">
            <h3 className='box-title'>Fifth Category: Reports</h3>
          </div>
          <div className="box-body">
            <p>
              Under the Report drop-down menu, users can access various types of reports.
            </p>
            <p>Options Include:</p>
            <ul className='upper-ul'>
              <li>
                MIS Report: Provides Management Information System reports.
              </li>
              <li>
                Batch Result: Displays results for specific batches.
              </li>
              <li>Batch Report: Generates detailed reports for batches.</li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image56.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='MIS-Report'>
          <div className="box-header">
            <h3 className='box-title'>MIS Report</h3>
          </div>
          <div className="box-body">
            <p>
              The MIS (Management Information System) report provides insights into the life cycle of
              batches.
            </p>
            <ul className='upper-ul'>
              <li>
                This report allows users to track batches and assessments conducted within a specified
                time frame.
              </li>
              <li>
                To view batches with assessments conducted between April 1st and May 30th, users select the desired date range, sector, job role, and assigned assessor.
              </li>
              <li>Click on the "View" button to generate the report.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image57.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Batch-Result'>
          <div className="box-header">
            <h3 className='box-title'>Batch Result</h3>
          </div>
          <div className="box-body">
            <p>
              This feature provides batch results categorized according to National Occupational Standards (NOS).
            </p>
            <ul className='upper-ul'>
              <li>
                To view the batch results, users select the sector, job role, and batch.
              </li>
              <img src="https://exam-express.com/admin/img/User-manual-img/image58.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Batch-Report'>
          <div className="box-header">
            <h3 className='box-title'>Batch Report</h3>
          </div>
          <div className="box-body">
            <p>
              This feature provides an overall summary of batch results, including statistics such as the
              total number of theory, practical, and viva questions attempted, the number answered
              correctly, total marks, total percentage, and pass/fail status.
            </p>
            <ul className='upper-ul'>
              <li>
                Users can access the batch report by selecting the desired sector, job role, and batch.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image59.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Sixth-Category'>
          <div className="box-header">
            <h3 className='box-title'>Sixth Category: Support</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                Under the Support drop-down menu, users can access various support-related features.
              </li>
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Open-Ticket'>
          <div className="box-header">
            <h3 className='box-title'>Open Ticket</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                Users can create new support tickets by selecting "Create New Ticket."
              </li>
              <li>After clicking, fill in all the required fields including Category, Subcategory, Priority, and then click on "Add Support Ticket" to create the ticket.
              </li>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image60.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Closed-Ticket'>
          <div className="box-header">
            <h3 className='box-title'>Closed Ticket</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                Users can view the list of closed tickets by selecting "Closed Ticket" from the dropdown
                menu.
              </li>
              <li>
                By clicking on the action button, users can access the details of each closed ticket.
              </li>
              <br />
              <img src="	https://exam-express.com/admin/img/User-manual-img/image61.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='User-Manual'>
          <div className="box-header">
            <h3 className='box-title'>User Manual</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                Users can view or download the user manual PDF by clicking on the download button
                provided.
              </li>
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Seventh-Category'>
          <div className="box-header">
            <h3 className='box-title'>Seventh Category: Analytics Report</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                Under the Analytics Report drop-down menu, users can access various analytical reports
                for different aspects of the system.
              </li>
              <li>Options Include:</li>
              <ul>
                <li>
                  Assessor Analytics: Provides insights and metrics related to assessors' performance
                  and activities.
                </li>
                <li>
                  Sector Analytics: Offers analytics and trends specific to different sectors.
                </li>
                <li>
                  Question Bank Analytics: Analysis the performance and usage of question banks.
                </li>
                <li>
                  Batch Analytics: Provides analytics and statistics for batches.
                </li>
                <li>
                  Job Role Analytics: Offers insights into the performance and trends related to
                  different job roles.
                </li>
              </ul>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image62.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Assessor-Analytics'>
          <div className="box-header">
            <h3 className='box-title'>Assessor Analytics</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                This report offers a detailed overview of the assessor's data, organized by sector. It
                encompasses the total number of batches assigned to the assessor, along with specific
                information regarding the corresponding states and districts. Furthermore, the report
                delineates the total number of candidates assessed for each examination.
              </li>
              <li>To access the assessor analytics report, follow these steps:</li>
              <ul>
                <li>
                  Choose the sector from the dropdown list where registered assessors are listed.
                </li>
                <li>
                  Select the desired date range.
                </li>
                <li>
                  Click on the "Check Details" button to view the report.
                </li>
              </ul>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image63.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Sector-Analytics'>
          <div className="box-header">
            <h3 className='box-title'>Sector Analytics</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                This comprehensive report provides insights based on sectors, offering details on the
                total number of batches created within each sector. It also outlines the associated
                states and districts for these batches, along with the total number of candidates
                assessed for each exam.
              </li>
              <li>To access the sector analytics report, follow these steps:</li>
              <ul>
                <li>
                  Choose the sector from the dropdown list.
                </li>
                <li>
                  Select the desired date range.
                </li>
                <li>
                  Click on the "Check Details" button to view the report.
                </li>
              </ul>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image64.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='QB-Analytics'>
          <div className="box-header">
            <h3 className='box-title'>Question Bank Analytics</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                Administrators can view detailed analytics by selecting the question bank name and date,
                then clicking on the "Check Details" button.
              </li>
              <li>To access the Question Bank analytics report, follow these steps:</li>
              <ul>
                <li>
                  Choose the question bank from the dropdown list.
                </li>
                <li>
                  Select the desired date range.
                </li>
                <li>
                  Click on the "Check Details" button to view the report.
                </li>
              </ul>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image65.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='Batch-Analytics'>
          <div className="box-header">
            <h3 className='box-title'>Batch Analytics</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                Administrators can access detailed analytics by selecting the sector and batch, then
                clicking on the "Check Details" button.
              </li>
              <li>To access the batch analytics report, follow these steps:</li>
              <ul>
                <li>
                  Choose the sector from the dropdown list.
                </li>
                <li>
                  Select the batch.
                </li>
                <li>
                  Click on the "Check Details" button to view the report.
                </li>
              </ul>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image66.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
        <div className="table-box-default" id='JobRole-Analytics'>
          <div className="box-header">
            <h3 className='box-title'>Job Role Analytics</h3>
          </div>
          <div className="box-body">
            <ul className='upper-ul'>
              <li>
                Administrators can view detailed analytics by selecting the sector and job role, then
                clicking on the "Check Details" button.
              </li>
              <li>To access the Job role analytics report, follow these steps:</li>
              <ul>
                <li>
                  Choose the sector from the dropdown list.
                </li>
                <li>
                  Select the Job role.
                </li>
                <li>
                  Click on the "Check Details" button to view the report.
                </li>
              </ul>
              <br />
              <img src="https://exam-express.com/admin/img/User-manual-img/image67.png" alt="img" className='img-fluid' style={{ width: "60%" }} />
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserManual