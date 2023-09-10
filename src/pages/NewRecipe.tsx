import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonModal, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { getRecipies, isExisting, saveRecipe } from '../services/recipe';
import { arrowBack } from 'ionicons/icons';
import { Formik, FormikHelpers, Form, Field, FieldInputProps, FormikFormProps, FastFieldProps, FormikState, FieldProps } from 'formik';
import { RecipeForm } from '../interfaces/repice';
import { recipeStore } from '../stores/recipe';

const NewRecipe: React.FC = () => {

    const setRecipies = recipeStore.use.setRecipies();

    const [toast] = useIonToast();

    const modal = useRef<HTMLIonModalElement>(null);

    const initialValues: any = {
        name: '',
        quantity: null,
        quantityType: null
    }
    
    const onSubmit = async (values: RecipeForm, { setSubmitting }: FormikHelpers<RecipeForm>) => {
        setSubmitting(false);
        await saveRecipe(values.name, values.quantity, values.quantityType);
        const _recipies = await getRecipies();
        setRecipies(_recipies);
        modal.current?.dismiss();
    }

    const validate = async (values: RecipeForm) => {
        const errors: any = {};
        if (!!!values.name)
            errors.name = 'Recipe name is required.';
        else if (await isExisting(values.name))
            errors.name = 'This recipe already exists.';
        
        if (values.quantity && values.quantity < 0)
            errors.quantity = 'Quantity must be empty or greater than 0';
                
        return errors;
    }

    return (
        <IonModal ref={modal} trigger='open-new-recipe'>
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonButtons slot='start'>
                        <IonButton onClick={() => modal.current?.dismiss()}>
                            <IonIcon slot='start' icon={arrowBack} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>New recipe</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
                            <Form>
                                <Field name="name" component>
                                    {({ field, form: {touched, errors}, meta}: FastFieldProps) => (
                                        <IonInput
                                            label='Name'
                                            name={field.name}
                                            value={field.value}
                                            onIonChange={field.onChange}
                                            onIonBlur={field.onBlur}
                                            labelPlacement='floating'
                                            placeholder='Recipe name'
                                            fill='outline'
                                            className={errors.name ? 'ion-invalid ion-touched mb-2' : 'mb-2'}
                                            errorText={String(errors.name || '')}
                                        />
                                    )}
                                </Field>
                                <Field name="quantity" component>
                                    {({ field, form: {touched, errors}, meta}: FastFieldProps) => (
                                        <IonInput
                                            label='Quantity'
                                            type='number'
                                            min={0}
                                            name={field.name}
                                            value={field.value}
                                            onIonChange={field.onChange}
                                            onIonBlur={field.onBlur}
                                            labelPlacement='floating'
                                            placeholder='Quantity'
                                            fill='outline'
                                            className={errors.quantity ? 'ion-invalid ion-touched mb-2' : 'mb-2'}
                                            errorText={String(errors.quantity || '')}
                                        />
                                    )}
                                </Field>
                                <Field name="quantityType" component>
                                    {({ field, form: {touched, errors}, meta}: FastFieldProps) => (
                                        <IonInput
                                            label='Quantity type'
                                            name={field.name}
                                            value={field.value}
                                            onIonChange={field.onChange}
                                            onIonBlur={field.onBlur}
                                            labelPlacement='floating'
                                            placeholder='Quantity type'
                                            fill='outline'
                                            className={errors.quantityType ? 'ion-invalid ion-touched mb-2' : 'mb-2'}
                                            errorText={String(errors.quantityType || '')}
                                        />
                                    )}
                                </Field>
                                
                            <div className='flex justify-content-end'>
                                <IonButton fill='clear' color={'danger'} onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                                <IonButton fill='clear' color={'success'} type='submit'>Save</IonButton>
                            </div>
                        </Form>
                    </Formik>
            </IonContent>
        </IonModal>
    );
};

export default NewRecipe;