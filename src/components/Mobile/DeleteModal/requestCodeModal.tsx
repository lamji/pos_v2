import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Field, Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import apiClient from '@/src/common/app/axios';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-input': {
    fontSize: '1.1rem',
  },
  '& .MuiFormLabel-root': {
    fontSize: '1.1rem',
  },
}));

const validationSchema = yup.object({
  code: yup.string().required('Code is required').min(6, 'Code must be at least 6 characters long'),
  email: yup.string().email('Invalid email address').required('Email is required'),
});

interface Props {
  open: boolean;
  handleClose: (i: boolean) => void;
}

export default function RequestCodeModal({ open, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    handleClose(false);
    setIsSuccess(false);
  };

  const handleSubmitForm = async (values: { code: string; email: string }) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post('api/activate', values);

      if (response.data.success) {
        setIsSuccess(true);
        setAlertMessage('Code activated successfully. You have 7 days of trial access.');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setAlertMessage(response.data.message || 'An error occurred.');
      }
    } catch (error) {
      setIsLoading(false);
      setAlertMessage('An error occurred.');
    }
  };

  return (
    <React.Fragment>
      <Dialog fullScreen={fullScreen} open={open} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {isSuccess ? (
            <></>
          ) : (
            <Alert severity="info">
              After requesting a code, the code will be activated and grant 7 days of trial access
              to the service. This feature ensures that users can experience the full functionality
              of the service before committing to a subscription.
            </Alert>
          )}
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {isSuccess ? (
            <>
              <Alert severity="success">Success</Alert>
              <Button
                sx={{ my: '10px', color: 'white' }}
                variant="contained"
                onClick={handleCancel}
              >
                Return to Login
              </Button>
            </>
          ) : (
            <>
              <DialogContentText>Enter your desired code and email</DialogContentText>
              <Formik
                initialValues={{ code: '', email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmitForm}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      as={StyledTextField}
                      name="email"
                      type="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText={<ErrorMessage name="email" />}
                    />
                    <Field
                      as={StyledTextField}
                      name="code"
                      type="text"
                      label="Code"
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      value={values.code}
                      error={touched.code && Boolean(errors.code)}
                      helperText={<ErrorMessage name="code" />}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                    </Button>
                    {alertMessage && (
                      <Alert severity={alertMessage.includes('error') ? 'error' : 'success'}>
                        {alertMessage}
                      </Alert>
                    )}
                  </form>
                )}
              </Formik>
            </>
          )}
        </DialogContent>
        {!isSuccess && (
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
