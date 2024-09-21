import * as Yup from "yup";

export const manageSectorSchema = Yup.object({
  name: Yup.string().required("Sector name is required!"),
  type: Yup.string().required("Sector type is Required!"),
  logo: Yup.string().required("Sector logo is Required!"),
});

export const manageClientSchema = Yup.object({
  clientName: Yup.string().required("Client name is required!"),
  clientEmail: Yup.string().email("Please enter a valid email!").required("Client email is Requried!"),
  password: Yup.string().required("Password is required!"),
  companyName: Yup.string().required("Company name is required!"),
  assginedSectorsId: Yup.array().of(Yup.string()).min(1, 'At least one sector must be selected').required('Assigned sectors are required')
});

export const clientManageSpocSchema = Yup.object({
  spocPersonName: Yup.string().required("SPOC person name is required!"),
  contactNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required('A phone number is required'),
  emailId: Yup.string().email("Please enter a valid email!").required("Email is Requried!"),
  password: Yup.string().required("Password is required!"),
  assginedSectorsIds: Yup.array().of(Yup.string()).min(1, 'At least one sector must be selected').required('Assigned sectors are required')
});