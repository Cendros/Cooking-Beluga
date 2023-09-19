import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonModal, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import React, { useRef } from 'react';
import { editRecipe, getRecipies, isExisting, saveRecipe } from '../../services/recipe';
import { arrowBack, checkmarkCircleOutline } from 'ionicons/icons';
import { Formik, FormikHelpers, Form, Field, FastFieldProps } from 'formik';
import { Recipe, RecipeForm } from '../../interfaces/repice';
import { useAtom } from 'jotai'
import { recipiesAtom, selectedRecipeAtom } from '../../atoms/recipe';

type NewRecipeProps = {
    recipe: Recipe | undefined,
    dismiss: () => void;
}

const NewRecipe = ({ recipe, dismiss }: NewRecipeProps) => {
    const [_, setSelectedRecipe] = useAtom(selectedRecipeAtom);
    const [recipies, setRecipies] = useAtom(recipiesAtom);

    const [presentToast] = useIonToast();

    const showToast = (message: string) => {
        presentToast({
            message: message,
            duration: 3000,
            position: 'bottom',
        });
    }

    const modal = useRef<HTMLIonModalElement>(null);

    const initialValues: any = {
        name: recipe?.name || '',
        quantity: recipe?.quantity || null,
        quantityType: recipe?.quantityType || null,
        category: recipe?.category || null,
    }
    
    const onSubmit = async (values: RecipeForm, { setSubmitting }: FormikHelpers<RecipeForm>) => {
        setSubmitting(false);
        let _recipies;
        if (recipe && recipies) {
            await editRecipe(values, recipe.id);
            _recipies = [...recipies];
            const index = _recipies.findIndex(r => r.id = recipe.id);
            _recipies[index] = {..._recipies[index], ...values};
            setSelectedRecipe(_recipies[index]);
            showToast("Recipe has been updated.");
        } else {
            await saveRecipe(values);
            _recipies = await getRecipies();
            showToast("Recipe has been saved.");
        }
        setRecipies(_recipies);
        dismiss();
    }

    const validate = async (values: RecipeForm) => {
        const errors: any = {};
        if (!!!values.name)
            errors.name = 'Recipe name is required.';
        else if (await isExisting(values.name, recipe?.id))
            errors.name = 'This recipe already exists.';
        
        if (values.quantity && values.quantity < 0)
            errors.quantity = 'Quantity must be empty or greater than 0';
                
        return errors;
    }

    return (
        <IonPage ref={modal}>
            <IonContent className="ion-padding">
                <div className='flex flex-row align-items-center'>
                    <IonButton fill='clear' onClick={dismiss}>
                        <IonIcon size='large' icon={arrowBack} />
                    </IonButton>
                    <IonText color='primary'><h1 className='m-0'>New recipe</h1></IonText>
                </div>
                <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} validateOnChange={false} validateOnBlur={false} validateOnMount={false}>
                        <Form className='flex flex-column gap-3 mt-3'>
                            <Field name="name" component>
                                {({ field, form: {errors}}: FastFieldProps) => (
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

                            <Field name="category" component>
                                {({ field, form: {touched, errors}, meta}: FastFieldProps) => (
                                    <IonSelect
                                        label='Category'
                                        name={field.name}
                                        value={field.value}
                                        onIonChange={field.onChange}
                                        onIonBlur={field.onBlur}
                                        labelPlacement='floating'
                                        placeholder='Category'
                                        fill='outline'
                                    >
                                        <IonSelectOption value="Breakfast">Breakfast</IonSelectOption>
                                        <IonSelectOption value="Light meal">Light meal</IonSelectOption>
                                        <IonSelectOption value="Mains">Mains</IonSelectOption>
                                        <IonSelectOption value="Desert">Desert</IonSelectOption>
                                    </IonSelect>
                                )}
                            </Field>
                            
                        <div className='flex justify-content-end'>
                            <IonButton fill='clear' color={'danger'} onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                            <IonButton fill='clear' color={'success'} type='submit'>Save</IonButton>
                        </div>
                    </Form>
                </Formik>
            </IonContent>
        </IonPage>
    );
};

export default NewRecipe;