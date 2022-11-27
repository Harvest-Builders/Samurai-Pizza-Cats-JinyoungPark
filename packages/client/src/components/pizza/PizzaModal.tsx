import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import { AddCircle, Delete } from '@material-ui/icons';
import * as yup from 'yup';
import {
  Backdrop,
  createStyles,
  Fade,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Theme,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { Topping } from '../../types';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';

import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '400px',
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        display: 'flex',
      },
    },
    toppingList: {
      display: 'flex',
      displayWrap: 'wrap',
      width: '300px',
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  imgSrc: yup.string().required('imgSrc is required'),
  toppingIds: yup.array().required('toppings are required'),
});
const PizzaModal = ({ selectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
  const classes = useStyles();
  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();
  const { data } = useQuery(GET_TOPPINGS);

  const allToppings: Topping[] = data?.toppings;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={(): void => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <h2>{selectedPizza ? 'Edit' : 'Add'} Pizza</h2>
          <Formik
            enableReinitialize={true}
            initialValues={{
              id: selectedPizza?.id,
              name: selectedPizza?.name,
              description: selectedPizza?.description,
              imgSrc: selectedPizza?.imgSrc,
              toppingIds: selectedPizza?.toppings.map((topping: any) => topping.id),
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {}}
          >
            {({ values, handleChange, handleBlur, touched, errors, isValid }) => (
              <Form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="name-input"
                  label="Pizza Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  id="description-input"
                  label="Pizza Description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <TextField
                  id="name-input"
                  label="Pizza Image"
                  name="imgSrc"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.imgSrc}
                  error={touched.imgSrc && Boolean(errors.imgSrc)}
                  helperText={touched.imgSrc && errors.imgSrc}
                />

                <div role="group" aria-labelledby="checkbox-group">
                  {allToppings.map((topping) => {
                    return (
                      <label>
                        <Field key={topping.id} type="checkbox" name="toppingIds" value={topping.id} />
                        {topping.name}
                      </label>
                    );
                  })}
                </div>
                <IconButton
                  edge="end"
                  aria-label="update"
                  type="button"
                  onClick={(): void => {
                    values?.id ? onUpdatePizza(values) : onCreatePizza(values);
                    setOpen(false);
                  }}
                  disabled={!isValid}
                >
                  <AddCircle />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  type="button"
                  onClick={(): void => {
                    onDeletePizza(values);
                    setOpen(false);
                  }}
                >
                  <Delete />
                </IconButton>
              </Form>
            )}
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PizzaModal;

// import { Formik } from 'formik';
// import { makeStyles, Theme } from '@material-ui/core/styles';
// import { Modal, Backdrop } from '@material-ui/core/';
// import { Pizza } from '../../types';
// import defaultPizzaImage from '../../assets/img/default-pizza.jpeg';
// import PizzaForm from './PizzaForm';
// const useStyles = makeStyles((theme: Theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'scroll',
//   },
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 5, 2),
//     width: theme.typography.pxToRem(400),
//     borderRadius: theme.typography.pxToRem(4),
//     '&:focus': {
//       outline: 'none',
//     },
//   },
//   img: {
//     width: '100%',
//     height: theme.typography.pxToRem(350),
//     borderRadius: theme.typography.pxToRem(4),
//     margin: theme.spacing(2, 0, 3),
//   },
// }));
// interface PizzaModalProps {
//   pizza?: Pizza;
//   open: boolean;
//   selectPizza: () => void;
// }
// const PizzaModal = ({ pizza, open, selectPizza }: PizzaModalProps): JSX.Element => {
//   const classes = useStyles();
//   const toppingIds = pizza?.toppings?.map((topping) => topping.id);
//   const initialValues = {
//     id: pizza?.id,
//     name: pizza?.name,
//     description: pizza?.description,
//     imgSrc: pizza?.imgSrc,
//     toppingIds: toppingIds,
//   };
//   return (
//     <Modal className={classes.modal} open={open} onClose={selectPizza} BackdropComponent={Backdrop}>
//       <div className={classes.container}>
//         <h1>{pizza?.name}</h1>
//         <img className={classes.img} src={pizza?.imgSrc || defaultPizzaImage} alt="pizza" />
//         <Formik initialValues={initialValues} onSubmit={selectPizza}>
//           <PizzaForm toppings={toppingIds} selectPizza={selectPizza} />
//         </Formik>
//       </div>
//     </Modal>
//   );
// };
// export default PizzaModal;
