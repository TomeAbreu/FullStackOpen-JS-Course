import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import AddEntryToPatientForm, {
  PatientEntryFormValues,
} from './AddEntryToPatientForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientEntryFormValues) => void;
  error?: string;
}
const AddEntryToPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity='error'>{`Error: ${error}`}</Alert>}
      <AddEntryToPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryToPatientModal;
