import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import {
  SelectFieldType,
  TextField,
  TypeOption,
  DiagnosisSelection,
  DischargeField,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Entry } from '../types';

/*
 * use type Entry, but omit id ,
 * because those it's irrelevant for new entry object.
 */
export type PatientEntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: PatientEntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'HealthCheck', label: 'HealthCheck' },
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare' },
];
const AddEntryToPatientForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: new Date().toISOString().slice(0, 10),
        specialist: '',
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        console.log('Form Errors: ', errors);
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        //Make discharge required add discharge as value to formik form
        if (values.type === 'Hospital') {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className='form ui'>
            <SelectFieldType label='Type' name='type' options={typeOptions} />

            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === 'Hospital' ? (
              <Field
                label='Discharge'
                name='discharge'
                component={DischargeField}
              ></Field>
            ) : (
              <></>
            )}
            <Grid>
              <Grid item>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ float: 'left' }}
                  type='button'
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type='submit'
                  variant='contained'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryToPatientForm;
