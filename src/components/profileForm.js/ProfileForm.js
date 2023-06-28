import React, { useRef } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import FormikFormControl from '../formik/FormikFormControl';
import FormikFormGroup from '../formik/FormikFormGroup';
import { prepareInitialValues } from '../../utils/form';

const NICKNAME_MIN = 3;
const NICKNAME_MAX = 80;
const FULL_NAME_MIN = 5;
const FULL_NAME_MAX = 100;

const schema = yup.object().shape({
  nickname: yup.string().label('Nickname').required().min(NICKNAME_MIN).max(NICKNAME_MAX),
  profilePhoto: yup.string().label('Profile photo URL').url(),
  fullName: yup.string().label('Full name').min(FULL_NAME_MIN).max(FULL_NAME_MAX),
  email: yup.string().label('Email').email(),
});

const defaultValues = {
  nickname: '',
  profilePhoto: '',
  fullName: '',
  email: '',
};

export default function ProfileForm({ textSubmitButton = 'Edit profile information', onSubmit, initialValues = {} }) {
  const initialValuesRef = useRef();
  if (!initialValuesRef.current) {
    initialValuesRef.current = prepareInitialValues(initialValues, defaultValues);
  }

  return (
    <Formik initialValues={initialValuesRef.current} validationSchema={schema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormikForm>
          <FormikFormGroup label="Nickname">
            <FormikFormControl name="nickname" placeholder="Enter nickname" />
          </FormikFormGroup>
          <FormikFormGroup label="Profile photo URL">
            <FormikFormControl name="profilePhoto" placeholder="Enter url" type="url" />
          </FormikFormGroup>
          <FormikFormGroup label="Full name">
            <FormikFormControl name="fullName" placeholder="Enter full name" />
          </FormikFormGroup>
          <FormikFormGroup label="Email">
            <FormikFormControl name="email" placeholder="Enter email" />
          </FormikFormGroup> 
          <ButtonWithSpinner className="mt-2" type="submit" block loading={isSubmitting}>
            {textSubmitButton}
          </ButtonWithSpinner>
        </FormikForm>
      )}
    </Formik>
  );
}
