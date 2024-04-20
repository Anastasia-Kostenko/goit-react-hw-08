import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";
import { useDispatch } from "react-redux";

const ContactsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Contact name must be at least 3 characters!")
    .max(50, "Contact name must be less than 50 characters!")
    .required("Contact name is required!"),
  number: Yup.string()
    .min(3, "Contact number must be at least 3 characters!")
    .max(50, "Contact number must be less than 50 characters!")
    .matches(
      /^[0-9-]+$/,
      "You are allowed to type only numbers and symbol - between numbers"
    )
    .required("Contact number is required!"),
});

const INITIAL_FORM_DATA = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (data, actions) => {
    dispatch(addContact(data));
    actions.resetForm();
  };

  return (
    <Formik
      validationSchema={ContactsSchema}
      initialValues={INITIAL_FORM_DATA}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.field}>
          <span>Name</span>
          <Field
            className={css.fieldInput}
            type="text"
            name="name"
            placeholder="Enter contact name"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </label>
        <label className={css.field}>
          <span>Number</span>
          <Field
            className={css.fieldInput}
            type="text"
            name="number"
            placeholder="Enter contact number"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </label>
        <button className={css.fieldBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
